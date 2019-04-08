// mongoose
const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');

// bcrypt
const bcrypt = require('bcryptjs');

// schema
const Schema = mongoose.Schema;

const usuarioSchema = new Schema({
    documento: {
        type: String,
        required: true,
        trim: true,
        unique: true,
    },
    nombre: {
        type: String,
        required: true,
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
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'aspirante'
    }
});

usuarioSchema.methods.encryptPassword = async(password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

usuarioSchema.methods.matchPassword = async function(password) {
    return await bcrypt.compare(password, this.password);
};

usuarioSchema.plugin(uniqueValidator, { message: 'Ya existe un usuario con el mismo documento ingresado.' });
const Usuario = mongoose.model('Usuario', usuarioSchema);

module.exports = Usuario