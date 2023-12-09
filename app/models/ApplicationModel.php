<?php

namespace app\models;

use app\core\Model;
use PDO;

class ApplicationModel extends Model
{
    public function findList()
    {
        $conn = $this->db;
        $stmt = $conn->prepare("SELECT * FROM to_do_list");
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }

    public function addItem($title, $description, $is_completed, $date_end)
    {
        $conn = $this->db;
        $stmt = $conn->prepare("INSERT INTO to_do_list (title, description, is_completed, date_end) VALUES (:title, :description, :is_completed, :date_end)");
        $stmt->bindParam(":title", $title);
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":is_completed", $is_completed);
        $stmt->bindParam(":date_end", $date_end);
        $stmt->execute();

        return $conn->lastInsertId();
    }

    public function updateItem($id, $title, $description, $is_completed, $date_end)
    {
        $conn = $this->db;
        $stmt = $conn->prepare("UPDATE to_do_list SET title = :title, description = :description, is_completed = :is_completed, date_end = :date_end WHERE id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->bindParam(":title", $title);
        $stmt->bindParam(":description", $description);
        $stmt->bindParam(":is_completed", $is_completed);
        $stmt->bindParam(":date_end", $date_end);
        $stmt->execute();
    }

    public function deleteItem($id)
    {
        $conn = $this->db;
        $stmt = $conn->prepare("DELETE FROM to_do_list WHERE id = :id");
        $stmt->bindParam(":id", $id);
        $stmt->execute();
    }
}
