// Importamos las librería de mongoose para manipular MongoDB
const { default: mongoose } = require('mongoose')
const moongose = require('mongoose')

// Arreglo que almacena las frases de un solo personaje
const frasesSchema = new mongoose.Schema({
    frase: {    // Cadena que almacena la frase
        type: String,
        require: true
    },
    fechaFrase: {   // Cdena que almacena la fecha en que se dijo la frase
        type: String,
        require: true
    }
})

// JSON que guarda todos los datos sobre la frase de un personaje ficticio
const frasesCharacterSchema = new mongoose.Schema({
    character_name: { // Nombre del personaje
        type: String,
        require: true
    }, 
    origen: {

        nombreIP:{ // Nombre de la Propiedad Intelectual (IP) al que pertenece el personaje
            type: String,
            require: true
        },
        fechaCreacionOrigen:{ // Fecha de creación de la IP
            type: String,
            require: true
        },
        media:{ // Medio al que pertenece el personaje
            type: String,
            require: true
        }, 
        genero: { // Género al que pertenece la obra/IP
            type: String,
            require: true
        }
    }, 
    frases: [frasesSchema], // Arreglo que las frases del personaje
    fechaCreacionPersonaje:{ // Fecha de 1ra aparición del personaje
        type: String,
        require: true,
    }
})

// Devuelve un JSON con los datos de la frase
module.exports = mongoose.model('Frase', frasesCharacterSchema)