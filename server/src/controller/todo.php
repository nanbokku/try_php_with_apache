<?php

declare(strict_types=1);

namespace App\Controller;

use App\Model\TodoModel;

class TodoController
{
    private $todoModel;

    public function __construct()
    {
        $this->todoModel = new TodoModel();
    }

    public function action($params)
    {
        $method = strtolower($_SERVER['REQUEST_METHOD']);
        $this->$method($params);
    }

    private function get($params)
    {
        if (count($params) !== 1) {
            http_response_code(500);

            return;
        }

        if ((int) ($params[0])) {
            // GET /todo/:id
            $id = (int) ($params[0]);
            $this->getbyId($id);
        } elseif ($params[0] === 'all') {
            // GET /todo/all
            $this->getAll();
        }
    }

    private function post($params)
    {
        // postデータ
        $contents = json_decode((string) filter_input(INPUT_POST, 'contents'));
        echo $contents;
        $id = $this->todoModel->add($contents);

        echo $id;   // insertedId
    }

    private function put($params)
    {
        if (count($params) !== 1) {
            http_response_code(500);

            return;
        }

        if ((int) ($params[0])) {
            // PUT /todo/:id
            $id = (int) ($params[0]);
            // $dataはstdClassになる
            $data = json_decode(file_get_contents('php://input'));
            $contents = $data->contents;
            $completed = $data->completed;

            $setArray = []; // set params;
            if (isset($contents)) {
                $setArray['contents'] = $contents;
            }
            if (isset($completed)) {
                $setArray['completed'] = $completed;
            }

            $this->todoModel->update($id, $setArray);
        }
    }

    private function getById($id)
    {
        $result = $this->todoModel->fetch(['id' => $id]);

        header('Content-Type:application/json;charset=utf-8');
        echo json_encode($result);
    }

    private function getAll()
    {
        $result = $this->todoModel->fetch();

        header('Content-Type:application/json;charset=utf-8');
        echo json_encode($result);
    }
}
