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
  
  socket.on('sendMsg', data=>{
    console.log('sendMsg',data);
    io.emit('sendMsg',data);
  });
  
  socket.on('clientLocation', data =>{
    console.log('clientLocation',data);
    io.emit('clientLocation', data);
  })
  socket.on('driverLocation', data =>{
   // console.log('driverLocation',data);
    io.emit('driverLocation', data);
  })
  socket.on('motoChegou',data=>{
    console.log('motoChegou',data);
    io.emit('motoChegou',data);
  });
  socket.on('driverStarted',data=>{
    console.log('driverStarted',data);
    io.emit('driverStarted',data);
  });
  socket.on('driverFinished',data=>{
    console.log('driverFinished',data);
    io.emit('driverFinished',data);
  });
  socket.on('setDriver', data =>{
    console.log('setDriver',data);
    io.emit('setDriver', data);
  })
  socket.on('driverResponse', data =>{
    io.emit('driverResponse',data);
    console.log('driverResponse', data);
    
  });

  socket.on('getClientPosition', () =>{
    //console.log('getClientPosition');
    io.emit('getClientPosition');
  })
  socket.on('getDriverPosition', () =>{
    console.log('getDriverPosition');
    io.emit('getDriverPosition');
  })
  socket.on('getFreeDrivers', async () =>{
      console.log('FreeDrivers');
      io.emit('getDriverPosition');

      const response = await freedriver.list();
      console.log('FreeDrivers List', response);	
      io.emit('showFreeDrivers', response);
    
  })
  

  socket.on('driverLocation', data =>{
    //console.log('driverLocation',data);
    io.emit('driverLocation', data);
  })

  socket.on('teste', variavel=>{
    console.log('Disparou');
    io.emit('teste',variavel);
    console.log(variavel);
  
  });
  setInterval(async()=>{
    console.log('Limpa freedrivers');
    const response = await freedriver.clearDrivers();
    
  },1000*60*60);
});


server.listen(process.env.PORT || 3000, function(){
  console.log("Servidor rodando na porta 3000");
});
