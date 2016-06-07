var Employee = require('../../../models/employees');
var mongoose = require('mongoose');
var assert = require('assert');

describe('Test of Employees', function(){
	before(function(done){
		mongoose.connect('mongodb://localhost/employeewiki', done);
	});
	
	it('Saving employee', function(done){
		var e = new Employee({ name: 'Macarena', lastName: 'Gomez', email: 'makigom@gmail.com', password: 'holamundo'});
	e.save(done);
	});
	
	it('Employee Authentication', function(done){
		var e = new Employee({ name: 'Macarena', lastName: 'Gomez', email: 'makigom@gmail.com', password: 'holamundo'});
		e.save(function(err, doc){
			assert.ok(e.authenticate('holamundo') === true, 'OK auth');
			assert.ok(e.authenticate('holamundooo') === false, 'OK auth');
		done();
		});
	});
	
	it('Editing employee', function(done){
		var e = new Employee({ name: 'Macarena', lastName: 'Gomez', email: 'makigom@gmail.com', password: 'holamundo'});
		var emp = new Employee({ name: 'Maki', lastName: 'Gom', email: 'makigom@gmail.com', password: 'holamundo'});
		Employee.findOne({ _id: e.id }, function(err, doc){
			doc.name = emp.name;
			doc.lastName = emp.lastName;
			doc.email = emp.email;
			doc.save();
		});
		done();
	});	

	it('Deleting employee', function(done){
		var e = new Employee({ name: 'Macarena', lastName: 'Gomez', email: 'makigom@gmail.com', password: 'holamundo'});
		Employee.remove({ _id: e.id });
		done();
	});
});
