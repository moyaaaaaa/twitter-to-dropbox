var express = require('express');
var router = express.Router();

const Twitter = require('twitter-v2');
 
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

router.post('/', async function(request, response) {
    // requestを確認
    const url = request.body.url
    if (!url) {
	return response.json({message: 'リクエストパラメータ url がありません。'})
    }
    const tweetId = getTweetIdFromUrl(url);

    // ツイートから画像URLを取得する
    const imageUrl = await getImageUrl(tweetId);

    // 画像を取得
    // Dropbox APIにそのまま渡せるかどうか

    // Dropbox APIのcreateを叩く
    
    
    response.json({result: 'success'});
});

/**
   tweetのURLからidを抽出する
   URLは以下のフォーマットを想定している
   http://twitte r.com/<username>/status/<tweet id>
*/
const getTweetIdFromUrl = urlString => {
    const url = new URL(urlString)
    return url.pathname.substring(url.pathname.lastIndexOf('/') + 1)
}

/**
   tweetに添付されている画像のURLを取得する
*/
const getImageUrl = async (tweetId) => {
    const imageUrl = await client.get(
	'tweets/' + tweetId,
	{
	    'expansions': 'attachments.media_keys',
	    'media.fields': 'url',
	}
    ).then((tweet) => {
	let imageUrl = '';

	if (tweet.includes && tweet.includes.media) {
	    tweet.includes.media.forEach((media) => {
		if (media.type !== 'photo') return;

		imageUrl = media.url;
	    });
	}

	return imageUrl;
    });

    return imageUrl;
}

module.exports = router;
