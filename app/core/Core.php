<?php

use Exception;

class Core
{
    private $controller;
    private $method;
    private $parameters = [];

    public function __construct()
    {
        $url = array_filter(explode('/', end(explode("index.php", $_SERVER["PHP_SELF"]))));

        $this->controller = ucfirst(array_shift($url) ?? 'application');
        $this->method = $url ? array_shift($url) : 'index';
        $this->parameters = $url;
    }

    public function run()
    {
        try {
            $currentController = "app\\controllers\\" . $this->controller;
            $return = call_user_func_array([new $currentController, $this->method], $this->parameters);

            http_response_code(200);
            if ($return !== "HTML") {
                header('Content-Type: application/json');
                echo json_encode(['status' => 'success', 'data' => $return]);
            } else
                header('Content-Type: text/html');
        } catch (Exception $e) {
            header('Content-Type: application/json');
            http_response_code(500);
            echo json_encode(['status' => 'error', 'data' => $e->getMessage()]);
        }
    }
}
