const cnx = require('../common/appsettings')
const valida = require('../common/validatoken')
let pool = cnx.pool;

const getFecha = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select c_periodo, count(n_idmnt_sistemafotovoltaico) cantidad from vw_sistemafotovoltaico group by (c_periodo, n_annio,n_mes) order by n_annio, n_mes',
            (error, results) => {
                if (error) {
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                } else {
                    
                    let fechas =[];
                    let cantidades =[];

                    let datos= results.rows;


                    datos.forEach(element => {
                        fechas.push(element.c_periodo);
                        cantidades.push( parseInt(element.cantidad));
                    });

                    response.status(200).json({ estado: true, mensaje: "", data: {fechas:fechas,cantidades:cantidades} })
                }
            })
    } else {
        response.status(200).json(obj)
    }
}

const getDepartamento = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select c_departamento, count(n_idmnt_sistemafotovoltaico) cantidad from vw_sistemafotovoltaico group by (c_departamento)',
            (error, results) => {
                if (error) {
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                } else {
                    
                    let departamentos =[];
                    let cantidades =[];

                    let datos= results.rows;


                    datos.forEach(element => {
                        departamentos.push(element.c_departamento);
                        cantidades.push( parseInt(element.cantidad));
                    });

                    response.status(200).json({ estado: true, mensaje: "", data: {departamentos:departamentos,cantidades:cantidades} })
                }
            })
    } else {
        response.status(200).json(obj)
    }
}

const getTipoMantenimiento = (request, response) => {
    var obj = valida.validaToken(request)
    if (obj.estado) {
        pool.query('select c_tipo_nombre, count(n_idmnt_sistemafotovoltaico) cantidad from vw_sistemafotovoltaico group by (c_tipo_nombre)',
            (error, results) => {
                if (error) {
                    response.status(200).json({ estado: false, mensaje: "DB: error!.", data: null })
                } else {
                    
                    let tiposmantenimientos =[];
                    let cantidades =[];

                    let datos= results.rows;


                    datos.forEach(element => {
                        tiposmantenimientos.push(element.c_tipo_nombre);
                        cantidades.push( parseInt(element.cantidad));
                    });

                    response.status(200).json({ estado: true, mensaje: "", data: {tiposmantenimientos:tiposmantenimientos,cantidades:cantidades} })
                }
            })
    } else {
        response.status(200).json(obj)
    }
}
module.exports = {
    getFecha,
    getDepartamento,
    getTipoMantenimiento
}

