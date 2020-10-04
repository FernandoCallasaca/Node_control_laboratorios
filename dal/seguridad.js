const jwt = require('jsonwebtoken')
const encriptar = require('../common/encriptar')
const cnx = require('../common/appsettings')
const valida = require('../common/validatoken')
let pool = cnx.pool;


const login = (request, response) => {
    request.body.c_password = encriptar.encriptarlogin(request.body.c_password);
    pool.query('Select n_idseg_user, c_username, c_name, c_lastname, c_phone, c_documentid, n_idseg_role from seg_user where n_borrado = 0 and c_username = $1 and c_password = $2',
        [request.body.c_username, request.body.c_password], (error, results) => {
            var tokenData = {
                username: request.body.c_username
            }
            var token = jwt.sign(tokenData, 'Secret Password', {
                expiresIn: 60 * 60 * 4 // expires in 4 hours
            })
            response.status(200).json({ estado: true, mensaje: "", token: token })
        
        })
}

// const login = (request, response) => {
//     request.body.c_password = encriptar.encriptarlogin(request.body.c_password);
//     pool.query('Select n_idseg_user, c_username, c_name, c_lastname, c_phone, c_documentid, n_idseg_role from seg_user where n_borrado = 0 and c_username = $1 and c_password = $2',
//         [request.body.c_username, request.body.c_password], (error, results) => {
//             if (error) {
//                 response.status(200).json({ estado: false, mensaje: "error: usuario o contraseña inválidos!. "+error.stack, data: null })
//             } else {
//                 if (results.rowCount > 0) {
//                     var tokenData = {
//                         username: request.body.c_username
//                     }
//                     var token = jwt.sign(tokenData, 'Secret Password', {
//                         expiresIn: 60 * 60 * 4 // expires in 4 hours
//                     })
//                     response.status(200).json({ estado: true, mensaje: "", data: results.rows[0], token: token })
//                 } else {
//                     response.status(200).json({ estado: false, mensaje: "DB:usuario o contraseña inválidos!.", data: null })
//                 }
//             }
//         })
// }

const get = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let cadena = 'Select u.n_idseg_user, u.c_username, u.c_name, u.c_lastname, u.c_phone, u.c_documentid, u.n_idseg_role, u.n_idgen_entidad, r.c_role c_role, e.c_name c_entidad from seg_user u \n\r' +
            'inner join seg_role r on u.n_idseg_role=r.n_idseg_role and r.n_borrado = 0 \n\r' +
            'inner join gen_entidad e on u.n_idgen_entidad=e.n_idgen_entidad and e.n_borrado = 0 \n\r' +
            ' where u.n_borrado = 0 and (u.n_idseg_role = $1 or 0 = $1) and (u.n_idgen_entidad = $2 or 0 = $2)';
        pool.query(cadena,
            [request.body.n_idseg_role, request.body.n_idgen_entidad],
            (error, results) => {
                if (error) {
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                } else {
                    response.status(200).json({ estado: true, mensaje: "", data: results.rows })
                }
            })
    } else {
        response.status(200).json(obj)
    }
}

const getrole = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('Select n_idseg_role, c_role from seg_role where n_borrado = 0',
            (error, results) => {
                if (error) {
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                } else {
                    response.status(200).json({ estado: true, mensaje: "", data: results.rows })
                }
            })
    } else {
        response.status(200).json(obj)
    }
}

const save = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let c_username = request.body.c_username;
        let c_password = encriptar.encriptarlogin(request.body.c_password);
        let c_name = request.body.c_name;
        let c_lastname = request.body.c_lastname;
        let c_documentid = request.body.c_documentid;
        let c_phone = request.body.c_phone;
        let n_idseg_role = request.body.n_idseg_role;
        let n_idgen_entidad = request.body.n_idgen_entidad;

        let cadena = 'do $$ \n\r' +
            '   begin \n\r' +
            '       if(exists(select n_idseg_user from seg_user where n_borrado = 0 and c_username =\'' + c_username + '\')) then \n\r' +
            '           update seg_user set c_name= \'' + c_name + '\', c_lastname=\'' + c_lastname + '\', c_documentid=\'' + c_documentid + '\', c_phone=\'' + c_phone + '\',n_idseg_role=' + n_idseg_role + ', n_idgen_entidad=' + n_idgen_entidad + ' where c_username=\'' + c_username + '\'; \n\r' +
            '       else \n\r' +
            '           insert into seg_user(n_idseg_user,c_username,c_password,c_name,c_lastname,c_documentid,c_phone,n_idseg_role,n_idgen_entidad,n_borrado,d_fechacrea,n_id_usercrea) \n\r' +
            '           values (default,\'' + c_username + '\',\'' + c_password + '\',\'' + c_name + '\',\'' + c_lastname + '\',\'' + c_documentid + '\',\'' + c_phone + '\',' + n_idseg_role + ',' + n_idgen_entidad + ',0,now(),1); \n\r' +
            '       end if; \n\r' +
            '   end \n\r' +
            '$$';

        pool.query(cadena,
            (error, results) => {
                if (error) {
                    console.log(error);
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                } else {
                    response.status(200).json({ estado: true, mensaje: "", data: results.rows })
                }
            })
    } else {
        response.status(200).json(obj)
    }
}

const resetearclave = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let c_username = request.body.username;
        let c_password = encriptar.encriptarlogin(request.body.password);
        let c_oldpassword = encriptar.encriptarlogin(request.body.oldpassword);
        let esreset = request.body.esreset;

        if (!esreset) {
            pool.query('Select n_idseg_user from seg_user where n_borrado = 0 and c_username = $1 and c_password = $2',
                [c_username, c_oldpassword], (error, results) => {
                    if (error) {
                        response.status(200).json({ estado: false, mensaje: "error: usuario o contraseña inválidos!.", data: null })
                    } else {
                        if (results.rowCount > 0) {
                            pool.query('update seg_user set c_password = $2 where c_username = $1;', [c_username, c_password],
                                (error, results) => {
                                    if (error) {
                                        response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                                    } else {
                                        response.status(200).json({ estado: true, mensaje: "", data: results.rows })
                                    }
                                })
                        } else {
                            response.status(200).json({ estado: false, mensaje: "DB: Contraseña no válida!.", data: null })
                        }
                    }
                })
        }else{
            pool.query('update seg_user set c_password = $2 where c_username = $1;', [c_username, c_password],
                                (error, results) => {
                                    if (error) {
                                        response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                                    } else {
                                        response.status(200).json({ estado: true, mensaje: "", data: results.rows })
                                    }
                                })
        }


    } else {
        response.status(200).json(obj)
    }
}



module.exports = {
    login,
    get,
    getrole,
    save,
    resetearclave
}
