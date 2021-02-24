var bot = new butthx.bot('TOKEN_BOT_MU')
function doPost(e){
  bot.handleUpdate(e) // handle response from telegram
  bot.command('start',(res)=>{
    bot.reply('Hi,Welcome!')
  }) // Bot akan menjawab pesan /startnya dengan Hi, Welcome!
} 

//Delpoy
function setWebhook(){  
  let res = bot.setWebhook('URL_HASIL_DEPLOY') //Taruh URL hasil deploy disini abistu jalankan functionnya(Boleh Diapus setelah dijalankan)
  Logger.log(res)
};
