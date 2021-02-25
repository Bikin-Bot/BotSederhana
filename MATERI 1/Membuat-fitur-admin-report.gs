var bot = new butthx.bot('token bot kamu')
//jika kamu menggunkan versi beta maka var bot = new butthxbeta.bot('token bot kamu')

//jika kamu sudah memiliki fungsi doPost maka copy code di bawah ini.
bot.command('report',(res)=>{
 let admin = bot.getChatAdministrators(res.message.chat.id) //mendapatkan data admin di chat tersebut. 
 let admintag = '' //mendefinisikan mention admin
 for(let i = 0; i < admin.length; i++){
  if(admin[i].user.id !== bot.botInfo.id){ //id bot tidak akan masuk ke mention
    admintag += `<a href='tg://user?id=${admin[i].user.id}'>&#x200b;</a>` //membuat mention dengan unicode
  }
 }
 bot.replyToUser(`Dilaporkan!${admintag}`,{parse_mode:'HTML'}) //mengirim pesan.
})

// jika kamu belum memiliki fungsi doPost :
function doPost(e){
bot.handleUpdate(e) // menerima respon dari telegram
bot.command('report',(res)=>{
 let admin = bot.getChatAdministrators(res.message.chat.id) //mendapatkan data admin di chat tersebut. 
 let admintag = '' //mendefinisikan mention admin
 for(let i = 0; i < admin.length; i++){
  if(admin[i].user.id !== bot.botInfo.id){ //id bot tidak akan masuk ke mention
    admintag += `<a href='tg://user?id=${admin[i].user.id}'>&#x200b;</a>` //membuat mention dengan unicode
  }
 }
 bot.replyToUser(`Dilaporkan!${admintag}`,{parse_mode:'HTML'}) //mengirim pesan.
})
}

/*
Catatan:
Code diatas hanyalah contoh perlu disesuaikan dengan kebutuhan masing masing.
Pastikan Library 'butthx' sudah terinstall.
*/
