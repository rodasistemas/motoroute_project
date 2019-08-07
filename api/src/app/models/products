//===========================================================================
// Requires
//===========================================================================
const db = require("../database/index");
//===========================================================================
var geocodes = db("products");
//===========================================================================
// Schema
//===========================================================================
const schema = {
    table: function(){
        return db("products");
    },
    list: function(){
      return db("products").then((data)=>{return data });
    },
    show: function(id){
      return db("products").where("id",id).then((data)=>{return data })
    },
    save: function(data){
          var dados = data;
          console.log("Salvando Dados");
          db("products").clearCounters().clearSelect().clearWhere();
          console.log(dados);
          return db("products").insert(dados)
            .then((data)=>{
              return data;
            });
    }
}
//===========================================================================
module.exports = schema;
