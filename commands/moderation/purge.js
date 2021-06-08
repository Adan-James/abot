module.exports = {
    name: 'purge',
    description: 'Deletes x amount of messages in a given channel. Defaults to the channel the message was sent in if no channel is provided.',
    usage: '<amount> [channel]',
    category: 'Moderation',
    permission: 'MANAGE_MESSAGES',
    execute(message, args){
        const client = message.client;
        var amount = parseInt(args[0]);

        if(amount > 99) {
            amount = 99;
            message.channel.send("You may only delete 99 messages at a time. Adjusted to 99.");
        }

        if(args[1]) {
            var channel = message.guild.channels.cache.get(args[1]);
            if(!channel){
                message.reply("This channel doesn't exist.");
                return;
            }else if(!channel.isText()) {
                message.reply("This isn't a text channel you goober.");
                return;
            }

            channel.bulkDelete(args[0]).then( msg => {
                channel.send(`Deleted ${args[0] + '1'} messages.`);
            }).catch(err => {
                channel.send("Failed to delete some messages, this is usually because the messages are older than 2 weeks.");
            });
        } else {
            var channel = message.channel;

            channel.bulkDelete(args[0]).then( msg => {
                channel.send(`Deleted ${args[0] + 1} messages.`);
            }).catch(err => {
                channel.send("Failed to delete some messages, this is usually because the messages are older than 2 weeks.");
            });
        }
    }
}