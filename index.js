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
const port = 3200


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
app.post('/api/general/getsoportetecnico', dbGeneral.getSoporteTecnico)
app.post('/api/general/getequipo', dbGeneral.getEquipo)
app.post('/api/general/deleteequipo', dbGeneral.deleteEquipo)
app.post('/api/general/saveequipo', dbGeneral.saveEquipo)
app.post('/api/general/getmotivosincidencia', dbGeneral.getMotivosIncidencia)
app.post('/api/general/saveincidencia', dbGeneral.saveIncidencia)
app.post('/api/general/getincidencias', dbGeneral.getIncidencias)
app.post('/api/general/saveasignacion', dbGeneral.saveAsignacion)

























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

app.listen(port, () => {
    console.log(`App running on port ${port}.`)
})