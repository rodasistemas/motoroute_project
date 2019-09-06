//===========================================================================
// Requires
//===========================================================================
const express = require('express');
const request = require("request-promise");
const products = require("../models/products");
const routes = require("../models/routes");
const freedrivers = require("../models/freedrivers");
const routedriver = require("../models/routedriver");
const config = require("../../config/auth.json");
const authMiddleware = require("../middlewares/auth");

//===========================================================================
const router = express.Router();
//===========================================================================
//Autentication
//===========================================================================
router.use(authMiddleware);
//===========================================================================
// Rotas
//===========================================================================
router.get("/test",async(req,res,next)=>{
  const data = await listAll();
  res.send(data);
});
router.post('/add',async(req,res,next)=>{
   const {dados} = req.body;
   const resp = await routes.save(dados).then((data)=>{return data});
    res.send(resp);
});
router.post('/openroute',async(req,res,next)=>{
  const {dados} = req.body;
  
  const resp = await routes.openroute(dados).then((data)=>{return data});
  console.log('Openroute',resp);
  res.send(resp);
});
router.post('/showroute',async(req,res,next)=>{
  const {dados} = req.body;
  console.log('Dados',dados);
  const resp = await routes.show(dados).then((data)=>{return data});
  console.log('ShowRoute',resp);
  res.send(resp);
});
router.post('/updateroute',async(req,res,next)=>{
   const {dados} = req.body;
   const resp = await routes.update(dados).then((data)=>{return data});
    res.send('Rota atualizada');
});
router.post('/freedriver',async(req,res,next)=>{
   const {dados} = req.body;
   console.log('Deletando Freedriver',dados);
   const del = await freedrivers.delete({'user_id':dados.user_id});
   const resp = await freedrivers.save(dados).then((data)=>{return data});
   res.send(resp);
});
router.post('/delfreedriver',async(req,res,next)=>{
   const {dados} = req.body;
   console.log('Deletando Freedriver DEL',dados);
   const del = await freedrivers.delete({'user_id':dados.user_id});
   res.send(dados);
});
router.post('/routedriver',async(req,res,next)=>{
  const {dados} = req.body;
  console.log('Listando Corridas Free', dados);
  const lista = await routedriver.show(dados).then((data)=>{return data});
  res.send(lista);
});
router.post('/resposeroutedriver',async(req,res,next)=>{
  const {dados} = req.body;
  console.log('Resposta do Piloto', dados);
  const update = await routedriver.update(dados).then((data)=>{return data});
  res.send(update);
});
router.post('/routedrivermin',async(req,res,next)=>{
  const {dados} = req.body;
  console.log('Listando Corridas Free', dados);
  const lista = await routedriver.showmin(dados).then((data)=>{return data});
  console.log('Resultado da Corrida Free',lista);
  res.send(lista);
});

router.post('/delroutedriver',async(req,res,next)=>{
  const {dados} = req.body;
  console.log('Deletando Pedido de Corrida',dados);
  const del = await routedriver.delete({'route_id':dados.id});
  res.send('Rota Deletada');
});

router.post('/addroutedriver',async(req,res,next)=>{
  const {dados} = req.body;
  console.log('Deletando Corridas Piloto',dados);
  const del = await routedriver.delete({'user_id':dados.user_id, 'route_id':dados.route_id, 'response_user':'A'});
  console.log('Salvando Corridas Piloto', dados);
  const lista = await routedriver.save(dados).then((data)=>{return res.send(data);});
  
});


async function listAll(){
  const banco = await products.list().then((data)=>{return data});
  
    return banco;
  
  
}

//===========================================================================
module.exports = app => app.use('/products', router);
