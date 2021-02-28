/*
Sebelum Mulai pasang lib database spreedsheet dulu ya!
ID lib : 1NLQhvkXR9BHzlLELujjwFuEwY9rKaSPGZdE9Fqlfuccza0T4Fe3n5kXk
lebih jelas ada di pin message @botindonesia
*/

var bot = new butthx.bot('token bot kamu')
var db = new miniSheetDB.init('Id Spreadsheet kamu','nama sheet kamu')
function doPost(e){
  bot.handleUpdate(e)
  saveUser(bot.update.message.chat.id) //ketika ada update maka akan save user
  bot.cmd(["broadcast","announcement"],(res)=>{ // command /broadcast atau /announcement akan di eksekusi
     let adminId = 1234567890 // id admin (id kamu)
     if(res.message.from.id == adminId){ // jika admin
      if(!res.message.reply_to_message){ // jika tidak reply pesan
       return bot.replyToMessage("Please reply message") // maka bot akan mengirimkan pesan
      } // jika reply pesan maka bot akan melakukan broadcast pesan
     return broadcast(res.message.reply_to_message.text,res.message.reply_to_message.entities)
    }
  })
}
//bikin fungsi save user dulu dengan library minidbnya bang hasan biar lebih simple.
function saveUser(userID){
 let range = db.has(userID) // kita cek apakah id user ada atau tidak.
 if(!range){ //jika belum ada maka kita tambahin
  let row = db.sheet.getLastRow() + 1 // kita ambil baris terakhir
  let f = db.setValue('A'+row,userID) // 'A'+row disini diartikan sebagai 'A2' baris ke 2 kolom pertama(A)
 }
 return
}
// bikin fungsi broadcast
function broadcast(text,entities){ //entities disini di butuhkan untuk memformat text jika pesannya mengandung text bold maka akan ke format otomatis. 
 let sender = 0 // jika bot sudah mengirim pesan ke 20 orang maka bot akan sleep untuk 2 detik.
 let success = 0 //pesan yang berhasil dikirim
 let failed = 0 //pesan yang gagal dikirim
 let data = db.getAll() // mengambil semua data user
 data.shift() // menghapus data pertama [id]
 let amount = data.length // banyak user
 bot.build.loop(amount,(i)=>{ // looping kirim pesan 
    let user = data[i][0]
    sender ++ // angka sender akan naik seiring loopiny
    if(sender >= 20){ // jika sender lebih dari 20 atau sama dengan 20
     sender = 0 //kita reset lagi hitungan sender nya
     Utilities.sleep(2000) // jeda 2 detik
     try{ //lanjut broadcast
       bot.sendMessage(user,text,{entities:entities})
       success ++ // berhasil ++
     }catch (error){
       failed ++ // gagal ++
     }
   }else{ // jika sender kurang dari 20
     try{ //broadcast pesan
      bot.sendMessage(user,text,{entities:entities})
      success ++ // berhasil ++
     }catch(error){
      failed ++ // gagal ++
    }
   }
 }) //jika broadcast sudah selesai maka di akhiri dengan mengirim pesan :
 return bot.replyToMessage("Successfully send to "+success+" people,failed to "+failed+" people")
}

/*
Catatan :
- Pastikan Library miniSheetdb bang hasan sudah terinstal
- Pastikan Library butthx sudah terinstal dan versi terbaru
- bugs? silakan join grup diskusi untuk mendapatkan bantuan.
*/
