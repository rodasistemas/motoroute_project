//===========================================================================
// Requires
//===========================================================================
const db = require("../database/index");
//===========================================================================
var freedrivers = db("freedrivers");
//===========================================================================
// Schema
//===========================================================================
const schema = {
    table: function(){
        return db("freedrivers");
    },
    list: function(){
      return db("freedrivers").then((data)=>{return data });
    },
    show: function(id){
      return db("freedrivers").where("id",id).then((data)=>{return data })
    },
    update: function(dados){
        var id = dados.id;
        var data = dados.data;
        return db("freedrivers").where("id",id).update(data).then((data)=>{return data });
    },
    save: function(data){
          var dados = data;
          console.log("Salvando Dados");
          db("freedrivers").clearCounters().clearSelect().clearWhere();
          console.log(dados);
          return db("freedrivers").insert(dados)
            .then((data)=>{
              return data;
            });
    }
}
//===========================================================================
module.exports = schema;
