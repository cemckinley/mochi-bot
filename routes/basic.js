/**
 *  @module			routes/basic
 *  @description	Basic routes for mochibot
 *
 *  @author			cemckinley <cemckinley@gmail.com>
 */

var http = require('http');


var basicRoutes = {

	initialize: function(bot){

		for( var i = 0, len = this.routes.length; i < len; i++ ){
			bot.route.call( bot, this.routes[i].match, this.routes[i].action );
		}

	},

	state: {
		favoriteUser: null
	},

	routes: [

		{
			match: ":greeting mochi",
			action: function(res){
				var greeting = res.params.greeting || "";

				if(/\bhello\b|\bhi\b|\bhey\b/i.test(greeting) ){
					this.say(res.channel, res.nick + " Meow meow beeep beep meep meow");
				}
			}
		},
		{
			match: "mochi",
			action: function(res){
				this.say( res.channel, "what " + res.nick.toUpperCase() );
			}
		},
		{
			match: /lol/gi,
			action: function(res){
				this.say(res.channel, "Haha haha fun!");
			}
		},
		{
			match: /bummer|lame/gi,
			action: function(res){
				var self = this,
					httpOpts = {
						host: "thecatapi.com",
						path: "/api/images/get?format=src&type=gif"
					},
					src = "";
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
			}
		},
		{
			match: /dumb/gi,
			action: function(res){
				this.say(res.channel, "Maybe your mom is dumb [freddie]");
			}
		},
		/**
		 * User gives something to mochi.
		 */
		{
			match: /(?=.*give)(?=.*mochi).*/gi,
			action: function(res){
				var self = this,
					msg = res.message,
					rageInterval,
					rageActions = ['POUNCE', 'SNORT', 'HOWL', 'PURR'],
					rageCounter = 15;

				if( /petsies|hug|love/gi.test(msg) ){
					this.say(res.channel, "Purrrrrrrrrrrrrrrrr meep");

				}else if( /cheese|food|treat/gi.test(msg) ){
					basicRoutes.state.favoriteUser = res.nick;
					this.say(res.channel, res.nick + " is my favorite person!");

				}else if ( /catnip/gi.test(msg) ){

					this.say( res.channel, "I'M OVER 9000!!11!!!!!");
					rageInterval = setInterval(function(){
						if( rageCounter >= 0 ){
							self.say( res.channel, rageActions[Math.floor( Math.random() * rageActions.length )] );
							rageCounter--;
						}else{
							clearInterval(rageInterval);
						}
					}, 300);

				}else{
					this.say(res.channel, "Mochi don't want that shit");
				}
			}
		},
		/**
		 * user asked who is mochi's favorite, mochi responds
		 */
		{
			match: /(?=.*who)(?=.*mochi)(?=.*favorite)(?=(?!.*least)(?!.*not)).*/gi,
			action: function(res){
				if( typeof basicRoutes.state.favoriteUser === 'string' ){
					this.say(res.channel, basicRoutes.state.favoriteUser + ' is my favorite.');
				}else{
					this.say(res.channel, "I'm not particularly fond of any of you right now.");
				}
			}
		},
		{
			match: /\bthink\b|\bwonder\b|\bfeel like\b/gi,
			action: function(res){
				var self = this,
					httpOpts = {
						host: "api.reddit.com",
						path: "/comments.json?limit=10"
					},
					msg = res.message,
					q;

				q = msg.replace(/\bthink\b|\bwonder\b|\bfeel like\b|\bi\b|\byou\b|\bwe\b|\bme\b|\bthem\b|\bthey\b|\bit\b|\ba\b|\bthe\b|\bthis\b|\bthat\b/gi, "");
				q = q.replace(/\s+/gi, ",").split(",");
				q.length = 5;
				q = q.join(" ");

				httpOpts.path += '&q=' + encodeURIComponent(q);

				console.log(httpOpts.path);
			}
		}
	]

};

module.exports = basicRoutes;
