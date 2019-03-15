<?php

namespace App\Model;

use App\DB\DBConnection;

class TodoModel
{
    private $pdo;

    function __construct()
    {
        $this->pdo = DBConnection::instance()->get();
    }

    // $whereがないときは全てのデータをとってくる
    function fetch($where = null)
    {
        $query = 'SELECT * FROM todos';

        if (isset($where)) {
            // WHERE句以降を作成
            $query .= array_reduce($where, function ($acc, $item) use ($where) {
                $acc .= $acc === '' ? ' WHERE ' : ' , ';
                $val = $where[$item];
                return $acc . $item . ' = ' . $val;
            }, '');
        }

        $result = $this->pdo->query($query);
        $data = $result->fetchAll(\PDO::FETCH_OBJ);

        foreach ($data as &$row) {
            foreach ($row as $key => &$val) {
                if ($key === 'id') {
                    $val = intval($val);
                } elseif ($key === 'completed') {
                    $val = intval($val) === 0 ? false : true;
                }
            }
            unset($val);
        }
        unset($row);    // 誤って要素が変更されないようにするため

        return $data;
    }

    function add($contents)
    {
        $stmt = $this->pdo->prepare('INSERT INTO todos SET contents=:contents, completed=:completed');
        $stmt->bindValue('contents', $contents, \PDO::PARAM_STR);
        $stmt->bindValue('completed', false, \PDO::PARAM_BOOL);
        $stmt->execute();

        return $this->pdo->lastInsertId();
    }

    // id === null のときは全データを変更する
    function update($id, $params)
    {
        $query = 'UPDATE todos SET ';
        $query .= array_reduce($params, function ($acc, $item) use ($params) {
            $acc .= $acc === '' ? '' : ', ';
            $val = $params[$item];
            return $acc . $item . ' = ' . $val;
        }, '');

        if ($id !== null) $query .= ' WHERE id = ' . $id;

        $this->pdo->query($query);
    }
}
