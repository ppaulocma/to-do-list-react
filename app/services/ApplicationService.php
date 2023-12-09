<?php

namespace app\services;

use app\models\ApplicationModel;

class ApplicationService
{
    public static function getList()
    {
        $applicationModel = new ApplicationModel();
        return $applicationModel->findList();
    }

    public static function addItem($title, $description, $is_completed, $date_end)
    {
        $applicationModel = new ApplicationModel();
        return $applicationModel->addItem($title, $description, $is_completed, $date_end);
    }

    public static function editItem($id, $title, $description, $is_completed, $date_end)
    {
        $applicationModel = new ApplicationModel();
        return $applicationModel->updateItem($id, $title, $description, $is_completed, $date_end);
    }

    public static function deleteItem($id)
    {
        $applicationModel = new ApplicationModel();
        return $applicationModel->deleteItem($id);
    }
}
