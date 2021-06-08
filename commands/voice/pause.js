module.exports = {
    name: 'pause',
    description: 'Pauses a audio stream.',
    usage: 'NONE',
    category: 'Voice',
    permission: 0,
    execute(message, args){
        var vchannel = message.member.voice.channel;

        if(!vchannel){
            message.reply("You're not in a voice channel you goober.");
            return;
        }

    }
}