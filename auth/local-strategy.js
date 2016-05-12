var passport = module.parent.exports.passport, 
	LocalStrategy = require('passport-local').Strategy,
	Admins = require('../models/admins.js');

passport.serializeUser(function(user, done){
	done(null, user);
});

passport.deserializeUser(function(user, done){
	done(null, user);
});

passport.use('AdminLogin', new LocalStrategy(
	{
		usernameField: 'email',
		passwordField: 'password'
	},
	function(username, password, done){
		Admins.findOne({ email:username }, function(err, adm){
			if (err) { return done(err); }
			if (!adm){
				return done(null, false, { message: 'Incorrect Username.'});
			}	
			if (!adm.authenticate(password)) {
				return done(null, false, { message: 'Incorrect Password'});
			}
			return done(null, adm);
		});
	}
));
