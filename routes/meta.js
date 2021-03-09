const express = require("express")
const router = express.Router()
const mongoose = require("mongoose") //importa o mongoose
require("../models/Metabd") //chama o arquivo do model
const Metabd = mongoose.model("metas")//chama a função
const {acesso} = require ("../helpes/acesso")

//Rota 
router.get('/',  acesso, (req,res)=>{
    Metabd.find().lean().sort({date:'desc'}).then((index)=>{
        res.render("meta/index",{index:index})
    }).catch((err)=>{
        req.flash("error_msg","Houve um erro ao listar as categorias")
        res.redirect("/meta")
    })
    
})
 
//Rota inserir meta
router.get('/inserir', acesso, (req,res)=>{
    res.render("meta/inserir")
})

router.post("/meta/nova", acesso,(req, res)=>{
    //validação de titulo
    var erros = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        erros.push({texto:"Preencha todos os campos"})
    }

    else if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null)
    {
        erros.push({texto:"Preencha todos os campos"})
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
router.get("/index/edit/:id",  acesso,(req, res)=>{
    Metabd.findOne({_id:req.params.id}).lean().then((index) =>{
        res.render("meta/editmetas",{index: index})
    }).catch((err)=>{
        req.flash("error_msg", "Esta meta não existe")
        res.redirect("/meta/index")
    })
   
})
router.post("/index/edit", acesso,(req, res) => {

    var erros = []

    if(!req.body.titulo || typeof req.body.titulo == undefined || req.body.titulo == null){
        erros.push({texto:"Preencha todos os campos"})
    }
    if(!req.body.descricao || typeof req.body.descricao == undefined || req.body.descricao == null)
    {
        erros.push({texto:"Preencha todos os campos"})
    }

    if(erros.length >0){
        res.render("meta/inserir",{erros: erros})
    }else{

    Metabd.findOne({_id: req.body.id}).then((index) => {

        index.titulo = req.body.titulo
        index.descricao = req.body.descricao

        index.save().then(()=>{
            req.flash("success_msg", "Meta editada com sucesso")
            res.redirect("/meta")
        }).catch((err)=>{
            req.flash("error_msg", "Houve um erro interno ao salvar a meta")
            res.redirect("/meta")
        })

    }).catch((err) =>{
        req.flash("error_msg", "Houve um erro ao editar a categoria")
        res.redirect("/meta")
    })
}
})

router.post("/index/deletar",  acesso,(req, res) =>{
    Metabd.remove({_id: req.body.id}).then(()=>{
        req.flash("success_msg", "Deletado com sucesso")
        res.redirect("/meta")
    }).catch((err) =>{
        req.flash("error_msg", "Erro ao deletar")
        res.redirect("/meta")
    })
})

module.exports = router