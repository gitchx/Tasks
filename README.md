# Tasks
さくらのレンタルサーバーのライトプランなどSSH接続ができずComposerが使えないレンタルサーバーでも動かせる、PHPとSQLiteで作るシンプルなタスク管理Webアプリ

## 技術スタック
- PHP
- SQLite
- React
- Vite


## セットアップ
nginx + php-fpmなどでphpが実行できる環境を作る

nginxディレクトリとphpディレクトリにはMacでHomebrewでセットアップしたときのサンプルがあります。
Apple SiliconのMacのHomebrewだと、

nginxの設定ファイルは
~~~
/opt/homebrew/etc/nginx/nginx.conf
~~~

php-fpmの設定ファイルは
~~~
/opt/homebrew/etc/php/8.4/php-fpm/www.conf
~~~

## 開発環境と本番環境
Reactの開発をするときはfrontendディレクトリで
~~~
pnpm dev run
~~~
を実行して、Viteの開発サーバーを立ち上げて作業する

PHPの開発をするときは、
Reactは
~~~
pnpm build
~~~
でビルドをする必要がある

nginxでbackendディレクトリをWebに公開して、index.phpにアクセスできるようにする
php-fpmをnginxで使うための設定が必要

本番環境では、backendディレクトリの中身だけで動かせる想定