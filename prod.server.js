var express = require('express');
var config = require('./config/index');

var port = process.env.PORT || config.build.port;

var app = express();

var router = express.Router();

router.get('/', function (req, res, next) {
	req.url = '/index.html';
	next();
});

app.use(router);

//读取data.json数据
var appData=require('./static/data.json')
var seller=appData.seller;
var goods=appData.goods;
var ratings=appData.ratings;
//定义express路由
var apiRouter=express.Router();
apiRouter.get('/seller',function(req,res){
      res.json({
            errorno:0,
            data:seller
      });
});
apiRouter.get('/goods',function(req,res){
      res.json({
            errorno:0,
            data:goods
      });
});
apiRouter.get('/ratings',function(req,res){
      res.json({
            errorno:0,
            data:ratings
      });
});
app.use('/api',apiRouter);

app.use(express.static('./dist'));

module.exports = app.listen(8080, function (err) {
	if (err) {
		console.log(err);
		return;
	}
	console.log('Listening at http://localhost:' + 8080 + '\n');
});
