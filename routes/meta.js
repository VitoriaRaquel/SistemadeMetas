const express = require("express")
const router = express.Router()
const mongoose = require("mongoose") //importa o mongoose
require("../models/Metabd") //chama o arquivo do model
const Metabd = mongoose.model("metas")//chama a função
 
//Rota 
router.get('/', (req,res)=>{
    Metabd.find().lean().sort({date:'desc'}).then((index)=>{
        res.render("meta/index",{index:index})
    }).catch((err)=>{
        req.flash("error_msg","Houve um erro ao listar as categorias")
        res.redirect("/meta")
    })
    
})
 
//Rota inserir meta
router.get('/inserir', (req,res)=>{
    res.render("meta/inserir")
})

router.post("/meta/nova",(req, res)=>{
    //validação de titulo
    var erros = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        erros.push({texto:"Nome inválido"})

    }
    if(erros.length >0){
        res.render("meta/inserir",{erros: erros})
    }else{
        const novameta = {
            titulo: req.body.titulo,
            descricao: req.body.descricao
        }
        new Metabd(novameta).save().then(()=>{
            req.flash("success_msg", "Categoria criada com sucesso")
            res.redirect("/meta")
        }).catch((err)=>{
            req.flash("error_msg","Houve um erro ao salvar a meta, tente novamente")
            res.redirect("/meta")
        })
    }
   
})
 
module.exports = router