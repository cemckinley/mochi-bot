/**
 *  @module			config
 *  @description	Config for Mochi-Bot (domo-kun IRC chatbot)
 *
 *  @author			cemckinley <cemckinley@gmail.com>
 */


var config = {

	bot: {
		nick: 'Mochi',
		userName: 'Mochi',
		realName: 'Mochi the IRC Bot',
		address: 'chat.freenode.net',
		channels: ['#yourroom'],
		users: [],
		debug: true
	},
	twitter: {
		consumer_key: 'Twitter',
		consumer_secret: 'API',
		access_token_key: 'keys',
		access_token_secret: 'go here'
	}
};

module.exports = config;