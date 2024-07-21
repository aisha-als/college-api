const express = require('express')
const app = express()
//app.use(bodyParser.json())
app.use(express.json());

const coursesRoutes = require('./routes/coursesRoutes');
app.use('/api/courses', coursesRoutes)

const enrolmentsRoutes = require('./routes/enrolmentsRoutes');
app.use('/api/enrolments', enrolmentsRoutes)

module.exports = app