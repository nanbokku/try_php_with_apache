# Apacheを含んだPHPイメージ
FROM php:7.3-apache

# MySQL拡張モジュール(MySQLに対して操作することができる関数が定義されている)
RUN docker-php-ext-install pdo_mysql
# Apacheのリライト機能を使用する(mod_writeを有効化)
RUN a2enmod rewrite