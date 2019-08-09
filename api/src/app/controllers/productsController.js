//===========================================================================
// Requires
//===========================================================================
const express = require('express');
const request = require("request-promise");
const products = require("../models/products");
const routes = require("../models/routes");
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
    res.send(resp);
});
async function listAll(){
  const banco = await products.list().then((data)=>{return data});
  
    return banco;
  
  
}

//===========================================================================
module.exports = app => app.use('/products', router);