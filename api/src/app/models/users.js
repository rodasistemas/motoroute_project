//===========================================================================
// Requires
//===========================================================================
const db = require("../database/index");
const bcrypt = require('bcryptjs');
//===========================================================================
var users = db("users");
//===========================================================================
// Schema
//===========================================================================
const schema = {
    table: function(){
        return db("users");
    },
    list: function(){
      return db("users").then((data)=>{return data });
    },
    show: function(id){
      return db("users").where("id",id).then((data)=>{return data })
    },
    findOne: (key,value)=>{
	console.log(key,value);
      db("users").clearWhere();
      db("users").clearSelect();

      const retorno = db("users").select("*").where(key,value).then((data)=>{
	if(data.length>0) {
		console.log(data);
		return data[0];
	}else{
	return null
	} 
      });
	return retorno;
    },
    save: async function(data){
          var dados = data;
	  dados.password = await bcrypt.hash(dados.password,10);
          console.log("Salvando Dados");
          db("users").clearCounters().clearSelect().clearWhere();
          console.log(dados);
          return db("users").insert(dados)
            .then((data)=>{
              return data;
            });
    },
    searchAll: async function(search){
      console.log("Fazendo Busca por "+ search);
      var busca = "%"+search.replace(/\s/g,"%")+"%";

      db("users").clearWhere();
      db("users").clearSelect();

      return db("users").select("*").where(db.raw("UPPER(all_fields) like UPPER(?)", [busca])).then((data)=>{


        if(data.length>0){
          console.log('Achou a Busca');
        }
        return data
      });
    }
}
//===========================================================================
module.exports = schema;
