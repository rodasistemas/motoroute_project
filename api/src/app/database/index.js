//===========================================================================
// Requires
//===========================================================================
const db = require("knex")({
  client: 'mysql',
  debug:false,
  asyncStackTraces:true,
  connection:{
    host: 'localhost',
    user: 'motoroute',
    password: 'motoroute',
    database: 'motoroute'
  }
});
//===========================================================================
module.exports = db;
