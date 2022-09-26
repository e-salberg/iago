const { bot_channelId } = require('../config.json');
module.exports = {
    name: "speech",
    execute(msg) {  
        const sadWords = ["sad", "depressed", "unhappy", "angry", "miserable", "tilt", "smurf", "f***", "s***", "damn", "kill"];
        const encouragementMsg = "keep it pma, keep it bsj";

        // If bot didn't recognize speech, content will be empty
        if (!msg.content) return;

        if (sadWords.some(word => msg.content.includes(word))) {
            msg.client.channels.cache.get(bot_channelId).send(`hey ${msg.author}! ${encouragementMsg}`);
            //msg.author.send(encouragementMsg)
        }
    }
};