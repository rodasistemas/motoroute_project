//===========================================================================
// Requires
//===========================================================================
const express= require("express");
const bodyParser = require("body-parser");
//===========================================================================
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

require('./app/controllers/index')(app);

app.listen(process.env.PORT || 3000, function(){
  console.log("Servidor rodando na porta 3000");
});
