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
router.use(authMiddleware);
//===========================================================================
// Rotas
//===========================================================================
router.get("/test",async(req,res,next)=>{
  const data = JSON.stringify(prepareReturn(await searchGeocode('Rua Tupaciguara Araguari')));
  res.send(data);
});

router.post('/geocode',async(req,res,next)=>{
  const {dados} = req.body;
  console.log(dados);
  var retorno = JSON.stringify(await searchGeocode(dados));
  console.log(retorno);
  res.status(200).send(retorno);
});

router.post("/autocomplete",async(req,res,next)=>{
  const {dados} = req.body;
	console.log('Chamou o Autocomplete', dados);
if(dados){
  // Verifica se existe o geocode no banco de dados
  var retorno = JSON.stringify(prepareReturn(await searchGeocode(dados)));
  return res.status(200).send(retorno);
  console.log(retorno);
}


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
	var lbl = '';
	if(ret['streetName'])
		lbl = lbl+ret['streetName'];
	if(ret['city'])
		lbl = lbl+', '+ret['city'];
	if(ret['state'])
		lbl = lbl+', '+ret['state'];
	if(ret['zipcode'])
		lbl = lbl+', '+ret['zipcode'];
//	if(ret['country'])
//		lbl = lbl+' '+ret['country'];

      var data = {
        'value': ret['latitude']+','+ret['longitude'],
        'label': lbl
      };

      linha.push(data);

    });
  }
  return linha;

}
async function searchGeocode(dados){
  const banco = await geocodes.searchAll(dados).then((data)=>{return data});
  if(Array.isArray(banco) && banco.length>0){
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
	resp = await geocodes.save(data);

      }
        return resp;
  });
  }
}

function getDirections(dados){
  const uri = 'https://api.mapbox.com/directions/v5/mapbox/';
  const mode = 'driving/';
  const ori = dados.origin.split(',');
  const des = dados.destination.split(',');
  const directions = ori[0]+'%2C'+ori[1]+'%3B'+des[0]+'%2C'+des[1];
  const args = '?geometries=geojson&access_token='+config.mapToken;
  const url = uri+mode+directions+args;
  return request(url, { json: true }, (err, res, body) => {
    if (err) { return console.log(err); }
    return body;


  });

}

//===========================================================================
module.exports = app => app.use('/maps', router);
