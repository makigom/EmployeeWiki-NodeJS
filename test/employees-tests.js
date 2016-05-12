var Employee = require('../models/employees');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/employeewiki')
var e = new Employee({name: "Macarena", lastName:"Gomez", email: "makigom@gmail.com", password:"holamundo"});
e.save(function(err, doc){
	console.log(err, doc);

	console.log("PasswordOK", e.authenticate("holamundo"));
	console.log("PaswordFAIL", e.authenticate("Incorrect"));
});
