const express = require('express')
var jwt = require('jsonwebtoken')
var bodyParser = require('body-parser')
var cors = require('cors');

const dbSeguridad = require('./dal/seguridad')
const dbGeneral = require('./dal/general')
const dbMapa = require('./dal/mapa')
const dbDashboard = require('./dal/dashboard')
const dbMovil = require('./dal/movil')

const app = express()
const port = 3000


app.use(bodyParser.json({ limit: '1000mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '1000mb' }));

app.use(cors());
app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: true,
    })
)

var customParser = bodyParser.json({
    type: function (req) {
        req.headers['content-type'] === '*/*; charset=UTF-8'
    }
})

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.use('/static', express.static(__dirname + '/fotos/encuesta'));



/* General */
app.post('/api/general/getdocente', dbGeneral.getDocente)
app.post('/api/general/deletedocente', dbGeneral.deleteDocente)
app.post('/api/general/savedocente', dbGeneral.saveDocente)
app.post('/api/general/getcatalogo', dbGeneral.getCatalogo)
app.post('/api/general/deletecatalogo', dbGeneral.deleteCatalogo)
app.post('/api/general/savecatalogo', dbGeneral.saveCatalogo)
app.post('/api/general/getusuario', dbGeneral.getUsuario)
app.post('/api/general/deleteusuario', dbGeneral.deleteUsuario)
app.post('/api/general/saveusuario', dbGeneral.saveUsuario)



























// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------------------------

/* Seguridad */
app.post('/api/seguridad/login', dbSeguridad.login)
app.post('/api/seguridad/get', dbSeguridad.get)
app.post('/api/seguridad/getrole', dbSeguridad.getrole)
app.post('/api/seguridad/save', dbSeguridad.save)
app.post('/api/seguridad/resetearclave', dbSeguridad.resetearclave)

















app.post('/api/general/get', dbGeneral.get)
app.post('/api/general/save', dbGeneral.save)
app.post('/api/general/delete', dbGeneral.deleteEntidad)
app.post('/api/general/getusuarioubigeo', dbGeneral.getUsuarioUbigeo)
app.post('/api/general/getperiodo', dbGeneral.getPeriodo)
app.post('/api/general/saveusuarioubigeo', dbGeneral.saveUsuarioUbigeo)
app.post('/api/general/deleteusuarioubigeo', dbGeneral.deleteUsuarioUbigeo)
app.post('/api/general/getmantenimiento', dbGeneral.getMantenimiento)
app.post('/api/general/asignartodo', dbGeneral.asignartodo)
app.post('/api/general/getperiodoforedit', dbGeneral.getPeriodoForEdit)
app.post('/api/general/deleteperiodo', dbGeneral.deletePeriodo)
app.post('/api/general/saveperiodo', dbGeneral.savePeriodo)
app.post('/api/general/getlocalizationforedit', dbGeneral.getLocalizationForEdit)
app.post('/api/general/deletelocalization', dbGeneral.deleteLocalization)
app.post('/api/general/savelocalization', dbGeneral.saveLocalization)
app.post('/api/general/getunidadservicioforedit', dbGeneral.getUnidadServicioForEdit)
app.post('/api/general/deleteunidadservicio', dbGeneral.deleteUnidadServicio)
app.post('/api/general/saveunidadservicio', dbGeneral.saveUnidadServicio)
app.post('/api/general/gettipoimagen', dbGeneral.getTipoImagenForEdit)
app.post('/api/general/deletetipoimagen', dbGeneral.deleteTipoImagen)
app.post('/api/general/savetipoimagen', dbGeneral.saveTipoImagen)
app.post('/api/general/getelementoprocedenciaforedit', dbGeneral.getElementoProcedenciaForEdit)
app.post('/api/general/deleteelementoprocedencia', dbGeneral.deleteElementoProcedencia)
app.post('/api/general/saveelementoprocedencia', dbGeneral.saveElementoProcedencia)
app.post('/api/general/getelementogrupoforedit', dbGeneral.getElementoGrupoForEdit)
app.post('/api/general/deleteelementogrupo', dbGeneral.deleteElementoGrupo)
app.post('/api/general/saveelementogrupo', dbGeneral.saveElementoGrupo)
app.post('/api/general/getelementoespecificacionforedit', dbGeneral.getElementoEspecificacionForEdit)
app.post('/api/general/deleteelementoespecificacion', dbGeneral.deleteElementoEspecificacion)
app.post('/api/general/saveelementoespecificacion', dbGeneral.saveElementoEspecificacion)
app.post('/api/general/gettipoforespecificacion', dbGeneral.getTipoForEspecificacion)
app.post('/api/general/getmarcaforespecificacion', dbGeneral.getMarcaForEspecificacion)
app.post('/api/general/getmodeloforespecificacion', dbGeneral.getModeloForEspecificacion)
app.post('/api/general/getsoportetipoforedit', dbGeneral.getSoporteTipoForEdit)
app.post('/api/general/deletesoportetipo', dbGeneral.deleteSoporteTipo)
app.post('/api/general/savesoportetipo', dbGeneral.saveSoporteTipo)
app.post('/api/general/getatributoforedit', dbGeneral.getAtributoForEdit)
app.post('/api/general/deleteatributo', dbGeneral.deleteAtributo)
app.post('/api/general/saveatributo', dbGeneral.saveAtributo)
app.post('/api/general/gettipocorteforedit', dbGeneral.getTipoCorteForEdit)
app.post('/api/general/deletetipocorte', dbGeneral.deleteTipoCorte)
app.post('/api/general/savetipocorte', dbGeneral.saveTipoCorte)
app.post('/api/general/gettiposfvforedit', dbGeneral.getTipoSFVForEdit)
app.post('/api/general/deletetiposfv', dbGeneral.deleteTipoSFV)
app.post('/api/general/savetiposfv', dbGeneral.saveTipoSFV)
app.post('/api/general/getmoduloforedit', dbGeneral.getModuloForEdit)
app.post('/api/general/deletemodulo', dbGeneral.deleteModulo)
app.post('/api/general/savemodulo', dbGeneral.saveModulo)
app.post('/api/general/getreparto', dbGeneral.getReparto)
app.post('/api/general/imprimirreparto', dbGeneral.imprimirReparto)
app.post('/api/general/getdetallereparto', dbGeneral.getDetalleReparto)




/* Mapa */
app.post('/api/mapa/get', dbMapa.get)
app.post('/api/mapa/getxls', dbMapa.getxls)
app.post('/api/mapa/getdepartamento', dbMapa.getDepartamento)
app.post('/api/mapa/getprovincia', dbMapa.getProvincia)
app.post('/api/mapa/getdistrito', dbMapa.getDistrito)
app.post('/api/mapa/getcentropoblado', dbMapa.getCentroPoblado)
app.post('/api/mapa/getentidad', dbMapa.getEntidad)
app.post('/api/mapa/getdetalle', dbMapa.getdetalle)
app.post('/api/mapa/getrespuesta', dbMapa.getRespuesta)
app.post('/api/mapa/getlamparas', dbMapa.getLamparas)
app.post('/api/mapa/getequipos', dbMapa.getEquipos)
app.post('/api/mapa/getcomponentes', dbMapa.getComponentes)
app.post('/api/mapa/getreclamo', dbMapa.getReclamo)
app.post('/api/mapa/getdetallereclamo', dbMapa.getDetalleReclamo)
app.post('/api/mapa/getreclamosgrilla', dbMapa.getReclamosGrilla)
app.post('/api/mapa/getmotivoreclamo', dbMapa.getMotivoReclamo)
app.post('/api/mapa/getdataformato', dbMapa.getDataFormato)
app.post('/api/mapa/getrespuestaall', dbMapa.getRespuestaAll)
app.post('/api/mapa/getequipoall', dbMapa.getEquiposAll)
app.post('/api/mapa/getdetalleall', dbMapa.getdetalleAll)
app.post('/api/mapa/getlamparasall', dbMapa.getLamparasAll)
app.post('/api/mapa/getcomponentesall', dbMapa.getComponentesAll)
app.post('/api/mapa/getdataformatoreclamo', dbMapa.getDataFormatoReclamo)
app.post('/api/mapa/getdetallereclamoall', dbMapa.getdetalleReclamoAll)
app.post('/api/mapa/getdetallerepartoall', dbMapa.getdetalleRepartoAll)
app.post('/api/mapa/getxlsreparto', dbMapa.getxlsReparto)
app.post('/api/mapa/getcnxcausa', dbMapa.getCnxCausa)
app.post('/api/mapa/getequiposrobosuministro', dbMapa.getEquiposRoboSuministro)
/* Movil */
app.get('/api/movil/get', dbMovil.get)

/* Dashboar */
app.post('/api/dashboard/getfecha', dbDashboard.getFecha)
app.post('/api/dashboard/getdepartamento', dbDashboard.getDepartamento)
app.post('/api/dashboard/getipomantenimiento', dbDashboard.getTipoMantenimiento)

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})