var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development';

// Create mail transporter for SMTP transport
var transporter = require('nodemailer').createTransport({
	service : 'Gmail',
	auth: {
		user: process.env.mailUser,
		pass: process.env.mailPass
	}
});

// Create routes here

router.get('/', function(req, res, next){
	res.render('home', { environment: env});
});

router.post('/message/', bodyParser.urlencoded({extended:false}), function(req,res,next){
	console.log('Posted to Message!');
	
	if (!req.body) {
		console.log('No url encoded data to parse!');
	}
	var data = '';
	for (var property in req.body){
		if (req.body.hasOwnProperty(property)) {
			data += property + ' : ' + req.body[property] + '\n';
		}
	}
	console.log(data);
	res.end(data);
})

module.exports = router;