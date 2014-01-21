/**
 *  @module			routes/basic
 *  @description	Basic routes for mochibot
 *
 *  @author			cemckinley <cemckinley@gmail.com>
 */

var http = require('http');


var basicRoutes = {

	initialize: function(bot){

		for( var route in this.routes ){
			if( this.routes.hasOwnProperty( route ) ){
				bot.route.call( bot, route, this.routes[route] );
			}
		}

	},

	routes: {

		":greeting mochi": function(res){
			var greeting = res.params.greeting || '';

			if( /hello|hi|hey/i.test(greeting) ){
				this.say(res.channel, res.nick + ' Meow moew beeep beep meep meow');
			}
		},

		"mochi": function(res){
			this.say( res.channel, "what " + res.nick.toUpperCase() );
		},

		"lol": function(res){
			this.say(res.channel, "Haha haha fun!");
		},

		":anything?bummer:anything2?": function(res){
			var self = this,
				httpOpts = {
					host: 'thecatapi.com',
					path: '/api/images/get?format=src&type=gif'
				},
				src = '';
				/*lols = [
					'http://media.yourdailymedia.com/4/cat_98.gif',
					'http://3.bp.blogspot.com/-TaxA8nFoMZI/UcF3eBfZ76I/AAAAAAAAkDM/DfQHzi4WAvM/s1600/funny-cat-gifs-055-004.gif',
					'http://www.ohmagif.com/wp-content/uploads/2013/03/funny-cat-using-hedgehog-to-comb-its-fur.gif',
					'http://3.bp.blogspot.com/-Oc3wDRTpeMU/UUmGMpCD6VI/AAAAAAAAgrw/ySayS_8pGcE/s1600/funny-cat-gifs-042-001.gif',
					'http://2.bp.blogspot.com/-BtaQ8wVnU2M/UnVpuJWmW0I/AAAAAAAAO0I/FCu9edR-1Sk/s1600/funny-cat-drinking-water.gif',
					'http://1.bp.blogspot.com/-RmCJjQU67NI/Ue-7WNBXJxI/AAAAAAAAnVY/jpvprp0qmfI/s1600/funny-cat-gifs-060-004.gif'
				],
				img = lols[ Math.floor( Math.random() * lols.length ) ];*/

			http.request(httpOpts, function(response){
				src = response.headers.location;
				self.say(res.channel, "Chill bro. Check this out: " + src);
			}).end();
		},

		":anything?dumb:anything2?": function(res){
			this.say(res.channel, "Maybe your mom is dumb [freddie]");
		}

	}

};

module.exports = basicRoutes;
