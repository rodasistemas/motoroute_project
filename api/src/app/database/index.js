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
    user: 'motoroute',
    password: 'motoroute',
    database: 'motoroute'
  }
});
//===========================================================================
module.exports = db;
