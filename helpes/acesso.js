module.exports={
    acesso: function(req, res,next){
        if(req.isAuthenticated()){
            return next();
        }

        req.flash("error_msg", "Você estar autenticado")
        res.redirect("/usuarios/login")
    }
}