/**
 *  @module			mochi-bot
 *  @description	Main app file for Mochi-Bot (domo-kun IRC chatbot)
 *
 *  @author			cemckinley <cemckinley@gmail.com>
 */



var Domo = require('domo-kun');
var config = require('./config');

var basicRoutes = require('./routes/basic');


var mochi = new Domo(config.bot);

basicRoutes.initialize(mochi);

mochi.connect();