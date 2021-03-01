var bot = new butthxbeta.bot('token bot')
var db = new miniSheetDB.init("id Spreadsheet","nama sheet")
var mt = new butthx.mt() // library untuk memparse tombol (sudah include sejak versi 3)
function doPost(e){
  bot.handleUpdate(e) //handle update dari telegram
  bot.command("setwlc",(res)=>{ // membuat command save
   if(!res.message.reply_to_message){return} //jika  tidak reply message maka ga akan di respon
   bot.replyToMessage(save(res.message.chat.id,res.message.reply_to_message.text)) // menyimpan welcome
   let parse = JSON.parse(mt.all(res.message.reply_to_message.text)) // memformat tombol
  if(parse.keyboard.length == 0){
    return bot.replyToMessage(parse.text,{parse_mode:'HTML'}) //mengirim contoh welcome tanpa tombol
   }else{
    return bot.replyToMessage(parse.text,{parse_mode:'HTML',reply_markup:{inline_keyboard:parse.keyboard}}) //dengan tombol
   }
  })
  bot.command("rmwlc",(res)=>{ //command remove welcome
   return bot.replyToMessage(remove(res.message.chat.id))
 })
  bot.command("getwlc",(res)=>{ // command untuk mengambil welcome
   let data = find(res.message.chat.id) // mencari apakah datanya ada
   if(data){ //jika ada maka akan di balas dengan data welcome
    return bot.replyToMessage(data)
   }
  }) // jika ada anggota baru : 
  bot.on("new_chat_member",(res)=>{
   let msg_id = getmsg(res.message.chat.id) // mengambil message_id dari database
   let data = find(res.message.chat.id) // mengambil data welcome dari database
   let firstName = res.message.new_chat_member.first_name // mengubah template
   let id = res.message.new_chat_member.id
   let lastName = res.message.new_chat_member.last_name
   let userName = res.message.new_chat_member.username
   let fullName = null
    if(lastName){
      fullName = firstName+" "+lastName
    }else{
      fullName = firstName
    }
   let mention = "<a href='tg://user?id="+id+"'>"+fullName+"</a>"
   if(data){ //jika datanya ada maka : 
    try{ // bot akan mencoba menghapus pesan yang lama
        bot.deleteMessage(res.message.chat.id,res.message.message_id)
        bot.deleteMessage(res.message.chat.id,Number(msg_id))
      }catch (e){
      } // memparse tombol
    let p = JSON.parse(mt.all(data))
    let text = p.text
       .replace(/\{firstName\}/gmi,firstName)
       .replace(/\{lastName\}/gmi,lastName)
       .replace(/\{id\}/gmi,id)
       .replace(/\{fullName\}/gmi,fullName)
       .replace(/\{mention\}/gmi,mention)
       .replace(/\{username\}/gmi,userName)
    if(p.keyboard.length == 0){ // jika tidak ada tombol
       let msg = bot.replyHTML(text) // mengirim pesan welcome
       return svmsg(msg.chat.id,msg.message_id) // menyimpan message_id
    }else{ // jika ada tombol
      let msg =  bot.replyHTML(text,{reply_markup:{
        inline_keyboard : p.keyboard
       }}) // mengirim pesan welcome
       return svmsg(msg.chat.id,msg.message_id) // menyimpan message_id
    }
   }
  })
}

//kita bikin fungsi save message_id
function svmsg(chat_id,msg_id){
  let r = indexRows(chat_id) // mencari baris dimana chat_id disimpan
  if(r){
    return db.setValue(r,3,msg_id) // menambahkan message_id di baris yang sama kolom ke 3
  }
}
//kita bikin fungsi mengambil message_id
function getmsg(chat_id){
  let r = indexRows(chat_id) // mencari baris chat_id
  if(r){
    return db.getValue(r,3) // mendapatkan message_id di baris yang sama kolom ke 3
  }
}
// kita bikin fungsi untuk deteksi pesannya udah ada atau belum
function indexRows(chat_id){
let r = db.has(chat_id) //jika tags belum ada
if(!r){ //maka di return 
  return false  //false
}
let data = db.getAll() //mengambil semua data yang ada di Spreadsheet
let result = false //definisikan hasil
bot.build.loop(data.length,(i)=>{ // looping
  let r = data[i][0] //data looping
  if(r == chat_id){ // jika data = chat_id
   result = i + db.baris // return true
  }
})
return result
}
//kita bikin function save message
function save(name,value){
 let r = indexRows(name) //detect dulu pesannya ada atau tidak
 if(r){ //jika ada maka di update
   db.setValue(r,db.nKolom,value) // r = hasil dari indexRows nKolom = kolom di google sheet
   return 'welcome updated!' //jika ada maka kita update
 }else{ //jika belum ada maka kita bikin lagi
   let ra = db.sheet.getLastRow() +1 //kita ambil baris terakhir
   db.setValue(ra,db.kolom,name) //kita bikin chat_id
   db.setValue(ra,db.nKolom,value) //kita bikin value
   return 'welcome saved!' //kita return berhasil
 }
}
//kita bikin fungsi delete
function remove(name){
 let r = indexRows(name) //cek apakah pasannya ada
 if(!r){ // jika tidak ada maka akan di return not found
   return 'not found!'
 } //jika ada maka kita delete dan kita return berhasil.
  db.sheet.deleteRow(r)
   return 'deleted!'
}
//kita bikin fungsi cari 
function find(name){
 let r = indexRows(name) // posisi welcome message
 if(!r){ // jika tidak ada
  return false
 } //jika ada akan mengambil value dari chat_id tersebut.
 return db.getValue(r,db.nKolom)
}
/*
Catatan :
- Pastikan Library minidb bang hasan sudah terinstal
- Pastikan Library butthx sudah terinstal dan versi terbaru
- silakan modifikasi sesuai keinginan. ini hanya dasar pembuatan.
- bugs? silakan join grup diskusi untuk mendapatkan bantuan.
*/
