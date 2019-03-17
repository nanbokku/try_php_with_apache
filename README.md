# try_php_with_apache

Vagrant + Docker 上で PHP 環境構築．MySQL を使用してみる．

- virtual box で ubuntu/xenial64 の仮想環境
- docker で PHP コンテナと MySQL コンテナ作成
- PHP7.3 と MySQL8.0

`docker-compose.yml`，`server/Dockerfile`にポイントになる部分はコメントとして残してある．

主に MySQL8.0 の認証方式の設定，  
PHP の docker image は`php:<version>-apache`を使用する，  
MySQL 拡張モジュールのインストールとか

## 全てのリクエスト URL が`http://localhost/example.php?id=123`みたいになるのが嫌

PHP 初心者なので，そもそも異なるリクエストを送るたびに`request1.php`とか`request2.php`とかファイル作らなくちゃいけないの？？とか全部のファイルを公開しなきゃいけないの？？とかわからないことだらけ

調べてみると apache のリライト機能で`example.php?id=123`を`example/123`みたいな感じに変更できるみたい．  
つまり，リクエストされた URL に対し，実際のアクセス先とは別のところへ導くことができる．

これを使えば公開ファイルは最小限で済むし，PHP で MVC ができる

例えば Ajax で`example/123`にリクエストを送るとする．  
リライト機能ですべてのリクエストを index.php で受けるようにして，`$_SERVER['REQUEST_URI']='example/123'`を参照し，呼び出す php ファイル(処理クラス)を変更する，とか．  
この場合公開する php ファイルは index.php だけでいいよねっていう．

## Apache の設定

php コンテナ内の`/etc/apache2/sites-available`ディレクトリの`000-default.conf`，`default-ssl.conf`を編集すればいいみたい．

1. デフォルトでは`var/www/html`以下を公開する設定になってるけど`var/www/html/public`以下を公開するように変更したい
1. apache で mode_rewrite したい

server/apache2/sites-available/000-default.conf

```apache
1: <VirtualHost *:80>
        # 1.
2:     <Directory /var/www/html/public>
                # 2.
3:             Options Indexes FollowSymLinks MultiViews
                # 2.
4:             AllowOverride All
                # 2.
5:             Require all granted
6:     </Directory>

~~~~~~~~~~~

# 1.
17: DocumentRoot /var/www/html/public
```

ファイルに上記を追記＆編集．

server/apache2/sites-available/default-ssl.conf

```apache
# 1.
5: DocumentRoot /var/www/html/public
```

上記を編集．

公開したいディレクトリ(server/public)に以下ファイルを作成．
server/public/.htaccess

```apache
# mod_rewriteの有効化
RewriteEngine On
# Rewrite処理後にベースとなるURLの指定
RewriteBase /
# REQUEST_FILENAME がファイルでないとき真
RewriteCond %{REQUEST_FILENAME} !-f
# REQUEST_FILENAME がディレクトリでないとき真
RewriteCond %{REQUEST_FILENAME} !-d
# 全てのRewriteCondで真だったときRewriteRuleが適用される
# 全てのリクエストは/index.phpに置き換えられる
# [L]はLastという意味で「このルールが適用されたら、この記述以降の他のルールは適用しない」という命令
RewriteRule . /index.php [L]
```

**上記ファイルのまとめ**

- mod_rewrite モジュールを使用出来る
- ファイルが存在しない
- ディレクトリが存在しない

という上記にあるすべての条件に当てはまるリクエストは、すべて「/index.php」を参照する．

## PHP のオートロード
