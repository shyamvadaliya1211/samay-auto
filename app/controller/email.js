'use strict';


// 
var mongoose = require('mongoose');




exports.emailSend = function(req, res) {

	// 
	var userEmailModel = mongoose.model('email');

	// 
	var userEmailSave = new userEmailModel({
		from: req.body.from,
		to: req.body.to,
		subject: req.body.subject,
		message: req.body.message,
		date: req.body.date
	});


	
		userEmailSave.save(function(err, success) {
			if (err) throw err;

			if (success) {

				res.json('Email Data Insert Successfully');

			}
		});
}