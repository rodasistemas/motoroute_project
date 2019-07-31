//===========================================================================
// Requires
//===========================================================================
const db = require("knex")({
  client: 'mysql',
  debug:false,
  asyncStackTraces:true,
  connection:{
    host: 'localhost',
    port: '3306',
    user: 'ubermoto',
    password: 'senhasegura@123',
    database: 'ubermoto'
  }
});
//===========================================================================
module.exports = db;
