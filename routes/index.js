var express = require('express');
var router = express.Router();

router.post('/', function(request, response) {
    // requestを確認
    const payload = request.body.payload
    if (!payload) {
	return response.json({message: 'リクエストパラメータ payload がありません。'})
    }

    // payloadから画像URLを抜き出す

    // 画像を取得
    // Dropbox APIにそのまま渡せるかどうか

    // Dropbox APIのcreateを叩く
    
    
    response.json({result: 'success'});
});

module.exports = router;
