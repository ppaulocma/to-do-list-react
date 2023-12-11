const { useState, useEffect } = React;

const TodoApp = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [date_end, setDate_end] = useState('');
    const [index, setIndex] = useState(null);
    const [completed, setCompleted] = useState(0);

    useEffect(() => {
        // Carrega a lista de tarefas do backend quando o componente é montado
        fetch("http://localhost/to-do-list-react/api/getList")
            .then((response) => response.json())
            .then((data) => setTodos(data.data))
            .catch((error) => console.error("Erro ao carregar tarefas:", error));
    }, []); // O segundo argumento vazio faz com que o efeito seja executado apenas uma vez ao montar o componente

    // Função para formatar a data no formato dd/mm/aaaa
    const dateFormat = (date) => { return date.split("-").reverse().join("/") };

    const addTodo = () => {
        if (title.trim() !== "" && description.trim() !== "" && date_end.trim() !== "") {
            const todoData = {
                title: title,
                description: description,
                date_end: date_end,
                is_completed: completed,
            };

            // Se index não for nulo, estamos editando uma tarefa existente
            if (index !== null) {
                todoData.id = index;
                fetch(`http://localhost/to-do-list-react/api/editItemList`, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(todoData),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        const updatedTodos = [...todos];
                        updatedTodos[
                            todos.indexOf(todos.find((todo) => todo.id === index))
                        ] = todoData;
                        todoData.date_created = new Date().toJSON().slice(0,10).replace(/-/g,'-');
                        setTodos(updatedTodos);
                        setIndex(null);
                    })
                    .catch((error) => console.error("Erro ao editar tarefa:", error));
            } else {
                // Caso contrário, estamos adicionando uma nova tarefa
                fetch("http://localhost/to-do-list-react/api/addItemList", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(todoData),
                })
                    .then((response) => response.json())
                    .then((response) => {
                        todoData.id = response.data;
                        todoData.date_created = new Date().toJSON().slice(0,10).replace(/-/g,'-');
                        console.log(todoData);
                        setTodos([...todos, todoData]);
                    })
                    .catch((error) => console.error("Erro ao adicionar tarefa:", error));
            }
            // Limpar os campos após adicionar ou editar
            setTitle('');
            setDescription('');
            setDate_end('');
            setCompleted('');
        }
    };

    const toggleCompletion = (id) => {
        const updatedTodos = todos.map((todo) =>
            todo.id === id ? { ...todo, is_completed: todo.is_completed ? 0 : 1 } : todo
        );

        fetch(`http://localhost/to-do-list-react/api/editItemList`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(updatedTodos.find((todo) => todo.id === id)),
        })
            .then((response) => response.json())
            .then((response) => {
                setTodos(updatedTodos);
            })
            .catch((error) => console.error("Erro ao alternar conclusão:", error));
    };

    const editTodo = (id) => {
        const { title, description, date_end, is_completed } = todos.find(
            (todo) => todo.id === id
        );

        setTitle(title);
        setDescription(description);
        setDate_end(date_end);
        setCompleted(is_completed);
        setIndex(id);
    };

    const removeTodo = (id) => {
        fetch(`http://localhost/to-do-list-react/api/deleteItemList`, {
            method: "DELETE",
            body: JSON.stringify({ id }),
        })
            .then(() => {
                const updatedTodos = todos.filter((todo) => todo.id !== id);
                setTodos(updatedTodos);
                setIndex(null);
            })
            .catch((error) => console.error("Erro ao remover tarefa:", error));
    };

    return (
        <div className="container mt-5">
            <h1 className="mb-4">Lista de Tarefas</h1>
            <div className="mb-3">
                <input
                    type="text"
                    className="form-control mb-2"
                    placeholder="Título"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="form-control mb-2"
                    placeholder="Descrição"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    type="date"
                    className="form-control mb-2"
                    value={date_end}
                    onChange={(e) => setDate_end(e.target.value)}
                />
                <button className="btn btn-primary" onClick={addTodo}>
                    {index !== null ? "Editar" : "Adicionar"}
                </button>
            </div>
            <table className="table">
                <thead>
                    <tr>
                        <th className="text-center">ID</th>
                        <th>Título</th>
                        <th>Descrição</th>
                        <th className="text-center">Data de criação</th>
                        <th className="text-center">Data de Entrega</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {todos.map((todo) => (
                        <tr key={todo.id} className={todo.is_completed ? "table-success" : ""}>
                            <td className="text-center">{todo.id}</td>
                            <td>{todo.title}</td>
                            <td>{todo.description}</td>
                            <td className="text-center">{dateFormat(todo.date_created)}</td>
                            <td className="text-center">{dateFormat(todo.date_end)}</td>
                            <td className="d-flex justify-content-end gap-2">
                                <button className="btn btn-warning mr-2" onClick={() => editTodo(todo.id)}>
                                    Editar
                                </button>
                                <button className={`btn ${todo.is_completed ? "btn-secondary" : "btn-success"} mr-2`} onClick={() => toggleCompletion(todo.id)}>
                                    {todo.is_completed ? "Marcar como Pendente" : "Marcar como Concluída"}
                                </button>
                                <button className="btn btn-danger" onClick={() => removeTodo(todo.id)}>
                                    Remover
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
