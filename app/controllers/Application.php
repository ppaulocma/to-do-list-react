<?php

namespace app\controllers;

use app\core\Controller;

class Application extends Controller
{
   public function index()
   {
      return self::render('index', ['URL_BASE' => URL_BASE]);
   }
}
