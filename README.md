# Setup
```
$ yarn install
```

```
export TWITTER_CONSUMER_KEY=""
export TWITTER_SECRET=""
export TWITTER_ACESS_TOKEN_KEY=""
export TWITTER_ACCESS_TOKEN_SECRET=""

export DROPBOX_TOKEN=""
```

# Start
```
$ yarn run start
```

http://localhost:3000 でアクセスできます。

# Setup IFTTT
1. If this に"Twitter: New liked tweet by you."を追加する
2. That thenに"Webhooks: Make a web request."を追加する
  * URLには上のプログラムが動いているサーバのURLを設定

![1](https://user-images.githubusercontent.com/6176318/107843237-c644e980-6e0c-11eb-928d-26b502df6839.png)

![2](https://user-images.githubusercontent.com/6176318/107843222-a8778480-6e0c-11eb-8719-f25c8f3e2de4.png)
