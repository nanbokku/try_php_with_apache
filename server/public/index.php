<?php

require_once dirname(__FILE__) . '/../vendor/autoload.php';

// Ajaxから要求されたものなのか調べる
// Ajax通信するときはヘッダにX-Requested-With: XMLHttpRequestというデータをつけて送ってくる
if (isset($_SERVER['HTTP_X_REQUESTED_WITH']) && (strtolower($_SERVER['HTTP_X_REQUESTED_WITH']) == 'xmlhttprequest')) {
    // Ajax
    // 先頭の'/'を削除
    $uri = preg_replace('/^\//', '', $_SERVER['REQUEST_URI']);
    $params = explode('/', $uri);

    $ctrlName = 'App\\Controller\\' . ucfirst(strtolower($params[0])) . 'Controller';
    $controller = new $ctrlName();

    // 先頭の要素(コントローラ名)の削除
    array_splice($params, 0, 1);
    $controller->action($params);
} else {
    // HTTP 
    header('Content-Type:text/html;charset=utf-8');
    readfile(__DIR__ . '/top.html'); // __DIR__ を用いて絶対パスで指定する
}
  
 

