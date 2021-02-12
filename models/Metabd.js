const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const Metabd = new Schema({
    titulo:{
        type: String,
        required: true

    },
    descricao:{
        type: String,
        required: true,
        default:"Sem descrição"
    },
    date: {
        type:Date,
        default: Date.now()
    }
})

mongoose.model("metas", Metabd)