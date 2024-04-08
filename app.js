const { Telegraf } = require("telegraf");
const { message } = require("telegraf/filters");

const bot = new Telegraf(process.env.BOT_TOKEN);
bot.start((ctx) => ctx.reply("Welcome"));

bot.on(message("text"), (ctx) => {
  const text = ctx.message.text;
  // Get links
  const getLinks = ctx.message.entities ? ctx.message.entities : null;
  if (getLinks) {
    getLinks.map((link) => {
      const offset = link.offset;
      const length = link.length;
      const type = link.type;
      if (type != "url") {
        return;
      }
      const url = text.substring(offset, offset + length);
      ctx.reply(url);
    });
  } else {
    console.log("sem nada");
  }
});

bot.launch();

function youtubeLink(url) {
  var pattern = /^(http(s)?:\/\/)?((w){3}.)?youtu(be|.be)?(\.com)?\/.+/;
  return pattern.test(url);
}

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
