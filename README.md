#Mochi-bot

An IRC bot modeled after my cat. Sort of.

Mochi-bot is built from [Domo-kun](http://rikukissa.github.io/domo/) and runs on node.

##Features

Mochi-bot is an experimental chat bot that picks up on keywords in conversation and reacts to them, rather than having explicit commands. Some of Mochi's actions include:

- Posting random animated cat gifs when someone mentions that something is a "bummer" or "lame"
- You can greet mochi with 'hey/hello/hi mochi' and he will greet you back
- You can try to give mochi things, like 'give mochi petsies' and he might respond positively. See if you can figure out what things mochi likes.
- If you give mochi the right things, you might become his favorite person. You can ask him who his favorite is with 'who is mochi's favorite'
- Mochi will pick up on conversation where people are expressing opinions, by looking for keywords like 'think', 'wonder', or 'feel like', and then he might contribute his own opinion.

##Setup

To run your own instance of Mochi-bot, clone the git repo and `npm install .`. Before running the bot, open up the `sample-config.js` file and populate it with your own irc chatroom info, as well as API keys for a twitter app. See [https://dev.twitter.com/apps](https://dev.twitter.com/apps) to set up a new twitter app using your own account. Rename the file to `config.js`.

Once your config is set up, open Terminal or whatever and run `node index.js` to start the app.

##Caution
Mochi-bot attempts to contribute to conversation by pulling related random material from Twitter, and may sometimes chat inappropriate things.