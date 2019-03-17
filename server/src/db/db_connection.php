<?php

declare(strict_types=1);

namespace App\DB;

use PDO;

class DBConnection
{
    private static $singleton;

    private $pdo;

    private function __construct()
    {
    }

    public static function instance()
    {
        return self::$singleton = self::$singleton ?? new self();
    }

    public function get()
    {
        return $this->pdo = $this->pdo ?? new PDO(
            'mysql:host=db;dbname=todo_database;charset=utf8',
            'root',
            'root',
            [
                PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            ]
        );
    }
}
