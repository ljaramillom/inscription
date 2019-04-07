// mongoose
const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;

const estudianteSchema = new Schema({
    documento: {
        type: String,
        required: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    apellido: {
        type: String,
        trim: true
    },
    correo: {
        type: String,
        required: true,
        trim: true
    },
    telefono: {
        type: String,
        required: true,
        trim: true
    },
    curso: {
        type: String,
        required: true,
        trim: true
    }
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante