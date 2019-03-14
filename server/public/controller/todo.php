<?php

namespace Todo\Controller;

require_once dirname(__FILE__) . '/../db/db_connection.php';

use Todo\DB\DBConnection;

class TodoController
{
    private $connection, $pdo;

    public function __construct()
    {
        $this->connection = DBConnection::instance();
        $this->pdo = $this->connection->get();
    }

    public function action($params)
    {
        switch (strtolower($_SERVER['REQUEST_METHOD'])) {
            case 'get':
                $id = $params[1];
                $this->get($id);
                break;
            case 'post':
                break;
            case 'put':
            case 'delete':
            default:
                parse_str(file_get_contents('php://input'), $parameter);
                break;
        }
    }

    private function get($id)
    {
        switch ($id) {
            case 'all':
                $result = $this->pdo->query('SELECT * FROM todos');
                header('Content-Type:application/json; charset=utf-8');
                echo json_encode($result->fetchAll(\PDO::FETCH_OBJ));
                break;
            default:
                $this->pdo->prepare('SELECT * FROM todos WHERE id=:id');
                $this->pdo->bindValue(id, $id);
                $result = $this->pdo->execute();
                header('Content-Type:application/json; charset=utf-8');
                echo json_encode($result->fetch(\PDO::FETCH_OBJ));
                break;
        }
    }
}
