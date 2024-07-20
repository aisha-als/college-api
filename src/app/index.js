const express = require('express')
const app = express()
//app.use(bodyParser.json())

const coursesRoutes = require('./routes/coursesRoutes');
app.use('/api/courses', coursesRoutes)

module.exports = app