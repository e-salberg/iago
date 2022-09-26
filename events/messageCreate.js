module.exports = {
    name: "messageCreate",
    execute(msg) {
        const sadWords = ["sad", "depressed", "unhappy", "angry", "miserable", "tilt", "smurf", "f***", "s***", "damn", "kill"];
        const encouragementMsg = "keep it pma, keep it bsj";

        if (sadWords.some(word => msg.content.includes(word))) {
            msg.reply(encouragementMsg);
        }
    },
};