#Mochi-bot

An IRC bot modeled after my cat. Sort of.

Mochi-bot is built from [Domo-kun](http://rikukissa.github.io/domo/) and runs on node.

##Setup

To run your own instance of Mochi-bot, clone the git repo and `npm install .`. Before running the bot, open up the `sample-config.js` file and populate it with your own irc chatroom info, as well as API keys for a twitter app. See [https://dev.twitter.com/apps](https://dev.twitter.com/apps) to set up a new twitter app using your own account. Rename the file to `config.js`.

Once your config is set up, open Terminal or whatever and run `node index.js` to start the app.

##Caution
Mochi-bot attempts to contribute to conversation by pulling related random material from Twitter, and may sometimes chat inappropriate things.