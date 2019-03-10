# try_php

Vagrant + Docker 上で PHP 環境構築．MySQL を使用してみる．

- virtual box で ubuntu/xenial64 の仮想環境
- docker で PHP コンテナと MySQL コンテナ作成
- PHP7.3 と MySQL8.0

`docker-compose.yml`にポイントになる部分はコメントとして残してある．

主に MySQL8.0 の認証方式の設定，  
PHP の docker image は`php:<version>-apache`を使用すると便利とか