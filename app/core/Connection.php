<?php
namespace app\core;

use Exception;
use PDOException;

class Connection{
    private static $connection = null;
    
    public static function getConnection(){
        try{
            if(!self::$connection){
                self::$connection = new \PDO("mysql:dbname=".DB_NAME.";host=".DB_HOST,DB_USER,DB_PASSWORD);
                self::$connection->setAttribute(\PDO::ATTR_ERRMODE, \PDO::ERRMODE_EXCEPTION);
                self::$connection->exec("SET NAMES " . CHARSET);
            }
            
            return self::$connection;
            
        }catch (PDOException $e){
            throw new Exception("Erro ao tentar conectar com o banco");
        }
    }
}

