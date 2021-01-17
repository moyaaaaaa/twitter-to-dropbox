var express = require('express');
var router = express.Router();

const Twitter = require('twitter-v2');
 
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

router.post('/', function(request, response) {
    // requestを確認
    const payload = request.body.payload
    if (!payload) {
	return response.json({message: 'リクエストパラメータ payload がありません。'})
    }

    // payloadから画像URLを抜き出す

    // WIP: ツイートから画像URLを取得する
    client.get(
	'tweets/' + '1350647727554584576',
	{
	    'expansions': 'attachments.media_keys',
	    'media.fields': 'url',
	}
    ).then((tweet) => {
	console.log(tweet);
	if (tweet.includes && tweet.includes.media) {
	    tweet.includes.media.forEach((media) => {
		console.log(media);
		
		if (media.type !== 'photo') return;
		
		console.log(media.url);
	    });
	}
    })

    // 画像を取得
    // Dropbox APIにそのまま渡せるかどうか

    // Dropbox APIのcreateを叩く
    
    
    response.json({result: 'success'});
});

module.exports = router;
