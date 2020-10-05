const cnx = require('../common/appsettings') // Hola Ara

const valida = require('../common/validatoken')
let pool = cnx.pool;

// Probando Conflictos
// 123
// Docente
//ARA
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
const saveSoporteTecnico = (request, response) => {
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

//EQUIPO
const getEquipo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query(`
        select eq.id_equipo, cat.producto, cat.modelo, cat.marca,
			eq.estado, eq.ubicacion
            from equipo eq
            join catalogo cat on cat.id_catalogo = eq.id_equipo and cat.borrado = 0
            where eq.borrado = 0
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

        let id_equipo = request.body.id_equipo;
        let id_catalogo = request.body.id_catalogo;
        let estado = request.body.estado;
        let ubicacion = request.body.ubicacion;
        
        let cadena = `do $$
        begin 
            if (${id_equipo} != 0) then
                update equipo set id_catalogo = '${id_catalogo}', estado = '${estado}', ubicacion = '${ubicacion}'
                where id_equipo = ${id_equipo};
            else
                insert into equipo values (default, '${id_catalogo}', '${estado}', '${ubicacion}', 0);
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



















































// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

const get = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idgen_entidad,c_name from gen_entidad where n_borrado = 0',
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

const getLocalizationForEdit = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idgen_localizacion ,c_valor from gen_localizacion where n_borrado = 0',
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

const getUnidadServicioForEdit = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idgen_unidadservicio ,c_nombre from gen_unidadservicio where n_borrado = 0',
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

const getTipoImagenForEdit = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idgen_tipoimagen, c_codigo, c_nombre, n_tipo, n_modulo from gen_tipoimagen where n_borrado=0',
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

const getPeriodoForEdit = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idgen_periodo, n_mes, n_annio, c_descripcion from gen_periodo where n_borrado=0 order by n_annio, n_mes',
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
const getElementoProcedenciaForEdit = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idins_elementoprocedencia, c_valor from ins_elementoprocedencia where n_borrado = 0',
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
const getElementoGrupoForEdit = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idins_elementogrupo, c_subgrupo, c_valor, c_descripcion from ins_elementogrupo where n_borrado = 0 order by c_valor',
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
const getElementoEspecificacionForEdit = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select es.n_idins_elementoespecificacion, el.c_valor, es.c_tipo, es.c_marca, es.c_modelo from ins_elementoespecificacion es inner join ins_elementogrupo el on es.n_idins_elementogrupo=el.n_idins_elementogrupo where es.n_borrado=0',
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
const getTipoForEspecificacion = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select distinct c_tipo from ins_elementoespecificacion where (n_idins_elementogrupo = $1 or 0 = $1)  and n_borrado = 0',[request.body.n_idins_elementogrupo],
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
const getMarcaForEspecificacion = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select distinct c_marca from ins_elementoespecificacion where c_tipo = $1 and n_borrado = 0',[request.body.c_tipo],
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
const getModeloForEspecificacion = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select distinct c_modelo from ins_elementoespecificacion where c_marca = $1 and n_borrado = 0',[request.body.c_marca],
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
const getSoporteTipoForEdit = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idins_soportetipo, c_valor, c_descripcion from ins_soportetipo where n_borrado = 0 order by c_valor',
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
const getAtributoForEdit = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idins_atributos, c_valor, c_descripcion from ins_atributos where n_borrado = 0 order by c_valor',
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
const getTipoCorteForEdit = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idgen_tipocorte, c_descripcion from gen_tipocorte where n_borrado=0 order by c_descripcion',
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
const getTipoSFVForEdit = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idgen_tiposfv, c_descripcion from gen_tiposfv where n_borrado=0 order by c_descripcion',
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
const getModuloForEdit = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idgen_modulo, c_descripcion from gen_modulo where n_borrado=0 order by c_descripcion',
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
const getReparto = (request, response) => {
    var obj = valida.validaToken(request)
    
    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_entidad = request.body.n_idgen_entidad;
    let n_idgen_periodo = request.body.n_idgen_periodo;
    let n_idseg_user = request.body.n_idseg_user;
    let n_idrep_reparto = request.body.n_idrep_reparto;
    let dateinicio = request.body.dateinicio;
    let datefin = request.body.datefin;
    //n_idrep_reparto, c_departamento, c_codigo, c_centropoblado, c_nombresapellidospe, c_fecha, c_dni, c_observacion
    if (obj.estado) {
        let cadena = 'select * from vw_reparto '+
        'where (n_idgen_departamento = ' + n_idgen_departamento + ' or 0 = ' + n_idgen_departamento + ') ' +
        'and (n_idgen_provincia = ' + n_idgen_provincia + ' or 0 = ' + n_idgen_provincia + ') ' +
        'and (n_idgen_distrito= ' + n_idgen_distrito + ' or 0 = ' + n_idgen_distrito + ') ' +
        'and (n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or 0 =  ' + n_idgen_centropoblado + ') ' +
        'and (n_idgen_periodo = ' + n_idgen_periodo + ' or 0 =  ' + n_idgen_periodo + ') ' +
        'and (n_idseg_user = ' + n_idseg_user + ' or 0 =  ' + n_idseg_user + ') ' +
        'and (n_idgen_entidad = ' + n_idgen_entidad + ' or 0 = ' + n_idgen_entidad + ') ' +
        'and (n_idrep_reparto = ' + n_idrep_reparto + ' or 0 = ' + n_idrep_reparto + ') ' +
        'and (\'null\' = \''+dateinicio+'\' or d_fechacrea between to_timestamp(\''+dateinicio+'\', \'yyyy/mm/dd\') and to_timestamp(\''+datefin+'\', \'yyyy/mm/dd\')) \r\n';
    console.log(cadena); 
        pool.query(cadena,
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
const imprimirReparto = (request, response) => {
    var obj = valida.validaToken(request)
    let n_idrep_reparto = request.body.n_idrep_reparto;
    if (obj.estado) {
        let cadena = 'select * from vw_reparto ' +
        'where n_idrep_reparto = ' + n_idrep_reparto;
        pool.query(cadena,
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
const getDetalleReparto = (request, response) => {
    console.log(request.body);
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let cadena = 'select distinct * from vw_detallereparto where n_idrep_reparto = $1';
        pool.query(cadena, [request.body.n_idrep_reparto],
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

const getPeriodo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idgen_periodo, c_descripcion from gen_Periodo where n_borrado = 0 order by n_annio desc, n_mes desc',
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

const getMantenimiento = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select n_idgen_tipoprograma, c_descripcion from gen_tipoprograma where n_borrado = 0',
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

const getUsuarioUbigeo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let  n_idgen_departamento = request.body.n_idgen_departamento;
        let  n_idgen_provincia = request.body.n_idgen_provincia;
        let  n_idgen_distrito = request.body.n_idgen_distrito;
        let  n_idgen_centropoblado = request.body.n_idgen_centropoblado;
        let  n_idseg_user = request.body.n_idseg_user;
        let  n_idgen_periodo = request.body.n_idgen_periodo;
        let  n_idgen_tipoprograma = request.body.n_idgen_tipoprograma;
        let  n_id_estado = request.body.n_id_estado;

        let cadena = 
        '    ;with tablatemp as \n\r' +
        '    ( \n\r' +
        '        select  \n\r' +
        '            p.n_idgen_programa, \n\r' +
        '            p.n_idgen_sistemafotovoltaico, \n\r' +
        '            p.b_estado \n\r' +
        '        from  \n\r' +
        '            gen_programa p \n\r' +
        '        where \n\r' +
        '            p.n_borrado = 0 \n\r' +
        '            and p.n_idgen_periodo = ' + n_idgen_periodo + ' \n\r' +
        '            and p.n_idgen_tipoprograma = ' + n_idgen_tipoprograma + ' \n\r' +
        '            and p.n_idseg_user = ' + n_idseg_user + ' \n\r' +
        '            and p.b_estado = false \n\r' +
        '    ) \n\r' +
        '    select  \n\r' +
        '        sf.n_idgen_sistemafotovoltaico,  \n\r' +
        '        sf.c_codigosuministro as suministro,  \n\r' +
        '        de.n_idgen_departamento,  \n\r' +
        '        de.c_nombre as departamento,  \n\r' +
        '        pr.n_idgen_provincia,  \n\r' +
        '        pr.c_nombre as provincia,  \n\r' +
        '        di.n_idgen_distrito,  \n\r' +
        '        di.c_nombre as distrito,  \n\r' +
        '        cp.n_idgen_centropoblado,  \n\r' +
        '        cp.c_nombre as centropoblado,  \n\r' +
        '        pe.n_idgen_persona,  \n\r' +
        '        pe.c_nombres as nombres,  \n\r' +
        '        pe.c_appaterno as appaterno,  \n\r' +
        '        pe.c_apmaterno as apmaterno,  \n\r' +
        '        pe.c_nrodni as dni,  \n\r' +
        '        p.n_idgen_programa, \n\r' +
        '        case when p.n_idgen_programa is not null then 1 else 0 end as Asignado,  \n\r' +
        '        case when p.n_idgen_programa is not null then (case when p.b_estado = true then \'atendido\' else \'pendiente\' end) else \'sin asignar\' end as Estado \n\r' +
        '    from \n\r' +
        '        gen_sistemafotovoltaico sf  \n\r' +
        '        inner join	gen_centropoblado cp on cp.n_idgen_centropoblado = sf.n_idgen_centropoblado and cp.n_borrado = 0  \n\r' +
        '        inner join	gen_distrito di on di.n_idgen_distrito = cp.n_idgen_distrito and di.n_borrado = 0  \n\r' +
        '        inner join	gen_provincia pr on pr.n_idgen_provincia = di.n_idgen_provincia and pr.n_borrado = 0  \n\r' +
        '        inner join	gen_departamento de on de.n_idgen_departamento = pr.n_idgen_departamento and de.n_borrado = 0 \n\r' + 
        '        inner join	gen_Persona pe on pe.n_idgen_persona = sf.n_idgen_persona and pe.n_borrado = 0  \n\r' +
        '        left outer join	tablatemp p on p.n_idgen_sistemafotovoltaico = sf.n_idgen_sistemafotovoltaico   \n\r' +
        '    where  \n\r' +
        '        sf.n_borrado = 0  \n\r' +
        '        and (case when 0 = ' + n_id_estado + ' then (case when coalesce(p.n_idgen_programa, 0) > -1 then 0 else 1 end) else (case when coalesce(p.n_idgen_programa, 0) = 0 then 1 else 0 end) end) = ' + n_id_estado + ' \n\r' +
        '        and (de.n_idgen_departamento = ' + n_idgen_departamento + ' or 0 = ' + n_idgen_departamento + ') \n\r' +
        '        and (pr.n_idgen_provincia = ' + n_idgen_provincia + ' or 0 = ' + n_idgen_provincia + ')  \n\r' +
        '        and (di.n_idgen_distrito = ' + n_idgen_distrito + ' or 0 = ' + n_idgen_distrito + ')  \n\r' +
        '        and (cp.n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or 0 = ' + n_idgen_centropoblado + ')';

        /*let cadena =
        'select \n\r' +
        '    sf.n_idgen_sistemafotovoltaico, \n\r' +
        '    sf.c_codigosuministro as suministro, \n\r' +
        '    de.n_idgen_departamento, \n\r' +
        '    de.c_nombre as departamento, \n\r' +
        '    pr.n_idgen_provincia, \n\r' +
        '    pr.c_nombre as provincia, \n\r' +
        '    di.n_idgen_distrito, \n\r' +
        '    di.c_nombre as distrito, \n\r' +
        '    cp.n_idgen_centropoblado, \n\r' +
        '    cp.c_nombre as centropoblado, \n\r' +
        '    pe.n_idgen_persona, \n\r' +
        '    pe.c_nombres as nombres, \n\r' +
        '    pe.c_appaterno as appaterno, \n\r' +
        '    pe.c_apmaterno as apmaterno, \n\r' +
        '    pe.c_nrodni as dni, \n\r' +
        '    case when p.n_idgen_programa is not null then 1 else 0 end as Asignado, \n\r' +
        '    case when p.n_idgen_programa is not null then (case when p.b_estado = true then \'atendido\' else \'pendiente\' end) else \'sin asignar\' end as Estado \n\r' +
        'from	 \n\r' +
        '    gen_sistemafotovoltaico sf \n\r' +
        '    inner join	gen_centropoblado cp on cp.n_idgen_centropoblado = sf.n_idgen_centropoblado and cp.n_borrado = 0 \n\r' +
        '    inner join	gen_distrito di on di.n_idgen_distrito = cp.n_idgen_distrito and di.n_borrado = 0 \n\r' +
        '    inner join	gen_provincia pr on pr.n_idgen_provincia = di.n_idgen_provincia and pr.n_borrado = 0 \n\r' +
        '    inner join	gen_departamento de on de.n_idgen_departamento = pr.n_idgen_departamento and de.n_borrado = 0 \n\r' +
        '    inner join	gen_Persona pe on pe.n_idgen_persona = sf.n_idgen_persona and pe.n_borrado = 0 \n\r' +
        '    left outer join	gen_programa p on p.n_idgen_sistemafotovoltaico = sf.n_idgen_sistemafotovoltaico \n\r' +
        '        and p.n_borrado = 0  \n\r' +
        '        and p.n_idgen_tipoprograma = ' + n_idgen_tipoprograma + ' \n\r' +
        '        and p.n_idseg_user = ' + n_idseg_user + ' \n\r' +
        '        and p.n_idgen_periodo = ' + n_idgen_periodo + ' \n\r' +
        'where \n\r' +
        '    sf.n_borrado = 0 \n\r' +
        '    and	de.n_idgen_departamento = ' + n_idgen_departamento + ' \n\r' +
        '    and pr.n_idgen_provincia = ' + n_idgen_provincia + ' \n\r' +
        '    and di.n_idgen_distrito = ' + n_idgen_distrito + ' \n\r' +
        '    and cp.n_idgen_centropoblado = ' + n_idgen_centropoblado;*/

        pool.query(cadena,
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

        let  n_idgen_entidad=request.body.n_idgen_entidad;
        let c_name = request.body.c_name;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idgen_entidad from gen_entidad where n_borrado = 0 and c_name =\'' + c_name + '\')) then \n\r' +
        '           if('+n_idgen_entidad+'!=0) then \n\r' +
        '               update gen_entidad set c_name= \''+c_name+'\' where n_idgen_entidad=\''+n_idgen_entidad+'\'; \n\r' +
        '           else \n\r' +
        '               insert into gen_entidad(n_idgen_entidad,c_name,n_borrado,d_fechacrea,n_id_usercrea) \n\r' +
        '               values (default,\''+c_name+'\',0,now(),1); \n\r' +
        '           end if; \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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

const savePeriodo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let n_mes = request.body.n_mes;
        let n_annio = request.body.n_annio;
        const nombreMes = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
            "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
            ];
        let c_descripcion = nombreMes[n_mes-1]+' '+n_annio;
        console.log(c_descripcion);

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idgen_periodo from gen_periodo where n_borrado = 0 and c_descripcion =\''+c_descripcion+'\')) then \n\r' +
        '           insert into gen_periodo(n_idgen_periodo,c_descripcion,n_annio,n_mes,n_borrado,n_id_usercrea,d_fechacrea) \n\r' +
        '           values ((select max(n_idgen_periodo) + 1 from gen_periodo),\''+c_descripcion+'\',\''+n_annio+'\',\''+n_mes+'\',0,1,now()); \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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

const saveLocalization = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let  n_idgen_localizacion=request.body.n_idgen_localizacion;
        let c_valor = request.body.c_valor;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idgen_localizacion from gen_localizacion where n_borrado = 0 and c_valor =\'' + c_valor + '\')) then \n\r' +
        '           if('+n_idgen_localizacion+'!=0) then \n\r' +
        '               update gen_localizacion set c_valor= \''+c_valor+'\' where n_idgen_localizacion='+n_idgen_localizacion+'; \n\r' +
        '           else \n\r' +
        '               insert into gen_localizacion(n_idgen_localizacion,c_valor,n_borrado,n_id_usercrea,d_fechacrea) \n\r' +
        '               values (default,\''+c_valor+'\',0,1,now()); \n\r' +
        '           end if; \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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

const saveTipoImagen = (request, response) => {
    var obj = valida.validaToken(request)
    
    if (obj.estado) {
        
        let n_idgen_tipoimagen = request.body.n_idgen_tipoimagen;
        let c_codigo = request.body.c_codigo;
        let c_nombre = request.body.c_nombre;
        let n_tipo = request.body.n_tipo;
        let n_modulo = request.body.n_modulo;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idgen_tipoimagen from gen_tipoimagen where n_borrado = 0 and c_codigo =\'' + c_codigo + '\') \n\r' +
        '       and \n\r' +
        '       not exists(select n_idgen_tipoimagen from gen_tipoimagen where n_borrado = 0 and c_nombre =\'' + c_nombre + '\')) then \n\r' +
        '           if('+n_idgen_tipoimagen+'!=0) then \n\r' +
        '               update gen_tipoimagen set c_codigo= \''+c_codigo+'\', c_nombre = \''+c_nombre+'\' where n_idgen_tipoimagen=\''+n_idgen_tipoimagen+'\'; \n\r' +
        '           else \n\r' +
        '               insert into gen_tipoimagen(n_idgen_tipoimagen,c_codigo,c_nombre,n_tipo,n_modulo,n_borrado,n_id_usercrea,d_fechacrea) \n\r' +
        '               values (default,\''+c_codigo+'\',\''+c_nombre+'\','+n_tipo+','+n_modulo+',0,1,now()); \n\r' +
        '           end if; \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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

const saveUnidadServicio = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let  n_idgen_unidadservicio=request.body.n_idgen_unidadservicio;
        let c_nombre = request.body.c_nombre;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idgen_unidadservicio from gen_unidadservicio where n_borrado = 0 and c_nombre =\'' + c_nombre + '\')) then \n\r' +
        '           if('+n_idgen_unidadservicio+'!=0) then \n\r' +
        '               update gen_unidadservicio set c_nombre= \''+c_nombre+'\' where n_idgen_unidadservicio=\''+n_idgen_unidadservicio+'\'; \n\r' +
        '           else \n\r' +
        '               insert into gen_unidadservicio(n_idgen_unidadservicio,c_nombre,n_borrado,n_id_usercrea,d_fechacrea) \n\r' +
        '               values (default,\''+c_nombre+'\',0,1,now()); \n\r' +
        '           end if; \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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
const saveElementoProcedencia = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let  n_idins_elementoprocedencia=request.body.n_idins_elementoprocedencia;
        let c_valor = request.body.c_valor;
        let c_descripcion = request.body.c_descripcion;
        if(c_descripcion==''){
            c_descripcion=null;
        }
        else{
            c_descripcion = '\''+c_descripcion+'\'';
        }

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idins_elementoprocedencia from ins_elementoprocedencia where n_borrado = 0 and upper(c_valor) =\'' + c_valor.toString().toUpperCase() + '\')) then \n\r' +
        '           if('+n_idins_elementoprocedencia+'!=0) then \n\r' +
        '               update ins_elementoprocedencia set c_valor= \''+c_valor+'\', c_descripcion='+c_descripcion +' where n_idins_elementoprocedencia='+n_idins_elementoprocedencia+'; \n\r' +
        '           else \n\r' +
        '               insert into ins_elementoprocedencia(n_idins_elementoprocedencia,c_valor,c_descripcion,n_borrado,n_id_usercrea,d_fechacrea) \n\r' +
        '               values (default,\''+c_valor+'\','+c_descripcion+',0,1,now()); \n\r' +
        '           end if; \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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
const saveElementoGrupo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let  n_idins_elementogrupo=request.body.n_idins_elementogrupo;
        let c_subgrupo = request.body.c_subgrupo;
        let c_valor = request.body.c_valor;
        let c_descripcion = request.body.c_descripcion;
        if(c_descripcion==''){
            c_descripcion=null;
        }
        else{
            c_descripcion = '\''+c_descripcion+'\'';
        }

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idins_elementogrupo from ins_elementogrupo where n_borrado = 0 and upper(c_valor) =\'' + c_valor.toString().toUpperCase() + '\')) then \n\r' +
        '           if('+n_idins_elementogrupo+'!=0) then \n\r' +
        '               update ins_elementogrupo set c_subgrupo= \''+c_subgrupo+'\', c_valor='+'\''+c_valor+'\', c_descripcion='+c_descripcion+' where n_idins_elementogrupo='+n_idins_elementogrupo+'; \n\r' +
        '           else \n\r' +
        '               insert into ins_elementogrupo(n_idins_elementogrupo,c_subgrupo,c_valor,c_descripcion,n_borrado,n_id_usercrea,d_fechacrea) \n\r' +
        '               values (default,\''+c_subgrupo+'\',\''+c_valor+'\','+c_descripcion+',0,1,now()); \n\r' +
        '           end if; \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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

const saveElementoEspecificacion = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let n_idins_elementoespecificacion=request.body.n_idins_elementoespecificacion;
        let  n_idins_elementogrupo=request.body.n_idins_elementogrupo;
        let c_tipo = request.body.c_tipo;
        let c_marca = request.body.c_marca;
        let c_modelo = request.body.c_modelo;
        if(c_tipo==''){
            c_tipo=null;
        }
        else{
            c_tipo = '\''+c_tipo+'\'';
        }

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idins_elementoespecificacion from ins_elementoespecificacion where n_borrado = 0 and n_idins_elementogrupo = '+n_idins_elementogrupo+' and upper(c_tipo) =' + c_tipo + ' and upper(c_marca) =\'' + c_marca.toString().toUpperCase() + '\' and upper(c_modelo) =\'' + c_modelo.toString().toUpperCase() + '\')) then \n\r' +
        '           if('+n_idins_elementoespecificacion+'!=0) then \n\r' +
        '               update ins_elementoespecificacion set n_idins_elementogrupo='+n_idins_elementogrupo+', c_tipo= '+c_tipo+', c_marca='+'\''+c_marca+'\', c_modelo= \''+c_modelo+'\' where n_idins_elementoespecificacion='+n_idins_elementoespecificacion+'; \n\r' +
        '           else \n\r' +
        '               insert into ins_elementoespecificacion(n_idins_elementoespecificacion,n_idins_elementogrupo,c_tipo,c_marca,c_modelo,n_borrado,n_id_usercrea,d_fechacrea) \n\r' +
        '               values (default,'+n_idins_elementogrupo+','+c_tipo+',\''+c_marca+'\',\''+c_modelo+'\',0,1,now()); \n\r' +
        '           end if; \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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
const saveSoporteTipo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let  n_idins_soportetipo=request.body.n_idins_soportetipo;
        let c_valor = request.body.c_valor;
        let c_descripcion = request.body.c_descripcion;
        c_descripcion = '\''+c_descripcion+'\'';

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idins_soportetipo from ins_soportetipo where n_borrado = 0 and upper(c_valor) =\'' + c_valor.toString().toUpperCase() + '\')) then \n\r' +
        '           if('+n_idins_soportetipo+'!=0) then \n\r' +
        '               update ins_soportetipo set c_valor= \''+c_valor+'\', c_descripcion='+c_descripcion +' where n_idins_soportetipo='+n_idins_soportetipo+'; \n\r' +
        '           else \n\r' +
        '               insert into ins_soportetipo(n_idins_soportetipo,c_valor,c_descripcion,n_borrado,n_id_usercrea,d_fechacrea) \n\r' +
        '               values (default,\''+c_valor+'\','+c_descripcion+',0,1,now()); \n\r' +
        '           end if; \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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
const saveAtributo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let n_idins_atributos=request.body.n_idins_atributos;
        let c_valor = request.body.c_valor;
        let c_descripcion = request.body.c_descripcion;
        c_descripcion = '\''+c_descripcion+'\'';

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idins_atributos from ins_atributos where n_borrado = 0 and upper(c_valor) =\'' + c_valor.toString().toUpperCase() + '\')) then \n\r' +
        '           if('+n_idins_atributos+'!=0) then \n\r' +
        '               update ins_atributos set c_valor= \''+c_valor+'\', c_descripcion='+c_descripcion +' where n_idins_atributos='+n_idins_atributos+'; \n\r' +
        '           else \n\r' +
        '               insert into ins_atributos(n_idins_atributos,c_valor,c_descripcion,n_borrado,n_id_usercrea,d_fechacrea) \n\r' +
        '               values (default,\''+c_valor+'\','+c_descripcion+',0,1,now()); \n\r' +
        '           end if; \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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
const saveTipoCorte = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let n_idgen_tipocorte=request.body.n_idgen_tipocorte;
        let c_descripcion = request.body.c_descripcion;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idgen_tipocorte from gen_tipocorte where n_borrado = 0 and upper(c_descripcion) =\'' + c_descripcion.toString().toUpperCase() + '\')) then \n\r' +
        '           if('+n_idgen_tipocorte+'!=0) then \n\r' +
        '               update gen_tipocorte set c_descripcion= \''+c_descripcion+'\' where n_idgen_tipocorte='+n_idgen_tipocorte+'; \n\r' +
        '           else \n\r' +
        '               insert into gen_tipocorte(n_idgen_tipocorte,c_descripcion,n_borrado,n_id_usercrea,d_fechacrea) \n\r' +
        '               values (default,\''+c_descripcion+'\',0,1,now()); \n\r' +
        '           end if; \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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
const saveTipoSFV = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let n_idgen_tiposfv=request.body.n_idgen_tiposfv;
        let c_descripcion = request.body.c_descripcion;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idgen_tiposfv from gen_tiposfv where n_borrado = 0 and upper(c_descripcion) =\'' + c_descripcion.toString().toUpperCase() + '\')) then \n\r' +
        '           if('+n_idgen_tiposfv+'!=0) then \n\r' +
        '               update gen_tiposfv set c_descripcion= \''+c_descripcion+'\' where n_idgen_tiposfv='+n_idgen_tiposfv+'; \n\r' +
        '           else \n\r' +
        '               insert into gen_tiposfv(n_idgen_tiposfv,c_descripcion,n_borrado,n_id_usercrea,d_fechacrea) \n\r' +
        '               values (default,\''+c_descripcion+'\',0,1,now()); \n\r' +
        '           end if; \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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
const saveModulo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let n_idgen_modulo=request.body.n_idgen_modulo;
        let c_descripcion = request.body.c_descripcion;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if(not exists(select n_idgen_modulo from gen_modulo where n_borrado = 0 and upper(c_descripcion) =\'' + c_descripcion.toString().toUpperCase() + '\')) then \n\r' +
        '           if('+n_idgen_modulo+'!=0) then \n\r' +
        '               update gen_modulo set c_descripcion= \''+c_descripcion+'\' where n_idgen_modulo='+n_idgen_modulo+'; \n\r' +
        '           else \n\r' +
        '               insert into gen_modulo(n_idgen_modulo,c_descripcion,n_borrado,n_id_usercrea,d_fechacrea) \n\r' +
        '               values (default,\''+c_descripcion+'\',0,1,now()); \n\r' +
        '           end if; \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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


const deleteEntidad = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let  c_name=request.body.c_name;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update gen_entidad set n_borrado = n_idgen_entidad where c_name=\'' + c_name + '\'; \n\r' +
        '   end \n\r' +
        '$$';

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

const deletePeriodo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let n_annio = request.body.n_annio;
        let n_mes = request.body.n_mes;

        let c_descripcion=request.body.c_descripcion;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update gen_periodo set n_borrado = n_idgen_periodo where c_descripcion=\'' + c_descripcion + '\'; \n\r' +
        '   end \n\r' +
        '$$';

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

const deleteLocalization = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let n_idgen_localizacion=request.body.n_idgen_localizacion;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update gen_localizacion set n_borrado = n_idgen_localizacion where n_idgen_localizacion=\'' + n_idgen_localizacion + '\'; \n\r' +
        '   end \n\r' +
        '$$';

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

const deleteUnidadServicio = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let n_idgen_unidadservicio=request.body.n_idgen_unidadservicio;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update gen_unidadservicio set n_borrado = n_idgen_unidadservicio where n_idgen_unidadservicio=\'' + n_idgen_unidadservicio + '\'; \n\r' +
        '   end \n\r' +
        '$$';

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

const deleteTipoImagen = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let n_idgen_tipoimagen=request.body.n_idgen_tipoimagen;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update gen_tipoimagen set n_borrado = n_idgen_tipoimagen where n_idgen_tipoimagen=\'' + n_idgen_tipoimagen + '\'; \n\r' +
        '   end \n\r' +
        '$$';

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
const deleteElementoProcedencia = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let n_idins_elementoprocedencia=request.body.n_idins_elementoprocedencia;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update ins_elementoprocedencia set n_borrado = n_idins_elementoprocedencia where n_idins_elementoprocedencia=\'' + n_idins_elementoprocedencia + '\'; \n\r' +
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
const deleteElementoGrupo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let n_idins_elementogrupo=request.body.n_idins_elementogrupo;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update ins_elementogrupo set n_borrado = n_idins_elementogrupo where n_idins_elementogrupo=\'' + n_idins_elementogrupo + '\'; \n\r' +
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
const deleteElementoEspecificacion = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let n_idins_elementoespecificacion=request.body.n_idins_elementoespecificacion;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update ins_elementoespecificacion set n_borrado = n_idins_elementoespecificacion where n_idins_elementoespecificacion=\'' + n_idins_elementoespecificacion + '\'; \n\r' +
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
const deleteSoporteTipo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let n_idins_soportetipo=request.body.n_idins_soportetipo;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update ins_soportetipo set n_borrado = n_idins_soportetipo where n_idins_soportetipo=\'' + n_idins_soportetipo + '\'; \n\r' +
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
const deleteAtributo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let n_idins_atributos=request.body.n_idins_atributos;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update ins_atributos set n_borrado = n_idins_atributos where n_idins_atributos=\'' + n_idins_atributos + '\'; \n\r' +
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
const deleteTipoCorte = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let n_idgen_tipocorte=request.body.n_idgen_tipocorte;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update gen_tipocorte set n_borrado = n_idgen_tipocorte where n_idgen_tipocorte=\'' + n_idgen_tipocorte + '\'; \n\r' +
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
const deleteTipoSFV = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let n_idgen_tiposfv=request.body.n_idgen_tiposfv;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update gen_tiposfv set n_borrado = n_idgen_tiposfv where n_idgen_tiposfv=\'' + n_idgen_tiposfv + '\'; \n\r' +
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
const deleteModulo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        
        let n_idgen_modulo=request.body.n_idgen_modulo;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update gen_modulo set n_borrado = n_idgen_modulo where n_idgen_modulo=\'' + n_idgen_modulo + '\'; \n\r' +
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

const saveUsuarioUbigeo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let  n_idgen_sistemafotovoltaico = request.body.n_idgen_sistemafotovoltaico;
        let  n_idseg_user = request.body.n_idseg_user;
        let  n_idgen_periodo = request.body.n_idgen_periodo;
        let  n_idgen_tipoprograma = request.body.n_idgen_tipoprograma;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       if (not exists(select n_idgen_programa from gen_programa where N_Borrado = 0 and b_estado = false and N_IDseg_User = ' + n_idseg_user + ' and n_idgen_tipoprograma = ' + n_idgen_tipoprograma + ' and n_idgen_sistemafotovoltaico = ' + n_idgen_sistemafotovoltaico + ' and N_IDgen_Periodo = ' + n_idgen_periodo + ')) then \n\r' +
        '           insert into gen_programa values (default, ' + n_idgen_sistemafotovoltaico + ', ' + n_idgen_periodo + ', ' + n_idseg_user + ', ' + n_idgen_tipoprograma + ', false, 0, 12, null, current_timestamp, null); \n\r' +
        '       end if; \n\r' +
        '   end \n\r' +
        '$$';

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

const deleteUsuarioUbigeo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let  n_idgen_sistemafotovoltaico = request.body.n_idgen_sistemafotovoltaico;
        let  n_idseg_user = request.body.n_idseg_user;
        let  n_idgen_periodo = request.body.n_idgen_periodo;
        let  n_idgen_tipoprograma = request.body.n_idgen_tipoprograma;

        let cadena = 'do $$ \n\r' +
        '   begin \n\r' +
        '       update gen_Programa set N_Borrado = N_IDgen_Programa where N_Borrado = 0 and N_IDseg_User = ' + n_idseg_user + ' and N_IDgen_TipoPrograma = ' + n_idgen_tipoprograma + ' and N_IDgen_SistemaFotovoltaico = ' + n_idgen_sistemafotovoltaico + ' and N_IDgen_Periodo = ' + n_idgen_periodo + '; \n\r' + 
        '   end \n\r' +
        '$$';

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

const asignartodo = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {

        let  n_idgen_departamento = request.body.n_idgen_departamento;
        let  n_idgen_provincia = request.body.n_idgen_provincia;
        let  n_idgen_distrito = request.body.n_idgen_distrito;
        let  n_idgen_centropoblado = request.body.n_idgen_centropoblado;
        let  n_idseg_user = request.body.n_idseg_user;
        let  n_idgen_periodo = request.body.n_idgen_periodo;
        let  n_idgen_tipoprograma = request.body.n_idgen_tipoprograma;
        let  n_id_estado = request.body.n_id_estado;

        let cadena = 
            'select * from fn_insertarprograma('+ n_idgen_departamento +',' + n_idgen_provincia + ',' + n_idgen_distrito + ',' + n_idgen_centropoblado + ',' + n_idseg_user + ',' + n_idgen_periodo + ',' + n_idgen_tipoprograma + ',' + n_id_estado + ');';

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


    getEquipo,
    deleteEquipo,
    saveEquipo,














    get,
    save,
    savePeriodo,
    deleteEntidad,
    deletePeriodo,
    getUsuarioUbigeo,
    getPeriodo,
    saveUsuarioUbigeo,
    deleteUsuarioUbigeo,
    getMantenimiento,
    asignartodo,
    getPeriodoForEdit,
    getLocalizationForEdit,
    deleteLocalization,
    saveLocalization,
    getUnidadServicioForEdit,
    deleteUnidadServicio,
    saveUnidadServicio,
    getTipoImagenForEdit,
    deleteTipoImagen,
    saveTipoImagen,
    getElementoProcedenciaForEdit,
    deleteElementoProcedencia,
    saveElementoProcedencia,
    getElementoGrupoForEdit,
    deleteElementoGrupo,
    saveElementoGrupo,
    getElementoEspecificacionForEdit,
    deleteElementoEspecificacion,
    saveElementoEspecificacion,
    getTipoForEspecificacion,
    getMarcaForEspecificacion,
    getModeloForEspecificacion,
    getSoporteTipoForEdit,
    deleteSoporteTipo,
    saveSoporteTipo,
    getAtributoForEdit,
    deleteAtributo,
    saveAtributo,
    getTipoCorteForEdit,
    deleteTipoCorte,
    saveTipoCorte,
    getTipoSFVForEdit,
    deleteTipoSFV,
    saveTipoSFV,
    getModuloForEdit,
    deleteModulo,
    saveModulo,
    getReparto,
    imprimirReparto,
    getDetalleReparto,

}
