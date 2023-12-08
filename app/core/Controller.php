<?php

namespace app\core;

class Controller
{
    public static function render($view, $data = [])
    {
        $html = file_get_contents("resources/views/{$view}.html");

        foreach ($data as $key => $value) {
            $html = str_replace("{{{$key}}}", $value, $html);
        }
    
        echo $html;
        return "HTML";
    }
}
