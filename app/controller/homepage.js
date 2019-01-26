'use strict';


// 
var mongoose = require('mongoose');





/**
 *	Member Change Profile
 */
exports.memberChangeProfile = function(req, res) {

	// 
	var userchangeProfile = mongoose.model('users');

	// 
	userchangeProfile.find({
		_id: req.body._id
	})
	.exec(function(err, data) {
		if (err) throw err;

		if (data.length) {
			userchangeProfile.update({
				_id: req.body._id
			}, {
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				email: req.body.email
			}, function(err, success) {

				if (err) throw err;

				if (success) {

					res.json('changeprofile Successfully');

				}

			});

		}
	});
}



/**
 *	Member Remove
 */
exports.memberRemove = function(req, res) {

	// 
	var userRemove = mongoose.model('users');
	var uid = req.params.id;

	// 
	userRemove.remove({_id: uid}, function(err, success) {
		if (err) throw err;

		if (success) {
			res.json('Delete user Successfully');
		}
	});
}