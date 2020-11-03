const cnx = require('../common/appsettings') // Hola Ara

const valida = require('../common/validatoken')
let pool = cnx.pool;

// Docente

const getDocente = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from docente where borrado = 0 order by id_docente',
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
const deleteDocente = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let id_docente=request.body.id_docente;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update docente set borrado = id_docente where id_docente=\'' + id_docente + '\'; \n\r' +
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
const saveDocente = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let id_docente = request.body.id_docente;
        let nombres = request.body.nombres;
        let apellidos = request.body.apellidos;
        let dni = request.body.dni;
        let telefono = request.body.telefono;
        let correo = request.body.correo;
        let condicion = request.body.condicion;
        let regimen = request.body.regimen;
        let categoria = request.body.categoria;

        let cadena = `do $$
        begin 
            if (${id_docente} != 0) then
                update docente set nombres = '${nombres}', apellidos = '${apellidos}', dni = '${dni}', telefono = '${telefono}',
                correo = '${correo}', condicion = '${condicion}', regimen = '${regimen}', categoria = '${categoria}'
                where id_docente = ${id_docente};
            else
                insert into docente values (default, '${nombres}', '${apellidos}', '${dni}', '${telefono}', '${correo}',
                 '${condicion}', '${regimen}', '${categoria}', 0);
            end if;
        end
        $$`;

        console.log(cadena)
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

// CATALOGO

const getCatalogo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from catalogo where borrado = 0 order by id_catalogo',
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
const deleteCatalogo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let id_catalogo=request.body.id_catalogo;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update catalogo set borrado = id_catalogo where id_catalogo=\'' + id_catalogo + '\'; \n\r' +
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
const saveCatalogo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let id_catalogo = request.body.id_catalogo;
        let tipo = request.body.tipo;
        let producto = request.body.producto;
        let modelo = request.body.modelo;
        let marca = request.body.marca;
        let caracteristica = request.body.caracteristica;


        let cadena = `do $$
            begin 
                if (${id_catalogo} != 0) then
                    update catalogo set tipo = '${tipo}', producto = '${producto}', modelo = '${modelo}', marca = '${marca}',
                    caracteristica = '${caracteristica}' where id_catalogo = ${id_catalogo};
                else
                    insert into catalogo values (default, '${tipo}', '${producto}', '${modelo}', '${marca}', '${caracteristica}', 0);
                end if;
            end
        $$`;

        console.log(cadena)
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

// USUARIO 

const getUsuario = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from usuario where borrado = 0 order by id_usuario',
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
const deleteUsuario = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let id_usuario = request.body.id_usuario;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update usuario set borrado = id_usuario where id_usuario=\'' + id_usuario + '\'; \n\r' +
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
const saveUsuario = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let id_usuario = request.body.id_usuario;
        let username = request.body.username;
        let password = request.body.password;

        let cadena = `do $$
            begin 
                if (${id_usuario} != 0) then
                    update usuario set username = '${username}', password = '${password}' where id_usuario = ${id_usuario};
                else
                    insert into usuario values (default, '${username}', '${password}', 0);
                end if;
            end
        $$`;

        console.log(cadena)
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

// Soporte Técnico
const getSoporteTecnico = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query(`
        select
            sop.id_soportetecnico,
            sop.nombres,
            sop.apellidos,
            sop.dni,
            sop.telefono,
            sop.correo,
            us.username,
            us.password
            from soportetecnico sop
            join usuario us on us.id_usuario = sop.id_usuario and us.borrado = 0
            where sop.borrado = 0 
        `,
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
const deleteSoporteTecnico = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let id_soportetecnico = request.body.id_soportetecnico;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update usuario set borrado = id_soportetecnico where id_soportetecnico=\'' + id_soportetecnico + '\'; \n\r' +
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
const saveSoporteTecnico = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let id_soportetecnico = request.body.id_soportetecnico;
        let nombres = request.body.nombres;
        let apellidos = request.body.apellidos;
        let dni = request.body.dni;
        let telefono = request.body.telefono;
        let correo = request.body.correo;
        
        let cadena = `do $$
        begin 
            if (${id_soportetecnico} != 0) then
                update soportetecnico set nombres = '${nombres}', apellidos = '${apellidos}', dni = '${dni}', telefono = '${telefono}',
                correo = '${correo}'
                where id_soportetecnico = ${id_soportetecnico};
            else
                insert into soportetecnico values (default, '${nombres}', '${apellidos}', '${dni}', '${telefono}', '${correo}', 0);
            end if;
        end
        $$`;

        console.log(cadena)
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

//EQUIPO
const getEquipo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query(` select * from vw_equipo `,
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
const deleteEquipo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let id_equipo=request.body.id_equipo;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update equipo set borrado = id_equipo where id_equipo=\'' + id_equipo + '\'; \n\r' +
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
const saveEquipo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let id_catalogo = request.body.id_catalogo;
        let estado = request.body.estado;
        let ubicacion = request.body.ubicacion;
        
        let cadena = `do $$
            begin 
                if (${id_equipo} != 0) then
                    update equipo set id_catalogo = '${id_catalogo}', estado = '${estado}', ubicacion = '${ubicacion}' 
                    where id_equipo = ${id_equipo};
                else
                    insert into equipo values(default, ${id_catalogo}, ${estado}, ${ubicacion}, 0);
                end if;
            end
        $$`;
        
    console.log(cadena)
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

//  REGISTRO DE INCIDENCIAS
const getMotivosIncidencia = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from motivo order by nombre',
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


const saveIncidencia = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let id_docente = request.body.id_docente;
        let id_equipo = request.body.id_equipo;
        let id_motivo = request.body.id_motivo;
        let descripcion = request.body.descripcion;
        
        let cadena = `insert into incidencia values(default, ${id_docente}, ${id_equipo},
            ${id_motivo}, '${descripcion}', now(), 0)`;
    console.log(cadena)
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
const getIncidencias = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from vw_incidencias',
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
const saveAsignacion = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let id_soportetecnico = request.body.id_soportetecnico;
        let id_incidencia = request.body.id_incidencia;
        
        let cadena = `insert into asignacion values(default, ${id_soportetecnico}, ${id_incidencia},
            'pendiente', now(), 0)`;
    console.log(cadena)
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
const getVwComponentes = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from vw_componentes',
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
const saveComponente = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let id_equipo = request.body.id_equipo;
        let id_catalogo = request.body.id_catalogo;
        
        let cadena = `insert into componente values(default, ${id_equipo}, ${id_catalogo}, 0)`;
    console.log(cadena)
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

module.exports = {
    getDocente,
    deleteDocente,
    saveDocente,
    getCatalogo,
    deleteCatalogo,
    saveCatalogo,
    getUsuario,
    deleteUsuario,
    saveUsuario,
    getSoporteTecnico,
    saveSoporteTecnico,
    deleteSoporteTecnico,
    getEquipo,
    deleteEquipo,
    saveEquipo,
    getMotivosIncidencia,
    saveIncidencia,
    getIncidencias,
    saveAsignacion,
    getVwComponentes,
    saveComponente
}
