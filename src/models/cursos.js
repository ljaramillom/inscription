// mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// schema
const Schema = mongoose.Schema;

const cursoSchema = new Schema({
    codigo: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    descripcion: {
        type: String,
        required: true
    },
    modalidad: {
        type: String
    },
    valor: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        default: 'Disponible'
    },
    duracion: {
        type: String
    }
});

cursoSchema.plugin(uniqueValidator, { message: 'Ya existe un curso con el mismo Id ingresado.' });
const Curso = mongoose.model('Curso', cursoSchema);

module.exports = Curso