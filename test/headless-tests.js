var Browser = require('zombie');
var assert = require('assert');

Browser.localhost('localhost', 3200);

var browser = new Browser();

browser.visit('/admin', function(err){
	browser
		.fill('email', 'admin@admin.com')
		.fill('password', '123456')
		.pressButton('Admin', function(err){
			console.log('Success Test: ', browser.document.location.pathname);
		});
});
