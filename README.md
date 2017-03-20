# nuxt-task-app

実物：https://nuxt-task-app.herokuapp.com/

nuxt.js + koa.js = ⚡⚡

## 開発環境構築

### nodejsのバージョンについて

koa@nextでasync/awaitを使用してます。これはbabelで落とし込んでないので、

**Node.jsのバージョンは最低でも v7.0.0 を使う必要があります。**

[nvm](https://github.com/creationix/nvm)などで最新版をinstallしてください。

もしnodeのバージョン管理に興味が無いのであれば、[公式サイト](https://nodejs.org/ja/)のインストーラーが手早いです。

### MongoDBの用意について

プロジェクトではODMとしてmongooseを使用してます。

mongooseではjsonファイル式データベースもどきは使用できません。

なので、MongoDBをインストールしていただくことは避けられません。

macの場合は、

```
$ brew update
$ brew install mongodb
```

によるインストールでよいです。最新版ではないですが、このプロジェクトでは問題ないです

開発時は、`mongodb://localhost/nuxt-task-app`がDBのアドレスとなります。

### cloneしてからサーバーをたてるまで

``` bash
$ npm install # または yarn install

# build & watch & serve http://localhost:3000
$ npm run dev
```

## 使った技術について

### nuxt.js

nuxt.js + koa.jsとトップで書いてますが、ほぼnuxtの機能で出来てます。

Reactではnext.jsというフレームワークがありますが、

それに対して、Vuejs v2 でも nuxt.js という名前で似たような事をしようとしたのがnuxt.jsです。

nuxt.jsは主にサーバーサイドレンダリング（以降SSRと書く）に対して強いです。おまけとして、以下のような特徴があります。

* Webpack/Babelの設定書く必要なし
* *.vueファイルを書くだけでOK
* pagesディレクトリにファイル追加すると自動ルーティング
* ルートコンポーネント内のサーバデータに簡単アクセス
* scaffoldingを提供してくれる

他に、微妙に嬉しい点としては、browserifyをしたあともprocess.env.NODE_ENVなどを引き継げるようにするためにconfigファイルも存在します。

要するに、ブラウザ側でもdevelopmentモードかproductionモードかをかんたんに判別できます。

### vue.js v2

vue.jsを触るのは初めてでしたが、おもったよりも使いやすいと感じました。

単一ファイルコンポーネントに関しては、見た目もreactほどグロくないのでデザイナーさんにも優しいし実用レベルだと思います。

reactに関しては、コンポーネントに対しスタイルを適用するのがあまりにもずさんなところがありました。

Radiumなどのcss-in-js系のものが出てきたり、postcssのようにcssをjsにコンパイルしてどうにかする系のものがありました。

しかし、これらはcss in jsはemmetなどのスニペットやメタ言語が使えない点で弱く、postcssでどうにかしようとした場合もセレクタが不自然で問題解決にはすこし遠い存在でした。

それを全てvuejsの単一ファイルコンポーネントという概念やscoped cssが問題解決してる点ですばらしいと感じました。

データの取扱に関しても文句ないです。

### vuex

[vuex](https://vuex.vuejs.org/ja/intro.html)はflux系のアーキテクチャです。

![Alt text](./1490028379776.png)

引用：https://vuex.vuejs.org/ja/intro.html

viewがapiの使用が必要になったとき、actionsというところにapiを叩くようお願いをしに行きます(dispatch)。

actionsはそれを検知し、apiを使用し、apiからのレスポンスがあり次第mutationsにそのデータを渡します。

mutationでは受けた情報をもとにstateをアップデートします。

stateの更新をvuejsが検知し次第、vueは要素の差分を計算してrenderします。

### koa@next

基本的にapiサーバとして振る舞います。

apiを発行するだけならkoa以外に軽量なものもありますが、nuxtのscaffoldingでサポートされていたため採用しました。

apiが呼ばれた時、mongooseを通じてmongodbを操作して、responseを発行してます。

/api/から始まらないルーティングの部分にアクセスされた場合、それ以上koaは深入りせずnuxt-routerにまかせてます

### 仕様書にない追加点

今日、明日、明後日が〆切であるようなTODOが存在し、なおかつwebアプリが踏まれた場合、

ブラウザのプッシュ通知機能を使ってそのTODO名を通知します。

通知は1日に1回だけしか発生しません。/assets/js/notify.jsを参照。
