module.exports = {
    name: 'play',
    description: 'Play a YouTube link.',
    usage: '<URL>',
    category: 'Voice',
    permission: 0,
    execute(message, args){
        var vchannel = message.member.voice.channel;
        const streamOptions = { seek: 0, volume: 1 };

        if(!vchannel){
            message.reply("You're not in a voice channel you goober.");
            return;
        }

        if(client.GetDispatcher(message.guild.id)) {
            if(client.IsAdmin(message.member)) {
                
            }else {
                message.reply(`Queued ${args[0]}`);
            }

            // TODO: make this work gegegegegegegegegegegegegegegeg
        }
        
        vchannel.join().then(conn => {
            console.log("Joined a voice channel.");

            const stream = ytdl(args[0], {filter : 'audioonly'});
            const dispatcher = conn.play(stream, streamOptions);
            dispatcher.on('finish', end => {
                message.channel.send("Your video has ended. Play another, otherwise the bot will disconnect in 1 minute.").then( msg => {
                    setTimeout(function(){
                        vchannel.leave();
                        client.RemoveDispatcher(message.guild.id);
                    }, 60000);
                })
            });
        }).catch(err => {
            console.log(`mega error playing audio - ${args[0]}\nError: ${err}`);
            message.reply("An error appeared while trying to play this video. Are you sure this video isn't private/exists?");
        })
    }
}