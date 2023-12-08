<?php

namespace app\controllers;

use app\core\Controller;

class Application extends Controller
{
   public function index()
   {
      return self::render('index', ['REPLACE_TEST' => 'Olá Mundo!']);
   }
}
