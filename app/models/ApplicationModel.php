<?php

namespace app\models;

use app\core\Connection;

class ApplicationModel
{
    public $db;

    public function __construct()
    {
        $this->db = Connection::getConnection();
    }
}
