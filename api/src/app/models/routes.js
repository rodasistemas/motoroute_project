//===========================================================================
// Requires
//===========================================================================
const db = require("../database/index");
//===========================================================================
var routes = db("routes");
//===========================================================================
// Schema
//===========================================================================
const schema = {
    table: function(){
        return db("routes");
    },
    list: function(){
      return db("routes").then((data)=>{return data });
    },
    show: function(id){
      return db("routes").where("id",id).then((data)=>{return data })
    },
    openroute: function(dados){
      return db("routes").where("user_id",dados.id).whereNotIn("status",['C','F']).then((data)=>{return data })  
    },
    update: function(dados){
        var id = dados.id;
        var data = dados.data;
        return db("routes").where("id",id).update(data).then((data)=>{return data });
    },
    save: function(data){
          var dados = data;
          console.log("Salvando Dados");
          db("routes").clearCounters().clearSelect().clearWhere();
          console.log(dados);
          return db("routes").insert(dados)
            .then((data)=>{
              return data;
            });
    }
}
//===========================================================================
module.exports = schema;
