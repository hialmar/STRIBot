var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
    token: auth.token,
    autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, theUserID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) === '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);
        switch(cmd) {
            case 'help':
                bot.sendMessage({
                    to: channelID,
                    message: 'Je comprends les commandes suivantes :\n'+
                        '!ping : renvoie Pong\n'+
                        '!groupe_a : ajoute au groupe TP A en L3/1A\n'+
                        '!groupe_b : ajoute au groupe TP B en L3/1A\n'+
                        '!groupe_c : ajoute au groupe TP C en L3/1A\n'
                });
                break;
            // !ping
            case 'ping':
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
                break;
            // Just add any case commands if you want to..
            case 'groupe_a':
                // let role = bot.servers['690148661770059865'].roles['690570420989984768'];
                bot.addToRole(
                    {
                        serverID:'690148661770059865',
                        userID:theUserID,
                        roleID:'690570420989984768'
                    },
                    (error) => {
                        if(error !== null) {
                            console.log(error);
                        } else {
                            bot.sendMessage({
                                to: channelID,
                                message: 'Tu as été ajouté au Groupe de TP A, tu devrais maintenant voir le canal privé de ce groupe.'
                            });
                        }
                     });
                break;
            case 'groupe_b':
                //console.log(bot.servers['690148661770059865'].roles)
                // let role = bot.servers['690148661770059865'].roles['690570420989984768'];
                bot.addToRole(
                    {
                        serverID:'690148661770059865',
                        userID:theUserID,
                        roleID:'690570576414375986'
                    },
                    (error) => {
                        if(error !== null) {
                            console.log(error);
                        } else {
                            bot.sendMessage({
                                to: channelID,
                                message: 'Tu as été ajouté au Groupe de TP B, tu devrais maintenant voir le canal privé de ce groupe.'
                            });
                        }
                    });
                break;
            case 'groupe_c':
                // let role = bot.servers['690148661770059865'].roles['690570420989984768'];
                bot.addToRole(
                    {
                        serverID:'690148661770059865',
                        userID:theUserID,
                        roleID:'690570679019634798'
                    },
                    (error) => {
                        if(error !== null) {
                            console.log(error);
                        } else {
                            bot.sendMessage({
                                to: channelID,
                                message: 'Tu as été ajouté au Groupe de TP C, tu devrais maintenant voir le canal privé de ce groupe.'
                            });
                        }
                    });
                break;
        }
    }
});
