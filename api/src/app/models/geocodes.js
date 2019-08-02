//===========================================================================
// Requires
//===========================================================================
const db = require("../database/index");
//===========================================================================
var geocodes = db("geocodes");
//===========================================================================
// Schema
//===========================================================================
const schema = {
    table: function(){
        return db("geocodes");
    },
    list: function(){
      return db("geocodes").then((data)=>{return data });
    },
    show: function(id){
      return db("geocodes").where("id",id).then((data)=>{return data })
    },
    save: function(data){
          var dados = data;
          console.log("Salvando Dados");
          db("geocodes").clearCounters().clearSelect().clearWhere();
          console.log(dados);
          return db("geocodes").insert(dados)
            .then((data)=>{
              return data;
            });
    },
    searchAll: async function(search){
      console.log("Fazendo Busca por "+ search);
      var busca = "%"+search.replace(/\s/g,"%")+"%";
console.log(busca);

      db("geocodes").clearWhere();
      db("geocodes").clearSelect();

      return db("geocodes").select("*").where(db.raw("UPPER(all_fields) like UPPER(?)", [busca])).then((data)=>{


        if(data.length>0){
          console.log('Achou a Busca');
        }
        return data
      });
    }
}
//===========================================================================
module.exports = schema;
