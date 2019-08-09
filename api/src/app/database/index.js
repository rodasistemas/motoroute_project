//===========================================================================
// Requires
//===========================================================================
const db = require("knex")({
  client: 'mysql',
  debug:false,
  asyncStackTraces:true,
  connection:{
    host: 'remotemysql.com',
    port: '3306',
    user: 'PFpURhFkOq',
    password: 'NsnSNYxVt3',
    database: 'PFpURhFkOq'
  }
});
//===========================================================================
module.exports = db;
