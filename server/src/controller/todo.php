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
        switch (strtolower($_SERVER['REQUEST_METHOD'])) {
            case 'get':
                $this->get($params);
                break;
            case 'post':
                $this->post();
                break;
            case 'put':
                $this->put($params);
                break;
            case 'delete':
            default:
                parse_str(file_get_contents('php://input'), $parameter);
                break;
        }
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

    private function post()
    {
        // postデータ
        $contents = (string) filter_input(INPUT_POST, 'contents');
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
            $data;
            // $dataはstdClassになる
            json_encode(file_get_contents('php://input'), $data);
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
