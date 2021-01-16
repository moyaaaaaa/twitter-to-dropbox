var express = require('express');
var router = express.Router();

router.post('/', function(req, res, next) {
    // requestを確認

    // payloadから画像URLを抜き出す

    // 画像を取得
    // Dropbox APIにそのまま渡せるかどうか

    // Dropbox APIのcreateを叩く
    
    
    res.json({result: 'success'});
});

module.exports = router;
