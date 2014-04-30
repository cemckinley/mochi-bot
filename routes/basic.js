/**
 *  @module			routes/basic
 *  @description	Basic routes for mochibot
 *
 *  @author			cemckinley <cemckinley@gmail.com>
 */

var http = require('http');
var twitter = require('mtwitter');
var config = require('../config');


var basicRoutes = {

	state: {
		favoriteUser: null
	},
	twitter: new twitter(config.twitter),


	initialize: function(bot){

		for( var i = 0, len = this.routes.length; i < len; i++ ){
			bot.route.call( bot, this.routes[i].match, this.routes[i].action );
		}

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
			match: /\bbummer\b|\blame\b/gi,
			action: function(res){
				var self = this;

				getCatGif(function(gifSrc){
					self.say(res.channel, "When I am bummed out I like to sing the song of my people." + gifSrc);
				});
			}
		},
		{
			match: /(?=.*cat)(?=.*gif).*/gi,
			action: function(res){
				var self = this;

				getCatGif(function(gifSrc){
					self.say(res.channel, "Did someone say cat gif? " + gifSrc);
				});
			}
		},
		{
			match: /dumb/gi,
			action: function(res){
				this.say(res.channel, "SO DUMB! [freddie]");
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
			match: /(?=.*mochi).*\b(think|wonder|feel like)\b/gi,
			action: function(res){
				var self = this,
					msg = res.message,
					q;

				/**
				 * Remove RT, usernames, and hash symbols from a random tweet from data results
				 * Also clean up spaces after removing any words
				 * @param  {Object} data    Twitter data response
				 * @return {String}         Sanitized tweet text
				 */
				function getAndSanitizeTweet(data){
					var randomTweet = data.statuses[ Math.floor( Math.random() * data.statuses.length )].text,
						sanitized;

					sanitized = randomTweet.replace(/\bRT\b|\B@[A-Za-z0-9_]+|\B@\.[A-Za-z0-9_]+|\B\#/gi, "");
					sanitized = sanitized.replace(/\s+/gi, " ");

					return sanitized;
				}

				/**
				 * Get a random selection (5 items) of keywords from the message, return as an array
				 * @param  {String} str    user chat message
				 * @return {Array}         array of keywords
				 */
				function gatherRandomKeywords(str){
					var all,
						randIndex,
						keywords = [];

					str = str.replace(/\bthink\b|\bwonder\b|\bfeel like\b|\bi\b|\byou\b|\bwe\b|\bme\b|\bthem\b|\bthey\b|\bit\b|\ba\b|\bthe\b|\bthis\b|\bthat\b|\bwhat\b|\bis\b|\bwas\b|\bfor\b|\bmochi\b|\bdo\b|\babout\b/gi, "");
					all = str.replace(/\s+/gi, ",").split(",");

					for( var i = 0, len = 5; i < len; i++ ){
						if( all[i] === "" ) all.splice(i, 1);
						if( all.length > 0 ){
							randIndex = Math.floor( Math.random() * all.length );
							keywords.push( all[randIndex] );
							all.splice( randIndex, 1 );
						}
					}

					return keywords;
				}

				q = gatherRandomKeywords(msg);
				q = encodeURIComponent( q.join(" ") );

				// make request to twitter REST
				basicRoutes.twitter.get('search/tweets', {q: q}, function(err, data){
					var tweet;

					if(err){
						console.log(err);
					}else if(data){
						console.log(data);
						if( data.statuses && data.statuses.length > 0 ){
							tweet = getAndSanitizeTweet(data);
							self.say( res.channel, tweet );
						}else{
							console.log('Looked for tweets with query: ' + q + ', none found');
							self.say(res.channel, "I'm not really sure what to think about that.");
						}
					}
				});
			}
		}
	],
};


function getCatGif(callback){
	var httpOpts = {
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
		if( typeof callback === 'function' ) callback(response.headers.location);
	}).end();
}


module.exports = basicRoutes;
