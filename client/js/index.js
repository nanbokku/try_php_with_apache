import $ from 'jquery';
import React from 'react'; // webpackによりjsファイルに変換されたときに必要
import { TodoController } from './controller/todo.jsx';

$(() => {
  const controller = new TodoController();
});
