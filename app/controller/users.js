'use strict';


// 
var mongoose = require('mongoose');






/**
 *	User Register
 */
exports.userRegister = function(req, res) {
	
	// 
	var userModel = mongoose.model('users');

	// 
	var userForm = new userModel({

		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email,
		passWord: req.body.passWord
	});

	// 
	userModel.find({
			email: req.body.email,

		})
		.exec(function(err, data) {

			if (err) throw err;

			if (data.length) {
				
				res.json({
					status: true,
				});

			} else {
				userForm.save(function(err, success) {
					if (err) throw err;

					if (success) {

						res.json('Data Insert Successfully');

					}
				});
			}

		})
}






/**
 *	User Login
 */
exports.userLogin = function(req, res) {

	// 
	var userfindModel = mongoose.model('users');

	// 
	userfindModel.find({
			email: req.body.email,
			passWord: req.body.passWord
		})
		.exec(function(err, data) {

			if (err) throw err;

			if (data.length) {
				req.session.users = data[0];
				res.json({
					status: true,
					message: 'login Successfully',
					user: req.session.users
				});

			} else {
				res.json({
					status: false,
					message: 'Invalid login'
				});
			}

		})
}




/**
 *	User Change Profile
 */
exports.userChangeProfile = function(req, res) {

	// 
	var userchangePro = mongoose.model('users');

	// 
	userchangePro.update({
		_id: req.session.users._id
	}, {
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		email: req.body.email
	}, function(err, success) {

		if (err) throw err;

		if (success) {

			res.json('changeprofile Successfully');

		}

	})
	console.log(req.session.users._id);
}




/**
 *	User Change Password
 */
exports.userChangePassword = function(req, res) {

	// 
	var userchangePassword = mongoose.model('users');

	// 
	userchangePassword.update({
		_id: req.session.users._id
	}, {
		passWord: req.body.passWord
	}, function(err, success) {

		if (err) throw err;

		if (success) {

			res.json('changepassword Successfully');

		}

	})
}




/**
 *	User Logout
 */
exports.userLogout = function(req, res) {

	// 
	req.session.destroy();
    res.redirect('/#/home');
}




/**
 *	Refresh page time not logout user
 */
exports.userPageRefresh = function(req, res) {

	// 
	if (req.session && req.session.users) {

		res.json({
			status: true,
			user: req.session.users,
		});

	} else {
		res.json({
			status: false,
		});
	}
} 