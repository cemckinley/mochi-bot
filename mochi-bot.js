/**
 *  @module			mochi-bot
 *  @description	Main app file for Mochi-Bot (domo-kun IRC chatbot)
 *
 *  @author			cemckinley <cemckinley@gmail.com>
 */



var Domo = require('domo-kun');
var config = require('./config');


var mochi = new Domo(config);
	
mochi.route('hello mochi', function(res) {
	this.say(res.channel, 'Meow moew beeep beep meep meow');
});

mochi.connect();