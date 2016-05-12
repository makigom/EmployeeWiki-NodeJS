var app = module.parent.exports.app;
var passport = module.parent.exports.passport;
var Employees = require('../models/employees.js');
var Admins = require('../models/admins.js');

var adminAuth = function(req, res, next){
	if(typeof req.user != "undefined"){
		next();
	} else {
		res.redirect('/');
	}
}

app.use(function(req, res, next){
	res.locals.user = req.user;
	next();
});

app.get('/admin', function(req, res){
	res.render('admin', { title: 'Login'});
});

app.get('/logout', function(req, res){
	req.logout();
	res.redirect('/');
});

app.post('/admin', passport.authenticate('AdminLogin',
	{ successRedirect: '/panel/employees',
	  failureRedirect: '/admin',
	  failureFlash: true
	}));

app.get('/panel/employees', adminAuth, function(req, res){
	Employees.find({}, function(err, docs){
		res.render('list', { title: 'Employee List', employees: docs});
	});
});

app.get('/panel/employees/new', adminAuth, function(req, res){
	var msg = req.flash('message');
	res.render('new', { title: 'New Employee', flashmsg: msg});
});

app.post('/panel/employees/new', adminAuth, function(req, res){
	if(req.body.password === req.body.confirm){
		console.log(req.body);
		var e = new Employees({ name: req.body.name, lastName: req.body.lastName, email: req.body.email, password: req.body.password});
		e.save(function(err, doc){
			if(!err){
				res.redirect('/panel/employees');
			} else{
				res.end(err);
			}
		});
	} else {
		req.flash('message', 'La contraseña y su confirmacion no coincide');
		res.redirect('/panel/employees/new');
	}
});

app.get('/panel/employees/delete/:id', adminAuth, function(req, res){
	Employees.remove({ _id: req.params.id}, function(err, doc){
		if(!err){
			res.redirect('/panel/employees');
		} else {
			res.end(err);
		}	
	});
});

app.get('/panel/employees/edit/:id', adminAuth, function(req, res){
	Employees.findOne({ _id: req.params.id }, function(err, doc){
		if(!err){
			res.render('edit', { title: 'Edit Employee', employee:doc});
		} else {
			res.end(err);
		}
	});
});

app.post('/panel/employees/edit/:id', adminAuth, function(req, res){
	Employees.findOne({ _id: req.params.id}, function(err, doc){
		if(!err){
			doc.name = req.body.name;
			doc.lastName = req.body.lastName;
			doc.email = req.body.email;
			doc.save(function(err, doc){
				if(!err){
					res.redirect('/panel/employees');
				} else {
					res.end(err);
				}
			});
		} else {
			res.end(err);
		}
	});
});
