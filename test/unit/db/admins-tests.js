var Admin = require('../../../models/admins.js');
var mongoose = require('mongoose');
var assert = require ('assert');

describe('Test of Admins', function(){
	before(function(done){
		mongoose.connect('mongodb://localhost/employeewiki', done);
	});

	it('Admin Authentication', function(done){
		var adm = new Admin({ email:'admin@admin.com', password:'123456'});
		adm.save(function(err, doc){
			assert.ok(adm.authenticate('123456') === true, 'OK auth');
			assert.ok(adm.authenticate('12345') === false, 'OK auth');
			done();
		});
	});
	
	after(function(done){
		mongoose.connection.close(done);
	});
});


