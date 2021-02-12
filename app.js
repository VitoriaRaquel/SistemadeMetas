//Carregando módulos
const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const app = express()
const meta = require("./routes/meta")
const { Mongoose } = require('mongoose')
const mongoose = require("mongoose")
const session = require("express-session")
const flash = require("connect-flash")
//Configurações
//Sessão
    app.use(session({
        secret:"cursodenode",
        resave: true,
        saveUninitialized:true
    }))
    app.use(flash())
//Middleware
app.use((req,res,next)=>{
    res.locals.success_msg =req.flash("success_msg")
    res.locals.error_msg =req.flash("error_msg")
    next()
})
//Body Parser
    app.use(bodyParser.urlencoded({extended: true}))
    app.use(bodyParser.json())
//Handlebars
    app.engine('handlebars', handlebars({defaultLayout: 'main'}))
    app.set('view engine', 'handlebars')
//Mongoose
    mongoose.Promise = global.Promise;
    mongoose.connect("mongodb://localhost/projetometas").then(()=>{
        console.log("Conectado ao mongo")
    }).catch((err)=>{
        console.log("Erro ao se conectar: "+err)
    })
    
//

//Rotas
app.use('/meta',meta)

//Outros
const PORTA = 8081
app.listen(PORTA,()=>{
console.log("Servidor rodando!")
})
