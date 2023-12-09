<?php

namespace app\controllers;

use app\services\ApplicationService;
use Exception;

class API
{
   public $method;
   public $content;

   public function __construct()
   {
      $this->method  = $_SERVER['REQUEST_METHOD'];
      $this->content = json_decode(file_get_contents('php://input'), true);
   }

   public function getList()
   {
      if ($this->method != 'GET')
         throw new Exception('Metodo não suportado');

      return ApplicationService::getList();
   }

   public function addItemList()
   {
      if ($this->method != 'POST')
         throw new Exception('Metodo não suportado');

      return ApplicationService::addItem($this->content['title'], $this->content['description'], $this->content['is_completed'], $this->content['date_end']);
   }

   public function editItemList()
   {
      if ($this->method != 'PUT')
         throw new Exception('Metodo não suportado');

      return ApplicationService::editItem($this->content['id'], $this->content['title'], $this->content['description'], $this->content['is_completed'], $this->content['date_end']);
   }

   public function deleteItemList()
   {
      if ($this->method != 'DELETE')
         throw new Exception('Metodo não suportado');

      return ApplicationService::deleteItem($this->content['id']);
   }
}
