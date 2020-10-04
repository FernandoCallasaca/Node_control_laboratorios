const cnx = require('../common/appsettings')
const valida = require('../common/validatoken')
let pool = cnx.pool;


const get = (request, response) => {
    var obj = valida.validaToken(request)

    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_entidad = request.body.n_idgen_entidad;
    let n_idgen_periodo = request.body.n_idgen_periodo;
    let n_idseg_user = request.body.n_idseg_user;
    let n_idgen_mantenimiento = request.body.n_idgen_mantenimiento;

    if (obj.estado) {
        let cadena = 'select * from vw_sistemafotovoltaico ' +
            'where (n_idgen_departamento = ' + n_idgen_departamento + ' or 0 = ' + n_idgen_departamento + ') ' +
            'and (n_idgen_provincia = ' + n_idgen_provincia + ' or 0 = ' + n_idgen_provincia + ') ' +
            'and (n_idgen_distrito= ' + n_idgen_distrito + ' or 0 = ' + n_idgen_distrito + ') ' +
            'and (n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or 0 =  ' + n_idgen_centropoblado + ') ' +
            'and (n_idgen_periodo = ' + n_idgen_periodo + ' or 0 =  ' + n_idgen_periodo + ') ' +
            'and (n_idseg_user = ' + n_idseg_user + ' or 0 =  ' + n_idseg_user + ') ' +
            'and (n_idgen_tipoprograma = ' + n_idgen_mantenimiento + ' or 0 =  ' + n_idgen_mantenimiento + ') ' +
            'and (n_idgen_entidad = ' + n_idgen_entidad + ' or 0 = ' + n_idgen_entidad + ') ';
        pool.query(cadena
            , (error, results) => {
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

const getReclamo = (request, response) => {
    var obj = valida.validaToken(request)

    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_entidad = request.body.n_idgen_entidad;
    let n_idseg_user = request.body.n_idseg_user;
    let dateinicio = request.body.dateinicio;
    let datefin = request.body.datefin;

    if (obj.estado) {
        let cadena = 'select * from vw_reclamo ' +
            'where (n_idgen_departamento = ' + n_idgen_departamento + ' or 0 = ' + n_idgen_departamento + ') ' +
            'and (n_idgen_provincia = ' + n_idgen_provincia + ' or 0 = ' + n_idgen_provincia + ') ' +
            'and (n_idgen_distrito= ' + n_idgen_distrito + ' or 0 = ' + n_idgen_distrito + ') ' +
            'and (n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or 0 =  ' + n_idgen_centropoblado + ') '+
            'and (n_idseg_user = ' + n_idseg_user + ' or 0 =  ' + n_idseg_user + ') ' +
            'and (n_idgen_entidad = ' + n_idgen_entidad + ' or 0 = ' + n_idgen_entidad + ') ' +
            'and (\'null\' = \''+dateinicio+'\' or d_fechacrea between to_timestamp(\''+dateinicio+'\', \'yyyy/mm/dd\') and to_timestamp(\''+datefin+'\', \'yyyy/mm/dd\')) \r\n'; 
            pool.query(cadena
            , (error, results) => {
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
const getReclamosGrilla = (request, response) => {
    console.log(request.body);
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let cadena = 'select \n\r' +
            '    rec.n_idrec_reclamo, \n\r' +
            '    rec.c_latitud, \n\r' +
            '    rec.c_longitud, \n\r' +
            '    to_char(rec.d_fecha, \'dd/MM/yyyy\'::text) AS c_fecha, \n\r' +
            '    to_char(rec.d_fecha, \'HH:mm:ss\'::text) AS c_hora, \n\r' +
            '    rec.c_observacion, \n\r' +
            '    u.c_name AS c_nametecnico, \n\r' +
            '    u.c_lastname AS c_lastnametecnico, \n\r' +
            '    (((u.c_name::text || \', \'::text) || u.c_lastname::text))::character varying(250) AS c_tecnico, \n\r' +
            '    u.c_documentid AS c_dnitecnico \n\r' +
            'from \n\r' +
            '    rec_reclamo rec \n\r' +
            '    join seg_user u  ON u.n_idseg_user = rec.n_idseg_usuario \n\r' +
            'and n_idgen_sistemafotovoltaico = $1';
        pool.query(cadena, [request.body.n_idgen_sistemafotovoltaico],
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

const getLamparas = (request, response) => {
    var obj = valida.validaToken(request)

    let n_idmnt_sistemafotovoltaico = request.body.n_idmnt_sistemafotovoltaico;

    if (obj.estado) {
        let cadena = 'select \n\r' +
            '    e.n_idmnt_elemento, \n\r' +
            '    row_number() over(order by e.n_idmnt_elemento) n_fila, \n\r' +
            '    e.c_nroserie C_serie, \n\r' +
            '    case when e.b_operativo = true then 1 else 0 end b_operativo, \n\r' +
            '    grp.c_subgrupo, \n\r' +
            '    grp.c_valor c_equipo, \n\r' +
            '    esp.c_tipo, \n\r' +
            '    esp.c_marca, \n\r' +
            '    esp.c_modelo, \n\r' +
            '    pro.c_valor c_procedencia, \n\r' +
            '    e.n_aniofabricacion n_annio, \n\r' +
            '    COALESCE(ea.c_valor, \'\') n_potencia, \n\r' +
            '    case when ele.b_retirado = true then 1 else 0 end b_retirado, \n\r' +
            '    ele.c_observacion \n\r' +
            'from \n\r' +
            '    mnt_elementosfv ele \n\r' +
            '    inner join	mnt_sistemafotovoltaico sfv on sfv.n_idmnt_sistemafotovoltaico = ele.n_idmnt_sistemafotovoltaico and sfv.n_borrado = 0 \n\r' +
            '    inner join	mnt_elemento e on e.n_idmnt_elemento = ele.n_idmnt_elemento and e.n_borrado = 0 \n\r' +
            '    inner join	ins_elementoespecificacion esp on esp.n_idins_elementoespecificacion = e.n_idins_elementoespecificacion and esp.n_borrado = 0 \n\r' +
            '    inner join	ins_elementogrupo grp on grp.n_idins_elementogrupo = esp.n_idins_elementogrupo and grp.n_borrado = 0 \n\r' +
            '    inner join	ins_elementoprocedencia pro on pro.n_idins_elementoprocedencia = e.n_idins_elementoprocedencia and pro.n_borrado = 0 \n\r' +
            '    left outer join	mnt_elementoatributos ea on ea.n_idmnt_elemento = e.n_idmnt_elemento and ea.n_borrado = 0 \n\r' +
            '    left outer join	ins_atributos atr on atr.n_idins_atributos = ea.n_idins_atributos and atr.n_borrado = 0 \n\r' +
            'where \n\r' +
            '    ele.n_borrado = 0 \n\r' +
            '    and grp.c_subgrupo = \'Equipo\' \n\r' +
            '    and grp.c_valor = \'Lámparas\' \n\r' +
            '    and ele.n_idmnt_sistemafotovoltaico = ' + n_idmnt_sistemafotovoltaico + ' \n\r' +
            'order by \n\r' +
            '    grp.c_subgrupo, \n\r' +
            '    grp.c_valor';

        pool.query(cadena
            , (error, results) => {
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

const getLamparasAll = (request, response) => {
    var obj = valida.validaToken(request)

    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_periodo = request.body.n_idgen_periodo;
    let n_idgen_tipoprograma = request.body.n_idgen_tipoprograma;
    let n_idgen_entidad = request.body.n_idgen_entidad;
    let n_idseg_user = request.body.n_idseg_user;
    let n_idmnt_sistemafotovoltaico = request.body.n_idmnt_sistemafotovoltaico;

    if (obj.estado) {
        let cadena = 'select \n\r' +
            '    sfv.n_idmnt_sistemafotovoltaico, \n\r' +
            '    e.n_idmnt_elemento, \n\r' +
            '    row_number() over(partition by sfv.n_idmnt_sistemafotovoltaico, grp.c_valor order by grp.c_valor, e.n_idmnt_elemento) n_fila, \n\r' +
            '    e.c_nroserie C_serie, \n\r' +
            '    case when e.b_operativo = true then 1 else 0 end b_operativo, \n\r' +
            '    grp.c_subgrupo, \n\r' +
            '    grp.c_valor c_equipo, \n\r' +
            '    esp.c_tipo, \n\r' +
            '    esp.c_marca, \n\r' +
            '    esp.c_modelo, \n\r' +
            '    pro.c_valor c_procedencia, \n\r' +
            '    e.n_aniofabricacion n_annio, \n\r' +
            '    COALESCE(ea.c_valor, \'\') n_potencia, \n\r' +
            '    case when ele.b_retirado = true then 1 else 0 end b_retirado, \n\r' +
            '    ele.c_observacion \n\r' +
            'from \n\r' +
            '    mnt_elementosfv ele \n\r' +
            '    inner join	mnt_sistemafotovoltaico sfv on sfv.n_idmnt_sistemafotovoltaico = ele.n_idmnt_sistemafotovoltaico and sfv.n_borrado = 0 \n\r' +

            '   inner join	gen_programa ps on ps.n_idgen_programa = sfv.n_idgen_programa and ps.n_borrado = 0 \n\r' +
            '   inner join	gen_sistemafotovoltaico s2 on s2.n_idgen_sistemafotovoltaico = ps.n_idgen_sistemafotovoltaico and s2.n_borrado = 0 \n\r' +
            '   inner join	gen_centropoblado cp on cp.n_idgen_centropoblado = s2.n_idgen_centropoblado and cp.n_borrado = 0 \n\r' +
            '   inner join	gen_distrito di on di.n_idgen_distrito = cp.n_idgen_distrito and di.n_borrado = 0 \n\r' +
            '   inner join	gen_provincia pr on pr.n_idgen_provincia = di.n_idgen_provincia and pr.n_borrado = 0 \n\r' +
            '   inner join	seg_user us on us.n_idseg_user = ps.n_idseg_user and us.n_borrado = 0 \n\r' +

            '    inner join	mnt_elemento e on e.n_idmnt_elemento = ele.n_idmnt_elemento and e.n_borrado = 0 \n\r' +
            '    inner join	ins_elementoespecificacion esp on esp.n_idins_elementoespecificacion = e.n_idins_elementoespecificacion and esp.n_borrado = 0 \n\r' +
            '    inner join	ins_elementogrupo grp on grp.n_idins_elementogrupo = esp.n_idins_elementogrupo and grp.n_borrado = 0 \n\r' +
            '    inner join	ins_elementoprocedencia pro on pro.n_idins_elementoprocedencia = e.n_idins_elementoprocedencia and pro.n_borrado = 0 \n\r' +
            '    left outer join	mnt_elementoatributos ea on ea.n_idmnt_elemento = e.n_idmnt_elemento and ea.n_borrado = 0 \n\r' +
            '    left outer join	ins_atributos atr on atr.n_idins_atributos = ea.n_idins_atributos and atr.n_borrado = 0 \n\r' +
            'where \n\r' +
            '    ele.n_borrado = 0 \n\r' +
            '       and (pr.n_idgen_departamento = ' + n_idgen_departamento + ' or ' + n_idgen_departamento + ' = 0) \n\r' +
            '       and (pr.n_idgen_provincia = ' + n_idgen_provincia + ' or ' + n_idgen_provincia + ' = 0) \n\r' +
            '       and (di.n_idgen_distrito = ' + n_idgen_distrito + ' or ' + n_idgen_distrito + ' = 0) \n\r' +
            '       and (cp.n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or ' + n_idgen_centropoblado + ' = 0) \n\r' +
            '       and (ps.n_idgen_periodo = ' + n_idgen_periodo + ' or ' + n_idgen_periodo + ' = 0) \n\r' +
            '       and (ps.n_idgen_tipoprograma = ' + n_idgen_tipoprograma + ' or ' + n_idgen_tipoprograma + ' = 0) \n\r' +
            '       and (us.n_idgen_entidad = ' + n_idgen_entidad + ' or ' + n_idgen_entidad + ' = 0) \n\r' +
            '       and (ps.n_idseg_user = ' + n_idseg_user + ' or ' + n_idseg_user + ' = 0) \n\r' +
            '       and (sfv.n_idmnt_sistemafotovoltaico = ' + n_idmnt_sistemafotovoltaico + ' or ' + n_idmnt_sistemafotovoltaico + ' = 0) \n\r' +
            '    and grp.c_subgrupo = \'Equipo\' \n\r' +
            '    and grp.c_valor = \'Lámparas\' \n\r' +
            'order by \n\r' +
            '    grp.c_subgrupo, \n\r' +
            '    grp.c_valor';

        pool.query(cadena
            , (error, results) => {
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

const getEquipos = (request, response) => {
    var obj = valida.validaToken(request)

    let n_idmnt_sistemafotovoltaico = request.body.n_idmnt_sistemafotovoltaico;

    if (obj.estado) {
        let cadena = 'select \n\r' +
            '    e.n_idmnt_elemento, \n\r' +
            '    row_number() over(partition by grp.c_valor order by grp.c_valor, esp.c_tipo) n_fila, \n\r' +
            '    e.c_nroserie C_serie, \n\r' +
            '    case when e.b_operativo = true then 1 else 0 end b_operativo, \n\r' +
            '    grp.c_subgrupo, \n\r' +
            '    grp.c_valor c_equipo, \n\r' +
            '    esp.c_tipo, \n\r' +
            '    esp.c_marca, \n\r' +
            '    esp.c_modelo, \n\r' +
            '    pro.c_valor c_procedencia, \n\r' +
            '    e.n_aniofabricacion n_annio, \n\r' +
            '    atr.c_valor c_atributo, \n\r' +
            '    atr.c_unidad, \n\r' +
            '    COALESCE(ea.c_valor, \'\') c_valor, \n\r' +
            '    case when ele.b_retirado = true then 1 else 0 end b_retirado, \n\r' +
            '    ele.c_observacion \n\r' +
            'from \n\r' +
            '    mnt_elementosfv ele \n\r' +
            '    inner join	mnt_sistemafotovoltaico sfv on sfv.n_idmnt_sistemafotovoltaico = ele.n_idmnt_sistemafotovoltaico and sfv.n_borrado = 0 \n\r' +
            '    inner join	mnt_elemento e on e.n_idmnt_elemento = ele.n_idmnt_elemento and e.n_borrado = 0 \n\r' +
            '    inner join	ins_elementoespecificacion esp on esp.n_idins_elementoespecificacion = e.n_idins_elementoespecificacion and esp.n_borrado = 0 \n\r' +
            '    inner join	ins_elementogrupo grp on grp.n_idins_elementogrupo = esp.n_idins_elementogrupo and grp.n_borrado = 0 \n\r' +
            '    inner join	ins_elementoprocedencia pro on pro.n_idins_elementoprocedencia = e.n_idins_elementoprocedencia and pro.n_borrado = 0 \n\r' +
            '    left outer join	mnt_elementoatributos ea on ea.n_idmnt_elemento = e.n_idmnt_elemento and ea.n_borrado = 0 \n\r' +
            '    left outer join	ins_atributos atr on atr.n_idins_atributos = ea.n_idins_atributos and atr.n_borrado = 0 \n\r' +
            'where \n\r' +
            '    ele.n_borrado = 0 \n\r' +
            '    and grp.c_subgrupo = \'Equipo\' \n\r' +
            '    and grp.c_valor != \'Lámparas\' \n\r' +
            '    and ele.n_idmnt_sistemafotovoltaico = ' + n_idmnt_sistemafotovoltaico + ' \n\r' +
            'order by \n\r' +
            '    grp.c_subgrupo, \n\r' +
            '    grp.c_valor';

        pool.query(cadena
            , (error, results) => {
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

const getComponentes = (request, response) => {
    var obj = valida.validaToken(request)

    let n_idmnt_sistemafotovoltaico = request.body.n_idmnt_sistemafotovoltaico;

    if (obj.estado) {
        let cadena = 'select \n\r' +
            '    e.n_idmnt_elemento, \n\r' +
            '    row_number() over(partition by grp.c_valor order by grp.c_valor, esp.c_tipo) n_fila, \n\r' +
            '    e.c_nroserie C_serie, \n\r' +
            '    case when e.b_operativo = true then 1 else 0 end b_operativo, \n\r' +
            '    grp.c_subgrupo, \n\r' +
            '    grp.c_valor c_equipo, \n\r' +
            '    COALESCE(esp.c_tipo, \'\') c_tipo, \n\r' +
            '    esp.c_marca, \n\r' +
            '    esp.c_modelo, \n\r' +
            '    pro.c_valor c_procedencia, \n\r' +
            '    e.n_aniofabricacion n_annio, \n\r' +
            '    COALESCE(ea.c_valor, \'\') n_potencia, \n\r' +
            '    case when ele.b_retirado = true then 1 else 0 end b_retirado, \n\r' +
            '    ele.c_observacion \n\r' +
            'from \n\r' +
            '    mnt_elementosfv ele \n\r' +
            '    inner join	mnt_sistemafotovoltaico sfv on sfv.n_idmnt_sistemafotovoltaico = ele.n_idmnt_sistemafotovoltaico and sfv.n_borrado = 0 \n\r' +
            '    inner join	mnt_elemento e on e.n_idmnt_elemento = ele.n_idmnt_elemento and e.n_borrado = 0 \n\r' +
            '    inner join	ins_elementoespecificacion esp on esp.n_idins_elementoespecificacion = e.n_idins_elementoespecificacion and esp.n_borrado = 0 \n\r' +
            '    inner join	ins_elementogrupo grp on grp.n_idins_elementogrupo = esp.n_idins_elementogrupo and grp.n_borrado = 0 \n\r' +
            '    inner join	ins_elementoprocedencia pro on pro.n_idins_elementoprocedencia = e.n_idins_elementoprocedencia and pro.n_borrado = 0 \n\r' +
            '    left outer join	mnt_elementoatributos ea on ea.n_idmnt_elemento = e.n_idmnt_elemento and ea.n_borrado = 0 \n\r' +
            '    left outer join	ins_atributos atr on atr.n_idins_atributos = ea.n_idins_atributos and atr.n_borrado = 0 \n\r' +
            'where \n\r' +
            '    ele.n_borrado = 0 \n\r' +
            '    and grp.c_subgrupo = \'Componente\' \n\r' +
            '    and ele.n_idmnt_sistemafotovoltaico = ' + n_idmnt_sistemafotovoltaico + ' \n\r' +
            'order by \n\r' +
            '    grp.c_subgrupo, \n\r' +
            '    grp.c_valor';

        pool.query(cadena
            , (error, results) => {
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

const getComponentesAll = (request, response) => {
    var obj = valida.validaToken(request)

    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_periodo = request.body.n_idgen_periodo;
    let n_idgen_tipoprograma = request.body.n_idgen_tipoprograma;
    let n_idgen_entidad = request.body.n_idgen_entidad;
    let n_idseg_user = request.body.n_idseg_user;
    let n_idmnt_sistemafotovoltaico = request.body.n_idmnt_sistemafotovoltaico;

    if (obj.estado) {
        let cadena = 'select \n\r' +
            '    sfv.n_idmnt_sistemafotovoltaico, \n\r' +
            '    e.n_idmnt_elemento, \n\r' +
            '    row_number() over(partition by sfv.n_idmnt_sistemafotovoltaico, grp.c_valor order by grp.c_valor, esp.c_tipo) n_fila, \n\r' +
            '    e.c_nroserie C_serie, \n\r' +
            '    case when e.b_operativo = true then 1 else 0 end b_operativo, \n\r' +
            '    grp.c_subgrupo, \n\r' +
            '    grp.c_valor c_equipo, \n\r' +
            '    COALESCE(esp.c_tipo, \'\') c_tipo, \n\r' +
            '    esp.c_marca, \n\r' +
            '    esp.c_modelo, \n\r' +
            '    pro.c_valor c_procedencia, \n\r' +
            '    e.n_aniofabricacion n_annio, \n\r' +
            '    COALESCE(ea.c_valor, \'\') n_potencia, \n\r' +
            '    case when ele.b_retirado = true then 1 else 0 end b_retirado, \n\r' +
            '    ele.c_observacion \n\r' +
            'from \n\r' +
            '    mnt_elementosfv ele \n\r' +
            '    inner join	mnt_sistemafotovoltaico sfv on sfv.n_idmnt_sistemafotovoltaico = ele.n_idmnt_sistemafotovoltaico and sfv.n_borrado = 0 \n\r' +

            '   inner join	gen_programa ps on ps.n_idgen_programa = sfv.n_idgen_programa and ps.n_borrado = 0 \n\r' +
            '   inner join	gen_sistemafotovoltaico s2 on s2.n_idgen_sistemafotovoltaico = ps.n_idgen_sistemafotovoltaico and s2.n_borrado = 0 \n\r' +
            '   inner join	gen_centropoblado cp on cp.n_idgen_centropoblado = s2.n_idgen_centropoblado and cp.n_borrado = 0 \n\r' +
            '   inner join	gen_distrito di on di.n_idgen_distrito = cp.n_idgen_distrito and di.n_borrado = 0 \n\r' +
            '   inner join	gen_provincia pr on pr.n_idgen_provincia = di.n_idgen_provincia and pr.n_borrado = 0 \n\r' +
            '   inner join	seg_user us on us.n_idseg_user = ps.n_idseg_user and us.n_borrado = 0 \n\r' +

            '    inner join	mnt_elemento e on e.n_idmnt_elemento = ele.n_idmnt_elemento and e.n_borrado = 0 \n\r' +
            '    inner join	ins_elementoespecificacion esp on esp.n_idins_elementoespecificacion = e.n_idins_elementoespecificacion and esp.n_borrado = 0 \n\r' +
            '    inner join	ins_elementogrupo grp on grp.n_idins_elementogrupo = esp.n_idins_elementogrupo and grp.n_borrado = 0 \n\r' +
            '    inner join	ins_elementoprocedencia pro on pro.n_idins_elementoprocedencia = e.n_idins_elementoprocedencia and pro.n_borrado = 0 \n\r' +
            '    left outer join	mnt_elementoatributos ea on ea.n_idmnt_elemento = e.n_idmnt_elemento and ea.n_borrado = 0 \n\r' +
            '    left outer join	ins_atributos atr on atr.n_idins_atributos = ea.n_idins_atributos and atr.n_borrado = 0 \n\r' +
            'where \n\r' +
            '    ele.n_borrado = 0 \n\r' +

            '       and (pr.n_idgen_departamento = ' + n_idgen_departamento + ' or ' + n_idgen_departamento + ' = 0) \n\r' +
            '       and (pr.n_idgen_provincia = ' + n_idgen_provincia + ' or ' + n_idgen_provincia + ' = 0) \n\r' +
            '       and (di.n_idgen_distrito = ' + n_idgen_distrito + ' or ' + n_idgen_distrito + ' = 0) \n\r' +
            '       and (cp.n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or ' + n_idgen_centropoblado + ' = 0) \n\r' +
            '       and (ps.n_idgen_periodo = ' + n_idgen_periodo + ' or ' + n_idgen_periodo + ' = 0) \n\r' +
            '       and (ps.n_idgen_tipoprograma = ' + n_idgen_tipoprograma + ' or ' + n_idgen_tipoprograma + ' = 0) \n\r' +
            '       and (us.n_idgen_entidad = ' + n_idgen_entidad + ' or ' + n_idgen_entidad + ' = 0) \n\r' +
            '       and (ps.n_idseg_user = ' + n_idseg_user + ' or ' + n_idseg_user + ' = 0) \n\r' +
            '       and (sfv.n_idmnt_sistemafotovoltaico = ' + n_idmnt_sistemafotovoltaico + ' or ' + n_idmnt_sistemafotovoltaico + ' = 0) \n\r' +

            '    and grp.c_subgrupo = \'Componente\' \n\r' +
        
            'order by \n\r' +
            '    grp.c_subgrupo, \n\r' +
            '    grp.c_valor';

        pool.query(cadena
            , (error, results) => {
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

const getRespuesta = (request, response) => {
    var obj = valida.validaToken(request)

    let n_idmnt_sistemafotovoltaico = request.body.n_idmnt_sistemafotovoltaico;

    if (obj.estado) {
        let cadena =
            '   select \n\r' +
            '       s.n_idmnt_sistemafotovoltaico, \n\r' +
            '       min(case when p.c_codigo = \'901\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p1, \n\r' +
            '       --- trabajo a ejecutarse \n\r' +
            '       min(case when p.c_codigo = \'101\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p2, \n\r' +
            '       min(case when p.c_codigo = \'102\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p3, \n\r' +
            '       min(case when p.c_codigo = \'103\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p4, \n\r' +
            '       min(case when p.c_codigo = \'104\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p5, \n\r' +
            '       min(case when p.c_codigo = \'105\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p6, \n\r' +
            '       --- trabajos realizados en el panel \n\r' +
            '       min(case when p.c_codigo = \'201\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p7, \n\r' +
            '       min(case when p.c_codigo = \'202\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p8, \n\r' +
            '       min(case when p.c_codigo = \'203\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p9, \n\r' +
            '       min(case when p.c_codigo = \'204\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p10, \n\r' +
            '       min(case when p.c_codigo = \'205\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p11, \n\r' +
            '       min(case when p.c_codigo = \'206\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p12, \n\r' +
            '       min(case when p.c_codigo = \'207\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p13, \n\r' +
            '       min(case when p.c_codigo = \'208\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p14, \n\r' +
            '       min(case when p.c_codigo = \'209\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p15, \n\r' +
            '       min(case when p.c_codigo = \'210\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p16, \n\r' +
            '       min(case when p.c_codigo = \'211\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p17, \n\r' +
            '       --- trabajos realizados en la bateria \n\r' +
            '       min(case when p.c_codigo = \'301\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p18, \n\r' +
            '       min(case when p.c_codigo = \'302\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p19, \n\r' +
            '       min(case when p.c_codigo = \'303\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p20, \n\r' +
            '       min(case when p.c_codigo = \'304\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p21, \n\r' +
            '       min(case when p.c_codigo = \'305\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p22, \n\r' +
            '       --- trabajos realizados en el controlador \n\r' +
            '       min(case when p.c_codigo = \'401\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p23, \n\r' +
            '       min(case when p.c_codigo = \'402\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p24, \n\r' +
            '       min(case when p.c_codigo = \'403\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p25, \n\r' +
            '       min(case when p.c_codigo = \'404\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p26, \n\r' +
            '       min(case when p.c_codigo = \'405\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p27, \n\r' +
            '       min(case when p.c_codigo = \'406\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p28,  \n\r' +
            '       min(case when p.c_codigo = \'407\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p29, \n\r' +
            '       --- trabajos realizados en las lamparas \n\r' +
            '       min(case when p.c_codigo = \'501\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p30, \n\r' +
            '       min(case when p.c_codigo = \'502\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p31, \n\r' +
            '       min(case when p.c_codigo = \'503\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p32, \n\r' +
            '       --- instalaciones internas \n\r' +
            '       min(case when p.c_codigo = \'601\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p33, \n\r' +
            '       min(case when p.c_codigo = \'602\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p34, \n\r' +
            '       min(case when p.c_codigo = \'603\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p35, \n\r' +
            '       min(case when p.c_codigo = \'604\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p36 \n\r' +
            '   from \n\r' +
            '       mnt_sistemafotovoltaico s \n\r' +
            '   left outer join mnt_respuesta r on r.n_idmnt_sistemafotovoltaico = s.n_idmnt_sistemafotovoltaico and r.n_borrado = 0 \n\r' +
            '   left outer join mnt_pregunta p on p.n_idmnt_pregunta = r.n_idmnt_pregunta and p.n_borrado = 0 \n\r' +
            '   where \n\r' +
            '       s.n_borrado = 0 \n\r' +
            '       and s.n_idmnt_sistemafotovoltaico = ' + n_idmnt_sistemafotovoltaico + ' \n\r' +
            '   group by \n\r' +
            '       s.n_idmnt_sistemafotovoltaico;';

        pool.query(cadena
            , (error, results) => {
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

const getDepartamento = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from gen_departamento where n_borrado = 0',
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
const getProvincia = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from gen_provincia where (n_idgen_departamento =$1 or 0 =$1)  and n_borrado = 0', [request.body.n_idgen_departamento],
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

const getDistrito = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from gen_distrito where (n_idgen_provincia =$1 or 0 =$1)  and n_borrado = 0', [request.body.n_idgen_provincia],
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

const getCentroPoblado = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from gen_centropoblado where (n_idgen_distrito =$1 or 0 =$1) and n_borrado = 0', [request.body.n_idgen_distrito],
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

const getEntidad = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select * from gen_entidad where n_borrado = 0',
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


const getdetalle = (request, response) => {
    console.log(request.body);
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let cadena = 'select distinct * from vw_detallesistemafotovoltaico where n_idmnt_sistemafotovoltaico = $1';
        pool.query(cadena, [request.body.n_idmnt_sistemafotovoltaico],
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

const getDetalleReclamo = (request, response) => {
    console.log(request.body);
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let cadena = 'select distinct * from vw_detallereclamo where n_idrec_reclamo = $1';
        pool.query(cadena, [request.body.n_idrec_reclamo],
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
const getMotivoReclamo = (request, response) => {
    console.log(request.body);
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let cadena = 'select * from vw_motivoreclamo where n_idrec_reclamo = $1';
        pool.query(cadena, [request.body.n_idrec_reclamo],
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

const getxls = (request, response) => {
    var obj = valida.validaToken(request)
    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_entidad = request.body.n_idgen_entidad;

    if (obj.estado) {
        let cadena = 'with detalle as  \n\r' +
            '(    \n\r' +
            ' SELECT * FROM crosstab(\'select distinct n_idenc_encuesta, n_tipo,\'\'X\'\' c_tipo from vw_detalleencuesta order by 1\', \n\r' +
            '                   \'select m from generate_series(1,11) m\') AS   \n\r' +
            'ct(n_idenc_encuesta int, \n\r ' +
            '"Con redes eléctricas" text,  \n\r' +
            '"Con Panel Solar" text,   \n\r' +
            '"Con Central Fotovoltaica (SFC)" text,   \n\r' +
            '"Con Grupo electrógeno (Térmico)" text,   \n\r' +
            '"Sistema Eólico (Viento)" text,  \n\r' +
            '"Otro tipo de equipos" text,   \n\r' +
            '"No existen redes de MT y BT" text,   ' +
            '"Sin embargo, existen redes de Media Tensión" text,  \n\r ' +
            '"Sin embargo, existen redes de Baja Tensión" text,  \n\r' +
            '"Mi instalación tiene problemas" text,  \n\r ' +
            '"No deseo el servicio" text) )    ' +
            'select    \n\r ' +
            'c_codigo "Código",  ' +
            'c_departamento "Departamento", \n\r ' +
            'c_provincia "Provincia", \n\r' +
            'c_distrito "Distrito", \n\r' +
            'c_centropoblado "Centro Poblado", \n\r' +
            'c_latitud "Latitud",  \n\r' +
            'c_longitud "Longitud",  \n\r' +
            'n_precision "Precisión", \n\r' +
            'n_altitud "Altura", \n\r' +
            ' c_username "Usuario", ' +
            'd_fecha "Fecha de Registro", \n\r' +
            'c_dni "DNI",  c_nombres "Nombres",  \n\r' +
            'c_appaterno "Apellido Paterno", \n\r' +
            'c_apmaterno "Apellido Materno", \n\r' +
            '"Con redes eléctricas" ,  \n\r' +
            ' "Con Panel Solar",  \n\r' +
            ' "Con Central Fotovoltaica (SFC)" ,  ' +
            '"Con Grupo electrógeno (Térmico)" ,  ' +
            '"Sistema Eólico (Viento)" , ' +
            '"Otro tipo de equipos" ,  \n\r' +
            '"No existen redes de MT y BT" ,  \n\r' +
            '"Sin embargo, existen redes de Media Tensión" ,  \n\r' +
            '"Sin embargo, existen redes de Baja Tensión" ,  \n\r' +
            '"Mi instalación tiene problemas" ,  \n\r' +
            '"No deseo el servicio"  \n\r' +
            'from vw_encuesta e    \n\r' +
            'inner join detalle d on e.n_idenc_encuesta = d.n_idenc_encuesta  \n\r' +

            'where (n_idgen_departamento = ' + n_idgen_departamento + ' or 0 = ' + n_idgen_departamento + ') \n\r' +
            'and (n_idgen_provincia = ' + n_idgen_provincia + ' or 0 = ' + n_idgen_provincia + ') \n\r' +
            'and (n_idgen_distrito= ' + n_idgen_distrito + ' or 0 = ' + n_idgen_distrito + ') \n\r' +
            'and (n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or 0 =  ' + n_idgen_centropoblado + ') \n\r' +
            'and (n_idgen_entidad = ' + n_idgen_entidad + ' or 0 = ' + n_idgen_entidad + ') \n\r' +
            'order by e.c_departamento,e.c_provincia,e.c_distrito,e.c_centropoblado,e.d_fecha asc ';
        pool.query(cadena
            , (error, results) => {
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

const getDataFormato = (request, response) => {
    console.log(request.body);
    var obj = valida.validaToken(request)

    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_entidad = request.body.n_idgen_entidad;
    let n_idgen_periodo = request.body.n_idgen_periodo;
    let n_idseg_user = request.body.n_idseg_user;
    let n_idgen_mantenimiento = request.body.n_idgen_tipoprograma;
    let n_idmnt_sistemafotovoltaico = request.body.n_idmnt_sistemafotovoltaico;
    let n_modulo = request.body.n_modulo;

    if (obj.estado) {
        let cadena = 'select * from vw_sistemafotovoltaico ' +
            'where (n_idgen_departamento = ' + n_idgen_departamento + ' or 0 = ' + n_idgen_departamento + ') ' +
            'and (n_idgen_provincia = ' + n_idgen_provincia + ' or 0 = ' + n_idgen_provincia + ') ' +
            'and (n_idgen_distrito= ' + n_idgen_distrito + ' or 0 = ' + n_idgen_distrito + ') ' +
            'and (n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or 0 =  ' + n_idgen_centropoblado + ') ' +
            'and (n_idgen_periodo = ' + n_idgen_periodo + ' or 0 =  ' + n_idgen_periodo + ') ' +
            'and (n_idseg_user = ' + n_idseg_user + ' or 0 =  ' + n_idseg_user + ') ' +
            'and (n_idgen_tipoprograma = ' + n_idgen_mantenimiento + ' or 0 =  ' + n_idgen_mantenimiento + ') ' +
            'and (n_idmnt_sistemafotovoltaico = ' + n_idmnt_sistemafotovoltaico + ' or 0 =  ' + n_idmnt_sistemafotovoltaico + ') ' +
            'and (n_idgen_entidad = ' + n_idgen_entidad + ' or 0 = ' + n_idgen_entidad + ') ' +
            'and (n_modulo = ' + n_modulo + ' or 0 = ' + n_modulo + ') ';
        console.log(cadena);
            pool.query(cadena
            , (error, results) => {
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

const getRespuestaAll = (request, response) => {
    var obj = valida.validaToken(request)

    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_periodo = request.body.n_idgen_periodo;
    let n_idgen_tipoprograma = request.body.n_idgen_tipoprograma;
    let n_idgen_entidad = request.body.n_idgen_entidad;
    let n_idseg_user = request.body.n_idseg_user;
    let n_idmnt_sistemafotovoltaico = request.body.n_idmnt_sistemafotovoltaico;

    if (obj.estado) {
        let cadena =
            '   select \n\r' +
            '       s.n_idmnt_sistemafotovoltaico, \n\r' +
            '       min(case when p.c_codigo = \'901\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p1, \n\r' +
            '       --- trabajo a ejecutarse \n\r' +
            '       min(case when p.c_codigo = \'101\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p2, \n\r' +
            '       min(case when p.c_codigo = \'102\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p3, \n\r' +
            '       min(case when p.c_codigo = \'103\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p4, \n\r' +
            '       min(case when p.c_codigo = \'104\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p5, \n\r' +
            '       min(case when p.c_codigo = \'105\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p6, \n\r' +
            '       --- trabajos realizados en el panel \n\r' +
            '       min(case when p.c_codigo = \'201\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p7, \n\r' +
            '       min(case when p.c_codigo = \'202\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p8, \n\r' +
            '       min(case when p.c_codigo = \'203\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p9, \n\r' +
            '       min(case when p.c_codigo = \'204\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p10, \n\r' +
            '       min(case when p.c_codigo = \'205\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p11, \n\r' +
            '       min(case when p.c_codigo = \'206\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p12, \n\r' +
            '       min(case when p.c_codigo = \'207\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p13, \n\r' +
            '       min(case when p.c_codigo = \'208\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p14, \n\r' +
            '       min(case when p.c_codigo = \'209\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p15, \n\r' +
            '       min(case when p.c_codigo = \'210\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p16, \n\r' +
            '       min(case when p.c_codigo = \'211\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p17, \n\r' +
            '       --- trabajos realizados en la bateria \n\r' +
            '       min(case when p.c_codigo = \'301\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p18, \n\r' +
            '       min(case when p.c_codigo = \'302\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p19, \n\r' +
            '       min(case when p.c_codigo = \'303\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p20, \n\r' +
            '       min(case when p.c_codigo = \'304\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p21, \n\r' +
            '       min(case when p.c_codigo = \'305\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p22, \n\r' +
            '       --- trabajos realizados en el controlador \n\r' +
            '       min(case when p.c_codigo = \'401\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p23, \n\r' +
            '       min(case when p.c_codigo = \'402\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p24, \n\r' +
            '       min(case when p.c_codigo = \'403\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p25, \n\r' +
            '       min(case when p.c_codigo = \'404\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p26, \n\r' +
            '       min(case when p.c_codigo = \'405\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p27, \n\r' +
            '       min(case when p.c_codigo = \'406\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p28,  \n\r' +
            '       min(case when p.c_codigo = \'407\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p29, \n\r' +
            '       --- trabajos realizados en las lamparas \n\r' +
            '       min(case when p.c_codigo = \'501\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p30, \n\r' +
            '       min(case when p.c_codigo = \'502\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p31, \n\r' +
            '       min(case when p.c_codigo = \'503\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p32, \n\r' +
            '       --- instalaciones internas \n\r' +
            '       min(case when p.c_codigo = \'601\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p33, \n\r' +
            '       min(case when p.c_codigo = \'602\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p34, \n\r' +
            '       min(case when p.c_codigo = \'603\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p35, \n\r' +
            '       min(case when p.c_codigo = \'604\' then case when r.b_respuesta = true then 1 else 0 end else 2 end) p36 \n\r' +
            '   from \n\r' +
            '       mnt_sistemafotovoltaico s \n\r' +
            '   inner join	gen_programa ps on ps.n_idgen_programa = s.n_idgen_programa and ps.n_borrado = 0 \n\r' +
            '   inner join	gen_sistemafotovoltaico s2 on s2.n_idgen_sistemafotovoltaico = ps.n_idgen_sistemafotovoltaico and s2.n_borrado = 0 \n\r' +
            '   inner join	gen_centropoblado cp on cp.n_idgen_centropoblado = s2.n_idgen_centropoblado and cp.n_borrado = 0 \n\r' +
            '   inner join	gen_distrito di on di.n_idgen_distrito = cp.n_idgen_distrito and di.n_borrado = 0 \n\r' +
            '   inner join	gen_provincia pr on pr.n_idgen_provincia = di.n_idgen_provincia and pr.n_borrado = 0 \n\r' +
            '   inner join	seg_user us on us.n_idseg_user = ps.n_idseg_user and us.n_borrado = 0 \n\r' +
            '   left outer join mnt_respuesta r on r.n_idmnt_sistemafotovoltaico = s.n_idmnt_sistemafotovoltaico and r.n_borrado = 0 \n\r' +
            '   left outer join mnt_pregunta p on p.n_idmnt_pregunta = r.n_idmnt_pregunta and p.n_borrado = 0 \n\r' +
            '   where \n\r' +
            '       s.n_borrado = 0 \n\r' +
            '       and (pr.n_idgen_departamento = ' + n_idgen_departamento + ' or ' + n_idgen_departamento + ' = 0) \n\r' +
            '       and (pr.n_idgen_provincia = ' + n_idgen_provincia + ' or ' + n_idgen_provincia + ' = 0) \n\r' +
            '       and (di.n_idgen_distrito = ' + n_idgen_distrito + ' or ' + n_idgen_distrito + ' = 0) \n\r' +
            '       and (cp.n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or ' + n_idgen_centropoblado + ' = 0) \n\r' +
            '       and (ps.n_idgen_periodo = ' + n_idgen_periodo + ' or ' + n_idgen_periodo + ' = 0) \n\r' +
            '       and (ps.n_idgen_tipoprograma = ' + n_idgen_tipoprograma + ' or ' + n_idgen_tipoprograma + ' = 0) \n\r' +
            '       and (us.n_idgen_entidad = ' + n_idgen_entidad + ' or ' + n_idgen_entidad + ' = 0) \n\r' +
            '       and (ps.n_idseg_user = ' + n_idseg_user + ' or ' + n_idseg_user + ' = 0) \n\r' +
            '       and (s.n_idmnt_sistemafotovoltaico = ' + n_idmnt_sistemafotovoltaico + ' or ' + n_idmnt_sistemafotovoltaico + ' = 0) \n\r' +
            '   group by \n\r' +
            '       s.n_idmnt_sistemafotovoltaico;';

        pool.query(cadena
            , (error, results) => {
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

const getEquiposAll = (request, response) => {
    var obj = valida.validaToken(request)

    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_periodo = request.body.n_idgen_periodo;
    let n_idgen_tipoprograma = request.body.n_idgen_tipoprograma;
    let n_idgen_entidad = request.body.n_idgen_entidad;
    let n_idseg_user = request.body.n_idseg_user;
    let n_idmnt_sistemafotovoltaico = request.body.n_idmnt_sistemafotovoltaico;

    if (obj.estado) {
        let cadena = 'select \n\r' +
            '    sfv.n_idmnt_sistemafotovoltaico, \n\r' +
            '    e.n_idmnt_elemento, \n\r' +
            '    row_number() over(partition by sfv.n_idmnt_sistemafotovoltaico, grp.c_valor order by grp.c_valor, esp.c_tipo) n_fila, \n\r' +
            '    e.c_nroserie C_serie, \n\r' +
            '    case when e.b_operativo = true then 1 else 0 end b_operativo, \n\r' +
            '    grp.c_subgrupo, \n\r' +
            '    grp.c_valor c_equipo, \n\r' +
            '    esp.c_tipo, \n\r' +
            '    esp.c_marca, \n\r' +
            '    esp.c_modelo, \n\r' +
            '    pro.c_valor c_procedencia, \n\r' +
            '    e.n_aniofabricacion n_annio, \n\r' +
            '    atr.c_valor c_atributo, \n\r' +
            '    atr.c_unidad, \n\r' +
            '    COALESCE(ea.c_valor, \'\') c_valor, \n\r' +
            '    case when ele.b_retirado = true then 1 else 0 end b_retirado, \n\r' +
            '    ele.c_observacion \n\r' +
            'from \n\r' +
            '    mnt_elementosfv ele \n\r' +
            '    inner join	mnt_sistemafotovoltaico sfv on sfv.n_idmnt_sistemafotovoltaico = ele.n_idmnt_sistemafotovoltaico and sfv.n_borrado = 0 \n\r' +

            '   inner join	gen_programa ps on ps.n_idgen_programa = sfv.n_idgen_programa and ps.n_borrado = 0 \n\r' +
            '   inner join	gen_sistemafotovoltaico s2 on s2.n_idgen_sistemafotovoltaico = ps.n_idgen_sistemafotovoltaico and s2.n_borrado = 0 \n\r' +
            '   inner join	gen_centropoblado cp on cp.n_idgen_centropoblado = s2.n_idgen_centropoblado and cp.n_borrado = 0 \n\r' +
            '   inner join	gen_distrito di on di.n_idgen_distrito = cp.n_idgen_distrito and di.n_borrado = 0 \n\r' +
            '   inner join	gen_provincia pr on pr.n_idgen_provincia = di.n_idgen_provincia and pr.n_borrado = 0 \n\r' +
            '   inner join	seg_user us on us.n_idseg_user = ps.n_idseg_user and us.n_borrado = 0 \n\r' +

            '    inner join	mnt_elemento e on e.n_idmnt_elemento = ele.n_idmnt_elemento and e.n_borrado = 0 \n\r' +
            '    inner join	ins_elementoespecificacion esp on esp.n_idins_elementoespecificacion = e.n_idins_elementoespecificacion and esp.n_borrado = 0 \n\r' +
            '    inner join	ins_elementogrupo grp on grp.n_idins_elementogrupo = esp.n_idins_elementogrupo and grp.n_borrado = 0 \n\r' +
            '    inner join	ins_elementoprocedencia pro on pro.n_idins_elementoprocedencia = e.n_idins_elementoprocedencia and pro.n_borrado = 0 \n\r' +
            '    left outer join	mnt_elementoatributos ea on ea.n_idmnt_elemento = e.n_idmnt_elemento and ea.n_borrado = 0 \n\r' +
            '    left outer join	ins_atributos atr on atr.n_idins_atributos = ea.n_idins_atributos and atr.n_borrado = 0 \n\r' +
            'where \n\r' +
            '    ele.n_borrado = 0 \n\r' +
            
            '       and (pr.n_idgen_departamento = ' + n_idgen_departamento + ' or ' + n_idgen_departamento + ' = 0) \n\r' +
            '       and (pr.n_idgen_provincia = ' + n_idgen_provincia + ' or ' + n_idgen_provincia + ' = 0) \n\r' +
            '       and (di.n_idgen_distrito = ' + n_idgen_distrito + ' or ' + n_idgen_distrito + ' = 0) \n\r' +
            '       and (cp.n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or ' + n_idgen_centropoblado + ' = 0) \n\r' +
            '       and (ps.n_idgen_periodo = ' + n_idgen_periodo + ' or ' + n_idgen_periodo + ' = 0) \n\r' +
            '       and (ps.n_idgen_tipoprograma = ' + n_idgen_tipoprograma + ' or ' + n_idgen_tipoprograma + ' = 0) \n\r' +
            '       and (us.n_idgen_entidad = ' + n_idgen_entidad + ' or ' + n_idgen_entidad + ' = 0) \n\r' +
            '       and (ps.n_idseg_user = ' + n_idseg_user + ' or ' + n_idseg_user + ' = 0) \n\r' +
            '       and (sfv.n_idmnt_sistemafotovoltaico = ' + n_idmnt_sistemafotovoltaico + ' or ' + n_idmnt_sistemafotovoltaico + ' = 0) \n\r' +
            
            '    and grp.c_subgrupo = \'Equipo\' \n\r' +
            '    and grp.c_valor != \'Lámparas\' \n\r' +
            
            'order by \n\r' +
            '    grp.c_subgrupo, \n\r' +
            '    grp.c_valor';

        pool.query(cadena
            , (error, results) => {
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

const getdetalleAll = (request, response) => {
    console.log(request.body);

    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_periodo = request.body.n_idgen_periodo;
    let n_idgen_tipoprograma = request.body.n_idgen_tipoprograma;
    let n_idgen_entidad = request.body.n_idgen_entidad;
    let n_idseg_user = request.body.n_idseg_user;
    let n_idmnt_sistemafotovoltaico = request.body.n_idmnt_sistemafotovoltaico;

    var obj = valida.validaToken(request)
    if (obj.estado) {
        let cadena = '   select \n\r' +
            '       distinct f.* \n\r' +
            '   from  \n\r' +
            '       vw_detallesistemafotovoltaico f \n\r' +
            '   inner join	mnt_sistemafotovoltaico s on s.n_idmnt_sistemafotovoltaico = f.n_idmnt_sistemafotovoltaico and s.n_borrado = 0  \n\r' +
            '   inner join	gen_programa ps on ps.n_idgen_programa = s.n_idgen_programa and ps.n_borrado = 0 \n\r' +
            '   inner join	gen_sistemafotovoltaico s2 on s2.n_idgen_sistemafotovoltaico = ps.n_idgen_sistemafotovoltaico and s2.n_borrado = 0 \n\r' +
            '   inner join	gen_centropoblado cp on cp.n_idgen_centropoblado = s2.n_idgen_centropoblado and cp.n_borrado = 0 \n\r' +
            '   inner join	gen_distrito di on di.n_idgen_distrito = cp.n_idgen_distrito and di.n_borrado = 0 \n\r' +
            '   inner join	gen_provincia pr on pr.n_idgen_provincia = di.n_idgen_provincia and pr.n_borrado = 0 \n\r' +
            '   inner join	seg_user us on us.n_idseg_user = ps.n_idseg_user and us.n_borrado = 0 \n\r' +
            '   where \n\r' +
            '       (pr.n_idgen_departamento = ' + n_idgen_departamento + ' or ' + n_idgen_departamento + ' = 0) \n\r' +
            '       and (pr.n_idgen_provincia = ' + n_idgen_provincia + ' or ' + n_idgen_provincia + ' = 0) \n\r' +
            '       and (di.n_idgen_distrito = ' + n_idgen_distrito + ' or ' + n_idgen_distrito + ' = 0) \n\r' +
            '       and (cp.n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or ' + n_idgen_centropoblado + ' = 0) \n\r' +
            '       and (ps.n_idgen_periodo = ' + n_idgen_periodo + ' or ' + n_idgen_periodo + ' = 0) \n\r' +
            '       and (ps.n_idgen_tipoprograma = ' + n_idgen_tipoprograma + ' or ' + n_idgen_tipoprograma + ' = 0) \n\r' +
            '       and (us.n_idgen_entidad = ' + n_idgen_entidad + ' or ' + n_idgen_entidad + ' = 0) \n\r' +
            '       and (ps.n_idseg_user = ' + n_idseg_user + ' or ' + n_idseg_user + ' = 0) \n\r' +
            '       and (s.n_idmnt_sistemafotovoltaico = ' + n_idmnt_sistemafotovoltaico + ' or ' + n_idmnt_sistemafotovoltaico + ' = 0)';
            console.log(cadena);
            pool.query(cadena
            , (error, results) => {
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
// -------------------------------------------------------------
// RECLAMO MASIVO
// -------------------------------------------------------------
const getDataFormatoReclamo = (request, response) => {
    var obj = valida.validaToken(request)

    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_entidad = request.body.n_idgen_entidad;
    let n_idseg_usuario = request.body.n_idseg_user;
    let n_idrec_reclamo = request.body.n_idrec_reclamo;
    let dateinicio = request.body.dateinicio;
    let datefin = request.body.datefin;

    if (obj.estado) {
        let cadena = 'select \n\r' +
            '    rec.n_idrec_reclamo, \n\r' +
            '    sf.c_codigosuministro  AS c_codigo, \n\r' +
            '    d.n_idgen_departamento, \n\r' +
            '    d.c_nombre AS c_departamento, \n\r' +
            '    pr.n_idgen_provincia, \n\r' +
            '    pr.c_nombre AS c_provincia, \n\r' +
            '    di.n_idgen_distrito, \n\r' +
            '    di.c_nombre AS c_distrito, \n\r' +
            '    cp.n_idgen_centropoblado, \n\r' +
            '    cp.c_nombre AS c_centropoblado, \n\r' +
            '    rec.c_latitud, \n\r' +
            '    rec.c_longitud, \n\r' +
            '    rec.d_fecha, \n\r' +
            '    to_char(rec.d_fecha, \'dd/MM/yyyy\'::text) AS c_fecha, \n\r' +
            '    to_char(rec.d_fecha, \'HH:mm:ss\'::text) AS c_hora, \n\r' +
            '    en.n_idgen_entidad, \n\r' +
            '    en.c_name AS c_entidad, \n\r' +
            '    u.c_username, \n\r' +
            '    u.n_idseg_user, \n\r' +
            '    pe.c_nrodni AS c_dni, \n\r' +
            '    pe.c_nombres, \n\r' +
            '    pe.c_appaterno, \n\r' +
            '    pe.c_apmaterno, \n\r' +
            '    rec.c_observacion, \n\r' +
            '    u.c_name AS c_nametecnico, \n\r' +
            '    u.c_lastname AS c_lastnametecnico, \n\r' +
            '    (((u.c_name::text || \', \'::text) || u.c_lastname::text))::character varying(250) AS c_tecnico, \n\r' +
            '    u.c_documentid AS c_dnitecnico \n\r' +
            'from \n\r' +
            '    rec_reclamo rec \n\r' +
            '    JOIN gen_sistemafotovoltaico sf ON sf.n_idgen_sistemafotovoltaico = rec.n_idgen_sistemafotovoltaico AND sf.n_borrado = 0 \n\r' +
            '    JOIN gen_centropoblado cp ON cp.n_idgen_centropoblado = sf.n_idgen_centropoblado AND cp.n_borrado = 0 \n\r' +
            '    JOIN gen_distrito di ON di.n_idgen_distrito = cp.n_idgen_distrito AND di.n_borrado = 0 \n\r' +
            '    JOIN gen_provincia pr ON pr.n_idgen_provincia = di.n_idgen_provincia AND pr.n_borrado = 0 \n\r' +
            '    JOIN gen_departamento d ON d.n_idgen_departamento = pr.n_idgen_departamento AND d.n_borrado = 0 \n\r' +
            '    JOIN gen_persona pe ON pe.n_idgen_persona = sf.n_idgen_persona AND pe.n_borrado = 0 \n\r' +
            '    JOIN seg_user u ON u.n_idseg_user = rec.n_idseg_usuario AND u.n_borrado = 0 \n\r' +
            '    JOIN gen_entidad en ON en.n_idgen_entidad = u.n_idgen_entidad AND en.n_borrado = 0 \n\r' +
            '     where \n\r' +
            '       (d.n_idgen_departamento = ' + n_idgen_departamento + ' or ' + n_idgen_departamento + ' = 0) \n\r' +
            '       and (pr.n_idgen_provincia = ' + n_idgen_provincia + ' or ' + n_idgen_provincia + ' = 0) \n\r' +
            '       and (di.n_idgen_distrito = ' + n_idgen_distrito + ' or ' + n_idgen_distrito + ' = 0) \n\r' +
            '       and (cp.n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or ' + n_idgen_centropoblado + ' = 0) \n\r' +
            '       and (en.n_idgen_entidad = ' + n_idgen_entidad + ' or ' + n_idgen_entidad + ' = 0) \n\r' +
            '       and (u.n_idseg_user = ' + n_idseg_usuario + ' or ' + n_idseg_usuario + ' = 0) \n\r' +
            '       and (rec.n_idrec_reclamo = ' + n_idrec_reclamo + ' or ' + n_idrec_reclamo + ' = 0) \n\r' +
            '       and (\'null\' = \''+dateinicio+'\' or d_fechacrea between to_timestamp(\''+dateinicio+'\', \'yyyy/mm/dd\') and to_timestamp(\''+datefin+'\', \'yyyy/mm/dd\')) \r\n';
            console.log(cadena);
            pool.query(cadena
            , (error, results) => {
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

const getdetalleReclamoAll = (request, response) => {
    console.log(request.body);

    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_entidad = request.body.n_idgen_entidad;
    let n_idseg_usuario = request.body.n_idseg_user;
    let n_idrec_reclamo = request.body.n_idrec_reclamo;
    let dateinicio = request.body.dateinicio;
    let datefin = request.body.datefin;

    var obj = valida.validaToken(request);

    if (obj.estado) {
        let cadena = '   select \n\r' +
            '       distinct r.* \n\r' +
            '   from  \n\r' +
            '       vw_detallereclamo r \n\r' +
            '   inner join   rec_reclamo rec on rec.n_idrec_reclamo = r.n_idrec_reclamo and rec.n_borrado = 0  \n\r' +
            '   inner join   gen_sistemafotovoltaico sf on sf.n_idgen_sistemafotovoltaico = rec.n_idgen_sistemafotovoltaico and sf.n_borrado = 0 \n\r' +
            '   inner join   gen_centropoblado cp on cp.n_idgen_centropoblado = sf.n_idgen_centropoblado and cp.n_borrado = 0 \n\r' +
            '   inner join   gen_distrito di on di.n_idgen_distrito = cp.n_idgen_distrito and di.n_borrado = 0 \n\r' +
            '   inner join   gen_provincia pr on pr.n_idgen_provincia = di.n_idgen_provincia and pr.n_borrado = 0 \n\r' +
            '   inner join   seg_user us on us.n_idseg_user = rec.n_idseg_usuario and us.n_borrado = 0 \n\r' +
            '   where \n\r' +
            '       (pr.n_idgen_departamento = ' + n_idgen_departamento + ' or ' + n_idgen_departamento + ' = 0) \n\r' +
            '       and (pr.n_idgen_provincia = ' + n_idgen_provincia + ' or ' + n_idgen_provincia + ' = 0) \n\r' +
            '       and (di.n_idgen_distrito = ' + n_idgen_distrito + ' or ' + n_idgen_distrito + ' = 0) \n\r' +
            '       and (cp.n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or ' + n_idgen_centropoblado + ' = 0) \n\r' +
            '       and (us.n_idgen_entidad = ' + n_idgen_entidad + ' or ' + n_idgen_entidad + ' = 0) \n\r' +
            '       and (rec.n_idseg_usuario = ' + n_idseg_usuario + ' or ' + n_idseg_usuario + ' = 0) \n\r' +
            '       and (rec.n_idrec_reclamo = ' + n_idrec_reclamo + ' or ' + n_idrec_reclamo + ' = 0) \n\r' +
            '       and (\'null\' = \''+dateinicio+'\' or d_fechacrea between to_timestamp(\''+dateinicio+'\', \'yyyy/mm/dd\') and to_timestamp(\''+datefin+'\', \'yyyy/mm/dd\')) \r\n';
            pool.query(cadena
            , (error, results) => {
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

const getdetalleRepartoAll = (request, response) => {
    console.log(request.body);

    let n_idgen_departamento = request.body.n_idgen_departamento;
    let n_idgen_provincia = request.body.n_idgen_provincia;
    let n_idgen_distrito = request.body.n_idgen_distrito;
    let n_idgen_centropoblado = request.body.n_idgen_centropoblado;
    let n_idgen_periodo = request.body.n_idgen_periodo;
    let n_idgen_entidad = request.body.n_idgen_entidad;
    let n_idseg_user = request.body.n_idseg_user;
    let n_idrep_reparto = request.body.n_idrep_reparto;
    let dateinicio = request.body.dateinicio;
    let datefin = request.body.datefin;
    
    var obj = valida.validaToken(request)
    if (obj.estado) {
        let cadena = '   select \n\r' +
            '       distinct r.* \n\r' +
            '   from  \n\r' +
            '       vw_detallereparto r \n\r' +
            '   inner join   rep_reparto rep on rep.n_idrep_reparto = r.n_idrep_reparto and rep.n_borrado = 0  \n\r' +
            '   inner join   gen_programa ps on ps.n_idgen_programa = rep.n_idgen_programa and ps.n_borrado = 0 \n\r' +
            '   inner join   gen_sistemafotovoltaico s2 on s2.n_idgen_sistemafotovoltaico = ps.n_idgen_sistemafotovoltaico and s2.n_borrado = 0 \n\r' +
            '   inner join   gen_centropoblado cp on cp.n_idgen_centropoblado = s2.n_idgen_centropoblado and cp.n_borrado = 0 \n\r' +
            '   inner join   gen_distrito di on di.n_idgen_distrito = cp.n_idgen_distrito and di.n_borrado = 0 \n\r' +
            '   inner join   gen_provincia pr on pr.n_idgen_provincia = di.n_idgen_provincia and pr.n_borrado = 0 \n\r' +
            '   inner join   seg_user us on us.n_idseg_user = ps.n_idseg_user and us.n_borrado = 0 \n\r' +
            '   where \n\r' +
            '       (pr.n_idgen_departamento = ' + n_idgen_departamento + ' or ' + n_idgen_departamento + ' = 0) \n\r' +
            '       and (pr.n_idgen_provincia = ' + n_idgen_provincia + ' or ' + n_idgen_provincia + ' = 0) \n\r' +
            '       and (di.n_idgen_distrito = ' + n_idgen_distrito + ' or ' + n_idgen_distrito + ' = 0) \n\r' +
            '       and (cp.n_idgen_centropoblado = ' + n_idgen_centropoblado + ' or ' + n_idgen_centropoblado + ' = 0) \n\r' +
            '       and (ps.n_idgen_periodo = ' + n_idgen_periodo + ' or ' + n_idgen_periodo + ' = 0) \n\r' +
            '       and (us.n_idgen_entidad = ' + n_idgen_entidad + ' or ' + n_idgen_entidad + ' = 0) \n\r' +
            '       and (ps.n_idseg_user = ' + n_idseg_user + ' or ' + n_idseg_user + ' = 0) \n\r' +
            '       and (rep.n_idrep_reparto = ' + n_idrep_reparto + ' or ' + n_idrep_reparto + ' = 0) \n\r' +
            '       and (\'null\' = \''+dateinicio+'\' or d_fechacrea between to_timestamp(\''+dateinicio+'\', \'yyyy/mm/dd\') and to_timestamp(\''+datefin+'\', \'yyyy/mm/dd\')) \r\n';
            pool.query(cadena
            , (error, results) => {
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
const getxlsReparto = (request, response) => {
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
        pool.query(cadena
            , (error, results) => {
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

//---------------------------------------------
// CORTE - RECONEXION
//---------------------------------------------
const getCnxCausa = (request, response) => {
    var obj = valida.validaToken(request)

    let n_idmnt_sistemafotovoltaico = request.body.n_idmnt_sistemafotovoltaico;
    let n_modulo = request.body.n_modulo;

    if (obj.estado) {
        let cadena = 'select \n\r' +
            '    c.n_idcnx_causa, \n\r' +
            '    c.n_idmnt_sistemafotovoltaico, \n\r' +
            '    c.n_idrec_motivo, \n\r' +
            '    m.c_descripcion, \n\r' +
            '    m.n_modulo \n\r' +
            'from \n\r' +
            '    cnx_causa c \n\r' +
            '    inner join rec_motivo m on c.n_idrec_motivo = m.n_idrec_motivo and c.n_borrado = 0 \n\r' +
            '     where \n\r' +
            '       (m.n_modulo = ' + n_modulo + ' or ' + n_modulo + ' = 0) \n\r' +
            '       and (c.n_idmnt_sistemafotovoltaico = ' + n_idmnt_sistemafotovoltaico + ' or ' + n_idmnt_sistemafotovoltaico + ' = 0) \r\n';
            console.log(cadena);
            pool.query(cadena
            , (error, results) => {
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
const getEquiposRoboSuministro = (request, response) => {
    var obj = valida.validaToken(request)
 
    let n_idmnt_sistemafotovoltaico = request.body.n_idmnt_sistemafotovoltaico;

    if (obj.estado) {
        let cadena = 'select \n\r' +
            '    mnt.n_idmnt_sistemafotovoltaico, \n\r' +
            '    elesfv.c_observacion, \n\r' +
            '    eleg.n_idins_elementogrupo, \n\r' +
            '    eleg.c_valor \n\r' +
            'from \n\r' +
            '    mnt_sistemafotovoltaico mnt \n\r' +
            '   join mnt_elementosfv elesfv on mnt.n_idmnt_sistemafotovoltaico = elesfv.n_idmnt_sistemafotovoltaico and elesfv.n_borrado = 0 \n\r' +
            '   join mnt_elemento ele on ele.n_idmnt_elemento = elesfv.n_idmnt_elemento and ele.n_borrado = 0 \n\r' +
            '   join ins_elementoespecificacion eleesp on eleesp.n_idins_elementoespecificacion = ele.n_idins_elementoespecificacion and eleesp.n_borrado = 0 \n\r' +
            '   join ins_elementogrupo eleg on eleg.n_idins_elementogrupo = eleesp.n_idins_elementogrupo and eleg.n_borrado = 0 \n\r' +
            'where \n\r' +
            '    elesfv.b_robado = true \n\r' +
            '       and (mnt.n_idmnt_sistemafotovoltaico = ' + n_idmnt_sistemafotovoltaico + ' or ' + n_idmnt_sistemafotovoltaico + ' = 0) \n\r' +
            'order by \n\r' +
            '    eleg.n_idins_elementogrupo';
        console.log(cadena);
        pool.query(cadena
            , (error, results) => {
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

module.exports = {
    get,
    getxls,
    getDepartamento,
    getProvincia,
    getDistrito,
    getCentroPoblado,
    getEntidad,
    getdetalle,
    getRespuesta,
    getLamparas,
    getEquipos,
    getComponentes,
    getReclamo,
    getDetalleReclamo,
    getReclamosGrilla,
    getMotivoReclamo,
    getDataFormato,
    getRespuestaAll,
    getEquiposAll,
    getdetalleAll,
    getLamparasAll,
    getComponentesAll,
    getDataFormatoReclamo,
    getdetalleReclamoAll,
    getdetalleRepartoAll,
    getxlsReparto,
    getCnxCausa,
    getEquiposRoboSuministro
}
