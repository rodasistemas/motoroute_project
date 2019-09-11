//===========================================================================
// Requires
//===========================================================================
const db = require("knex")({
  client: 'mysql',
  debug:false,
  asyncStackTraces:true,
  connection:{
    host: 'sql141.main-hosting.eu',
    port: '3306',
    user: 'u499955700_motor',
    password: 'Alterar@123',
    database: 'u499955700_motor'
  }
});
//===========================================================================
module.exports = db;
