//===========================================================================
// Requires
//===========================================================================
const express= require("express");
const path = require("path");
const bodyParser = require("body-parser");
const freedriver = require('./app/models/freedrivers');
//===========================================================================
const app = express();


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

const server = require('http').createServer(app);
const io = require('socket.io')(server);

io.on('connection', socket=>{
  console.log('Socket conectado.');
  console.log(socket.id);
  
  socket.on('clientLocation', data =>{
    console.log('clientLocation',data);
    io.emit('clientLocation', data);
  })
  socket.on('driverLocation', data =>{
    console.log('driverLocation',data);
    io.emit('driverLocation', data);
  })
  socket.on('getClientPosition', () =>{
    console.log('getClientPosition');
    io.emit('getClientPosition');
  })
  socket.on('getDriverPosition', () =>{
    console.log('getDriverPosition');
    io.emit('getDriverPosition');
  })
  socket.on('getFreeDrivers', async () =>{
      io.emit('getDriverPosition');
      console.log('getFreeDrivers');
      const response = await freedriver.list();
      console.log("FreeDrivers",response);
      io.emit('showFreeDrivers', response);
    
  })
  

  socket.on('driverLocation', data =>{
    console.log('driverLocation',data);
    io.emit('driverLocation', data);
  })

  socket.on('teste', variavel=>{
    console.log('Disparou');
    io.emit('teste',variavel);
    console.log(variavel);
  
  });
});


server.listen(process.env.PORT || 3000, function(){
  console.log("Servidor rodando na porta 3000");
});
