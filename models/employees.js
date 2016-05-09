var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var employeeSchema = new Schema ({
	name: String,
	lastName: String,
	email: String,
	password: String
});

var employeeModel = mongoose.model('Employees', employeeSchema);

module.exports = employeeModel;
