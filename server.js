require('dotenv').config()

const express = require("express")
const app = express()
const mongoose = require('mongoose') //Librerias para manipular MongoDB con Express
const morgan = require('morgan') // Librerias para detectar errores del server

app.use(morgan('dev'))

//Mongoose conecta con la base de datos de MongoDB
mongoose.connect(process.env.DATABASE_URL) // Variable de entorno para conectar con MoongoDB Atlas
const db = mongoose.connection
db.on('error', (error) => console.error(error))
db.once('open', () => console.log('Connected to Database'))

app.use(express.json())
const frasesRouter = require('./routes/frases')
app.use('/frases', frasesRouter)
'localhost:3000/frases/file1'

//Definimos el puerto 3000 para la ejecución del servidor
app.listen(3000, () => console.log('Server Started'))