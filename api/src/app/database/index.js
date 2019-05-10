//===========================================================================
// Requires
//===========================================================================
const db = require("knex")({
  client: 'mysql',
  debug:false,
  asyncStackTraces:true,
  connection:{
    host: 'motoroute.ddns.net',
    user: 'motoroute',
    password: 'motoroute',
    database: 'motoroute'
  }
});
//===========================================================================
module.exports = db;
