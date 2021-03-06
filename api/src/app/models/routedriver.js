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

    showmin: function(id){
      return db("routedriver")
	.select('routedriver.*')
	.innerJoin("routes","routedriver.route_id","routes.id")
	.where(id)
	.orderBy("routedriver.distance","ASC")
	.then((data)=>{
		return data[0] 
	})
    },
    show: function(id){
      return db("routedriver")
	.innerJoin("routes","routedriver.route_id","routes.id")
	.innerJoin("users","users.id","routedriver.user_id")
	.where(id)
	.then((data)=>{
	      return data 
      })
    },
    delete: function(id){
      return db("routedriver").where(id).del().then((data)=>{return data })
    },
    update: function(dados){
        var where = dados.where;
        var data = dados.data;
	    console.log('Atualiza RouteDriver', where);
	    console.log('Atualiza RouteDriver', data);
        return db("routedriver").where(where).update(data).then((data)=>{return data });
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
