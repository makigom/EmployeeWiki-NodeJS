var Browser = require('zombie');
var assert = require('assert');

Browser.localhost('localhost', 3200);

describe('Headless Testing', function(){
	describe('Employees CRUD', function(){
		
		var browser = new Browser();		

		it('Creating new Employee', function(done){
			browser.visit('/panel/employees/new', function(){
				browser
					.fill('name', 'Graciela')
|					.fill('lastName', 'Prueba')
					.fill('email', 'graciela@prueba.com')
					.fill('password', 'gracielaprueba')
					.fill('confirm', 'gracielaprueba')
					.pressButton('Save', function(){
						if(browser.location.pathname == '/panel/employees'){
							done()
						} else {
							throw new Error('Fallo en alta de empleado');
						}
					});
			});
		});
		
		it('Editing Employee', function(done){});

		it('Deleting Employee', function(done){});
	});
});
