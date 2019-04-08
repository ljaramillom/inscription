const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const mongoose = require('mongoose');
const Usuario = require('../models/usuarios');

passport.use(new LocalStrategy({
    usernameField: 'nombre'
}, async(nombre, password, done) => {
    const usuario = await Usuario.findOne({ nombre: nombre });
    if (!usuario) {
        return done(null, false, { message: 'Usuario no encontrado.' });
    } else {
        // encriptador
        // const match = await usuario.matchPassword(password);
        // if(match) {
        if (password) {
            return done(null, usuario);
        } else {
            return done(null, false, { message: 'Contraseña incorrecta.' });
        }
    }
}));

// almacenar el id del usuario logueado
passport.serializeUser((usuario, done) => {
    done(null, usuario.id);
});

passport.deserializeUser((id, done) => {
    Usuario.findById(id, (err, user) => {
        done(err, user);
    });
});