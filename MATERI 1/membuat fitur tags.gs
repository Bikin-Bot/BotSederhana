var bot = new butthxbeta.bot('token bot')
var db = new miniSheetDB.init("token Spreadsheet"," nama sheet ")

function doPost(e){
  bot.handleUpdate(e)
  bot.regex(/^\#(\w+)$/i,(res,exec)=>{ //deteksi tags
   bot.replyToUser(find(res.message.text.replace(/\#/g,'').trim())) //hapus tanda pagar # dan membalas pesan dengan hasil dari tags tersebut
  })
  bot.command("save",(res)=>{
    let l = res.message.text.split(" ") //split
    let t = l[1] // mengambil nama tags
    let r = res.message.text.replace(l[1],"").replace(l[0],"").trim() // mengambil value tags
    bot.replyToMessage(save(t,r)) //membalas pesan
   })
  bot.command("remove",(res)=>{
   let l = res.message.text.split(" ") //split
   bot.replyToMessage(remove(l[1])) //mengambil nama tags dan mengirim pesan
  })
}
// kita bikin fungsi untuk deteksi tagsnya udah ada atau belum
function indexRows(tags){
let r = db.has(tags) //jika tags belum ada
if(!r){ //maka di return 
  return false  //false
}
let data = db.getAll() //mengambil semua data yang ada di Spreadsheet
let result = false //definisikan hasil
bot.build.loop(data.length,(i)=>{ // looping
  let r = data[i][0] //data looping
  if(r == tags){ // jika data = tags
   result = i + db.baris // return true
  }
})
return result
}
//kita bikin function save tags
function save(name,value){
 let r = indexRows(name) //detect dulu tagsnya ada atau tidak
 if(r){ //jika ada maka di update
   db.setValue(r,db.nKolom,value) // r = hasil dari indexRows nKolom = kolom di google sheet
   return 'tags updated!' //jika ada maka kita update
 }else{ //jika belum ada maka kita bikin lagi
   let ra = db.sheet.getLastRow() +1 //kita ambil baris terakhir
   db.setValue(ra,db.kolom,name) //kita bikin nama tag
   db.setValue(ra,db.nKolom,value) //kita bikin value
   return 'tags saved!' //kita return berhasil
 }
}
//kita bikin fungsi delete
function remove(name){
 let r = indexRows(name) //cek apakah tags ada
 if(!r){ // jika tidak ada maka akan di return not found
   return 'not found!'
 } //jika ada maka kita delete dan kita return berhasil.
  db.sheet.deleteRow(r)
   return 'deleted!'
}
//kita bikin fungsi cari 
function find(name){
 let r = indexRows(name) // posisi tags
 if(!r){ // jika tidak ada
  return 'tags not found!'
 } //jika ada akan mengambil value dari nama tags tersebut.
 return db.getValue(r,db.nKolom)
}
/*
Catatan :
- Pastikan Library minidb bang hasan sudah terinstal
- Pastikan Library butthx sudah terinstal dan versi terbaru
- bugs? silakan join grup diskusi untuk mendapatkan bantuan.
*/
