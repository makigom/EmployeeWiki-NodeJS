var app = module.parent.exports.app;
var Employees = require('../models/employees.js');

app.get('/panel/employees', function(req, res){
	Employees.find({}, function(err, docs){
		res.render('list', { title: 'Employee List', employees: docs});
	});
});

app.get('/panel/employees/new', function(req, res){
	res.render('new',{ title: 'New Employee'});
});

app.post('/panel/employees/new', function(req, res){
	console.log(req.body);
	var e = new Employees({ name: req.body.name, lastName: req.body.lastName, email: req.body.email, password: req.body.password});
	e.save(function(err, doc){
		if(!err){
			res.redirect('/panel/employees');
		} else{
			res.end(err);
		}
	});
});
