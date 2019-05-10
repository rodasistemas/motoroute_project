//===========================================================================
// Requires
//===========================================================================
const express = require('express');
const request = require("request-promise");
const geocodes = require("../models/geocodes");
const config = require("../../config/auth.json");
const NodeGeocoder = require('node-geocoder');
const authMiddleware = require("../middlewares/auth");

//===========================================================================
const router = express.Router();
const geocoder = NodeGeocoder({
  provider: 'opencage',
  apiKey: config.apiKey
});
//===========================================================================
//Autentication
//===========================================================================
//router.use(authMiddleware);
//===========================================================================
// Rotas
//===========================================================================
router.post("/autocomplete",async(req,res,next)=>{
  const {dados} = req.body;

  // Verifica se existe o geocode no banco de dados
  var retorno = JSON.stringify(prepareReturn(await searchGeocode(dados)));
  res.status(200).send(retorno);
  console.log(retorno);


});
router.post("/rota",async(req,res,next)=>{
  const {dados} = req.body;
  console.log(dados);
  // Verifica se existe o geocode no banco de dados
  var retorno = JSON.stringify(await getDirections(dados));
  res.status(200).send(retorno);
  console.log(retorno);


});
function prepareReturn (retorno){
  var linha = [];
  if(retorno){
    retorno.forEach(function(ret){
      var data = {
        'value': ret['latitude']+','+ret['longitude'],
        'label': ret['streetName']+' '+ret['city']+' '+ret['state']+' '+ret['zipcode']+' '+ret['country']
      };
      linha.push(data);

    });
  }
  return linha;

}
async function searchGeocode(dados){
  const banco = await geocodes.searchAll(dados).then((data)=>{return data});
  if(Array.isArray(banco) && banco.length>0){
    console.log('banco');
    console.log(banco);
    return banco;
  }else{
    console.log('API');
    geocoder.geocode(dados,async function(err, resp) {
      var data = [];
      for(i=0; i< resp.length; i++){
        if(resp[i]['streetName']){
          data[i] = resp[i];
          data[i].extra = JSON.stringify(data[i].extra);
          data[i].all_fields = JSON.stringify(data[i]).replace(/\"/g,' ');
          data[i].all_fields = data[i].all_fields + " " + data[i].all_fields;
        }
      };
      if(data.length>0){
        await geocodes.save(data);
        return resp;
      }




  });

  }
}

function getDirections(dados){
  const uri = 'https://api.mapbox.com/directions/v5/mapbox/';
  const mode = 'driving/';
  const directions = dados;
  const args = '?geometries=geojson&access_token='+config.mapToken;
  const url = uri+mode+directions+args;
  return request(url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    return body;


  });

}

//===========================================================================
module.exports = app => app.use('/maps', router);
