/*
Penggunaan getFileLink untuk mengubah sticker
Dari contoh penggunaannya diharapkan agar bisa lebih dikembangkan
Note : File link berisi token bot kalian jadi lebih baik tidak mengirim file_link ini! Kalo ngirim file_pathnya aja boleh sih:)
Note2 : Pastikan kalian memasang libnya di v6 atau yang lebih tinggi (Mendukung)
*/

//Pastikan kalian sudah mengikuti materi simple bot!!! Karena semua materi adalah materi lanjutan dari simpelBot!

//Buat function (bisa langsung aja ditaruh jika mau
function fileUrl(file_id){
  //Pastikan tau vara mendapatkan file_id ya ^_^
var id = bot.getFile(file_id)
var result = id.file_path
var url = bot.getFileLink(result)
return url
}

//Aplikasikan pada script
bot.command('toimg', (res)=>{
//Penyederhanaan variable
  var msg = res.message
//Pengaplikasian
  if(msg.reply_to_message.sticker){
    var fileId = msg.reply_to_message.sticker.file_id // Ambil file_id sticker
    var url = fileUrl(fileId) // Ambil url menggunakan fungsi yang kita buat tadi
    var gambar = UrlFetchApp.fetch(url).getBlob().setName('NamaBebas.jpg')//Jadikan url tadi gambar blob, pastikan isi .jpg akhirnya (rekomendasi dari saya)
    bot.replyPhoto(gambar)
  }
})

//Sekian diharapkan pembaca mengerti dan dapat mengaplikasikannya dengan lebih luas....
