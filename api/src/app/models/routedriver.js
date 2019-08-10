//===========================================================================
// Requires
//===========================================================================
const db = require("../database/index");
//===========================================================================
var routedriver = db("routedriver");
//===========================================================================
// Schema
//===========================================================================
const schema = {
    table: function(){
        return db("routedriver");
    },
    list: function(){
      return db("routedriver").then((data)=>{return data });
    },
    show: function(id){
      return db("routedriver").innerJoin("routes","routedriver.route_id","routes.id").where(id).then((data)=>{return data })
    },
    delete: function(id){
      return db("routedriver").where(id).del().then((data)=>{return data })
    },
    update: function(dados){
        var id = dados.id;
        var data = dados.data;
        return db("routedriver").where("id",id).update(data).then((data)=>{return data });
    },
    save: function(data){
          var dados = data;
          console.log("Salvando Dados");
          db("routedriver").clearCounters().clearSelect().clearWhere();
          console.log(dados);
          return db("routedriver").insert(dados)
            .then((data)=>{
              return data;
            });
    }
}
//===========================================================================
module.exports = schema;
