// mongoose
const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;

// schema Curso
var Curso = mongoose.model('Curso');

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
        type: Schema.ObjectId,
        ref: "Curso"
    }
});

const Estudiante = mongoose.model('Estudiante', estudianteSchema);

module.exports = Estudiante