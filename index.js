const express= require('express');
const cors= require('cors');
const bp= require('body-parser');
const path=require('path');
const app= express();
const PORT= 5000
const db=require("./db")
const {ConnectionTiktok} = require('./tiktok');
db.connect()
app.use(bp.json())
app.use(bp.urlencoded({extended:true}));
app.use(cors())
const http = require('http');
const server = http.createServer(app);

const io = require('socket.io')(server, {
  cors: {
      origin: "http://localhost:3000"
  }
});
io.on('connection',  async (socket) => {
  console.log(`⚡: ${socket.id} user just connected!`);
  const conn= new ConnectionTiktok();
  conn.connectTikTok();
  while (true) {
  await new Promise(resolve => setTimeout(resolve, 1000));
  // if (conn.komen=="a"||conn.komen=="A"||conn.komen=="b"||conn.komen=="B"){
    // console.log(conn.komen);
    io.emit('message', { data: conn.komen }); 
  // }

  }
});


app.get('/api/getAll',async function(req,res) {
  await db.getAllQuestion().then(result=>{
    res.send(result)
  })
})

// app.get('/api/koneksi',async function(req,res) {
//     const conn= new ConnectionTiktok();
//     conn.connectTikTok();
//     while (true) {
//         await new Promise(resolve => setTimeout(resolve, 1000));
//         res.send(conn.komen);   
//         console.log(conn.komen);
//     }
// })
  
// app.use(express.static(path.join(__dirname, 'build')));
// app.get('*', function(req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
server.listen(PORT, () => console.log(`Server running on port ${PORT}`))

