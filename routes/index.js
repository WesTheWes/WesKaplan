var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var env = process.env.NODE_ENV || 'development';

// Create mail transporter for SMTP transport
var transporter = require('nodemailer').createTransport({
	service : 'Gmail',
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
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
	var message = req.body.message;
	var from = req.body.name;
	var email = req.body.email;
	var mailOptions = {
		from: process.env.MAIL_USER,
		to: process.env.MAIL_USER,
		subject: 'Message from sent from WesKaplan.com!',
		text: message + from + email
	}
	transporter.sendMail(mailOptions, function(err, info) {
		if(err) {
			res.render('formMessage', {success:false, name:from, email:email, message:message});
		} else {
			res.render('formMessage', {success:true, name:from, email:email, message:message});	
		}
	})
	
})

module.exports = router;