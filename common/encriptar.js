const crypto = require("crypto")
const md5 = require('md5');
function encriptarlogin( pass) {
    // usamos el metodo CreateHmac y le pasamos el parametro user y actualizamos el hash con la password
  /*  var hmac = crypto.createHmac('sha1', user).update(pass).digest('hex')
    return hmac*/
    return md5(pass);

 }

module.exports={
    encriptarlogin
}