//===========================================================================
// Requires
//===========================================================================
const db = require("../database/index");
//===========================================================================
var freedriver = db("freedriver");
//===========================================================================
// Schema
//===========================================================================
const schema = {
    table: function(){
        return db("freedriver");
    },
    list: function(){
        console.log('Listando Freedriver');
      return db("freedriver").then((data)=>{return data });
    },
    show: function(id){
      return db("freedriver").where("id",id).then((data)=>{return data })
    },
    delete: function(id){
      return db("freedriver").where(id).del().then((data)=>{return data })
    },
    clearDrivers: function(){
        // return db.schema.raw('DELETE FROM freedriver WHERE loginAt < CONVERT_TZ(CURTIME(),"+00:00","-04:00")').then((data)=>{return data})
        return db.schema.raw('TRUNCATE TABLE freedriver;').then((data)=>{return data});
    },
    update: function(dados){
        var id = dados.id;
        var data = dados.data;
        return db("freedriver").where("id",id).update(data).then((data)=>{return data });
    },
    save: function(data){
          var dados = data;
          //console.log("Salvando Dados");
          db("freedriver").clearCounters().clearSelect().clearWhere();
          //console.log(dados);
          return db("freedriver").insert(dados)
            .then((data)=>{
              return data;
            });
    }
}
//===========================================================================
module.exports = schema;
