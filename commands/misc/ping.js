module.exports = {
    name: 'profile',
    description: 'does nothing',
    usage: 'none',
    category: 'Misc',
    permission: 0,
    execute(message, args){
       message.reply(`Pong! ${args}`);
    }
}