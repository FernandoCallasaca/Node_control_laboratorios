var jwt = require('jsonwebtoken');

var validaToken = function(request){
    var obj = {estado: false, mensaje: "", data:null};
    var token = request.headers['authorization']
    if (!token) {
        obj= { estado: false, mensaje: "Es necesario el token de autenticación!." }
    } else {
        token = token.replace('Bearer ', '')
        jwt.verify(token, 'Secret Password', function (err, user) {
            if (err) {
                obj= { estado: false, mensaje:  "Token inválido!." , data:null}
            } else {
                obj= { estado: true, mensaje: "" , data:null} 
            }
        })
    }
    return obj;
}
module.exports={
    validaToken
}