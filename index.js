var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var session = require('express-session');
var multer = require('multer');
var routes = require('./app/routers/routes');
var PORT = process.env.PORT || 5000;


var upload = multer({dest: 'public/uploads'}).single('photo');


var storage = multer.diskStorage({
  destination: function (request, file, callback) {
    callback(null, '/uploads');
  },
  filename: function (request, file, callback) {
    console.log('dsffs',file);
    callback(null, file.originalname)
  }
});
//
var app = express();



// session......
app.use(session({
	secret: 'perfect19028901820319283'
}));



app.engine('html', require('hbs').__express);
app.set('view engine', 'html');
app.set('views', process.cwd() + '/views');

app.use(express.static(__dirname + '/public'));



app.get('/', function(req, res) {
	res.render('index', {});

});



// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({
	extended: false
}))

// parse application/json
app.use(bodyParser.json())

// 
app.use('/', routes);


//connection mongoose
mongoose.connect('mongodb://localhost/samay-auto');



// create Schema
var Schema = mongoose.Schema;



// create userSchema
var userSchema = new Schema({
	firstName: String,
	lastName: String,
	email: String,
	passWord: String
});



// create user model
var user = mongoose.model('users', userSchema);









// table data fetch router
app.post('/listuser/:skip', function(req, res) {

	user.find({}).skip(Number(req.params.skip)).limit(5).exec(function(err, data) {

		if (err) throw err;

		if (data) {
			res.json({
				user: data
			});

		} else {

			console.log('error');

		}
		
	});

});







// create emailSchema
var emailSchema = new Schema({
	from: String,
	to: String,
	subject: String,
	message: String,
	date: String,
});


// create userEmail model
var mailUser = mongoose.model('email', emailSchema);









// Sent mail route
app.post('/sentmailuser', function(req, res) {

	mailUser.find({
		from: req.body.from
	}, function(err, data) {

		if (err) throw err;

		if (data) {
			res.json({
				user: data
			});

		} else {

			console.log('error');

		}

	});


});









// Inbox mail route
app.post('/inboxmailuser', function(req, res) {

	mailUser.find({
		to: req.body.to
	}, function(err, data) {

		if (err) throw err;

		if (data) {
			res.json({
				user: data
			});

		} else {

			console.log('error');

		}

	});


});

var fileSchema = new Schema({
	fieldname: String,
	originalname: String,
	encoding: String,
	mimetype: String,
	destination: String,
	filename: String,
	path: String,
	size: String
});


// create userEmail model
var fileUpload = mongoose.model('file', fileSchema);



app.post('/upload', function(request, response) {

    upload(request, response, function(err) {
        if(err) {
    		console.log('Error Occured');
    		return;
  		}

	    //	
		var fileModel = mongoose.model('file');
		var fileSave = new fileModel({
			fieldname: request.file.fieldname,
			originalname: request.file.originalname,
			encoding: request.file.encoding,
			mimetype: request.file.mimetype,
			destination: request.file.destination,
			filename: request.file.filename,
			path: request.file.path,
			size: request.file.size
		});

		fileSave.save(function(err, success) {
			if (err) throw err;

			if (success) {

				res.json('Email Data Insert Successfully');

			}
		});
        console.log(request.file);
        response.end('Your File Uploaded');
        console.log('Photo Uploaded');
  	})
});



// localhost:300
app.listen(PORT, function() {
	console.log('Example app listening on port 5000!')
});