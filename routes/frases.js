// Importamos clases para el uso de peticiones
const express = require('express')
const router = express.Router()
const Frase = require('../models/frase')
let frase = require('../models/frase')

// Obtenemos todos los registros de la BD
router.get('/', async (req, res) => {
    try{
        const frases = await Frase.find()
        res.json(frases)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
})

// Obtenemos los datos de un solo registro usando el ID
router.get('/:id', getFrase, (req, res) => { 
    res.json(res.frase)
})

// Creamos nuevo registro de personaje completo
router.post('/', async (req, res) => {
    // Definimos todos los datos del request del nuevo registro por medio de un JSON
    const frase = new Frase({
        character_name: req.body.character_name,
        origen: {
            nombreIP: req.body.origen.nombreIP,
            fechaCreacionOrigen: req.body.origen.fechaCreacionOrigen,
            media: req.body.origen.media,
            genero: req.body.origen.genero
        },
        frases: req.body.frases,
        fechaCreacionPersonaje: req.body.fechaCreacionPersonaje
    })
    try {
        const newFrase = await frase.save() // Guarda cambios en la BD
        res.status(201).json(newFrase)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
})

// Patch para actualizar un registro en la BD
router.patch('/:id', getFrase, async (req, res) => {
    
    // Condiciones para comprobar cambios en los datos del registro
    if(req.body.character_name != null){
        res.frase.character_name = req.body.character_name
    }
    if(req.body.origen.nombreIP != null){
        res.frase.origen.nombreIP = req.body.origen.nombreIP
    }
    if(req.body.origen.fechaCreacionOrigen != null){
        res.frase.origen.fechaCreacionOrigen = req.body.origen.fechaCreacionOrigen
    }
    if(req.body.origen.media != null){
        res.frase.origen.media = req.body.origen.media
    }
    if(req.body.origen.genero != null){
        res.frase.origen.genero = req.body.origen.genero
    }
    if(req.body.frases != null){
        res.frase.frases = req.body.frases
    }
    if(req.body.fechaCreacionPersonaje != null){
        res.frase.fechaCreacionPersonaje = req.body.fechaCreacionPersonaje
    }
    
    try {
        const fraseActualizada = await res.frase.save() // Guarda cambios en la BD
        res.json(fraseActualizada) // Devuelve el registro actualizado
    } catch (err) {
       res.status(400).json({ message: err.message }) 
    }
})

// Eliminación de un registro de la BD por medio de la ID
router.delete('/:id', getFrase, async (req, res) => {
    try {
        await frase.deleteOne({id: req.params.id})
        res.json({ message: 'Frase eliminada con éxito.' })
    } catch (err) {
        res.status(500).json({ message: err.message})
    }
})

// Función para buscar una frase por su ID en el JSON
async function getFrase(req, res, next){
    try {
        frase = await Frase.findById(req.params.id)
        if(frase == null){
            return res.status(404).json({ message: 'No se encontró la frase. ' })
        }
    } catch (err) {
        return res.status(500).json({ message: err.message })
    }

    res.frase = frase
    next()
}

module.exports = router