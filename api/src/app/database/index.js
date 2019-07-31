//===========================================================================
// Requires
//===========================================================================
const db = require("knex")({
  client: 'mysql',
  debug:false,
  asyncStackTraces:true,
  connection:{
    host: 'motoroute.ddns.net',
    port: '3306',
    user: 'ubermoto',
    password: 'ubermoto',
    database: 'ubermoto'
  }
});
//===========================================================================
module.exports = db;
