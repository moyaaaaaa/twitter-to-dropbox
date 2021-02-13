var express = require('express');
var router = express.Router();
const https = require('https');
const fs = require('fs');

const Twitter = require('twitter-v2');
 
const client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_SECRET,
  access_token_key: process.env.TWITTER_ACESS_TOKEN_KEY,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET,
});

const dropboxV2Api = require('dropbox-v2-api');

const dropbox = dropboxV2Api.authenticate({
    token: process.env.DROPBOX_TOKEN
});

const STORE_DROPBOX_PATH = '/twitter';

router.post('/', async function(request, response) {
    // requestを確認
    const url = request.body.url
    if (!url) {
	return response.json({message: 'リクエストパラメータ url がありません。'})
    }
    const tweetId = getTweetIdFromUrl(url);

    // ツイートから画像URLを取得する
    const imageUrl = await getImageUrl(tweetId);
    
    // Dropboxに保存する
    saveToDropBox(imageUrl);

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
const getImageUrl = (tweetId) => {
    return client.get(
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
		return;
	    });
	}

	return imageUrl;
    });
}

/**
   Dropboxにファイルを保存する
   すでに同名のファイルがある場合は何もしない
*/
const saveToDropBox = async (imageUrl) => {
    const url = new URL(imageUrl)
    const filename = url.pathname.substring(url.pathname.lastIndexOf('/') + 1)

    // ファイルを/tmp下にダウンロード
    let outfile = fs.createWriteStream('/tmp/' + filename);
    https.get(url, async function(res) {
	res.pipe(outfile);
	res.on('end', function (){
            outfile.close();

	    // DropBoxにアップロード
	    // TODO: async awaitを使ってきれいに書きたい
	    dropbox({
		resource: 'files/upload',
		parameters: {
		    path: STORE_DROPBOX_PATH + '/' + filename
		},
		readStream: fs.createReadStream('/tmp/' + filename),
	    }, (err, result, response) => {
		if (err) { return console.log(err) }
	    });
	});
    });
}

module.exports = router;
