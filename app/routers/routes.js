'use strict';


// 
// module.exports = require('../lib/express');
var express = require('express');
var route = express.Router();
var mongoose = require('mongoose');
// var stringify = require('json-stringify-safe');
var ctr = {
	user: require('../controller/users'),
	homepage: require('../controller/homepage'),
	email: require('../controller/email')
}










// User
route.post('/api/user/register', ctr.user.userRegister);
route.post('/api/user/login', ctr.user.userLogin);
route.post('/api/user/change-profile', ctr.user.userChangeProfile);
route.post('/api/user/change-password', ctr.user.userChangePassword);
route.post('/api/user/logout', ctr.user.userLogout);

// user login and page refresh time not logout
route.get('/api/user/page-refresh', ctr.user.userPageRefresh);



// Member
route.post('/api/all/member/changeProfile', ctr.homepage.memberChangeProfile);
route.get('/api/member/remove/:id', ctr.homepage.memberRemove);



// 
route.post('/api/user/email-send', ctr.email.emailSend);








// 
module.exports = route;