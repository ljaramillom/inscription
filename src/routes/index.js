// express
const express = require('express');
const app = express();
// hbs
const hbs = require('hbs');
require('../hbs/helpers');
// path
const path = require('path');
// mongoose
const mongoose = require('mongoose');
// bodyParser
const bodyParser = require('body-parser');
// views - partials
const dirViews = path.join(__dirname, '../../template/views');
const dirPartials = path.join(__dirname, '../../template/partials');
// schemas
const Curso = require('./../models/cursos');
const Estudiante = require('./../models/estudiantes');
const Usuario = require('../models/usuarios');
// bcrypt
const bcrypt = require('bcrypt');

app.set('view engine', 'hbs');
app.set('views', dirViews)
hbs.registerPartials(dirPartials);

// sign-in
app.get('/', (req, res) => {
    res.render('sign-in');
});

// home
app.get('/home', (req, res) => {
    res.render('home');
});

// crear curso
app.get('/create-course', (req, res) => {
    if (req.session.role == 'aspirante') { return res.redirect('/'); }
    res.render('create-course');
});

// notificación del curso creado en BD
app.post('/view-course', (req, res) => {
    const errors = [];
    let curso = new Curso({
        nombre: req.body.nombre,
        codigo: req.body.codigo,
        descripcion: req.body.descripcion,
        modalidad: req.body.modalidad,
        valor: req.body.valor,
        estado: req.body.estado,
        duracion: req.body.duracion
    });

    curso.save((err, resp) => {
        if (err) {
            errors.push(err);
            res.render('view-course', {
                errors
            });
        }
        res.render('view-course', {
            message: 'Curso creado exitosamente.',
        });
    });
});

// ver todos los cursos
app.get('/view-all-courses', (req, res) => {
    if (req.session.role == 'coordinador') { return res.redirect('/'); }
    Curso.find({}).sort({ codigo: 'asc' }).exec((err, resp) => {
        if (!err) {
            res.render('view-all-courses', {
                listado: resp
            });
        }
    });
});

// actualizar el estado del curso
app.get('/update-course', (req, res) => {
    if (req.session.role == 'aspirante') { return res.redirect('/'); }
    Curso.find({ estado: 'Disponible' }).exec((err, resp) => {
        if (!err) {
            res.render('update-course', {
                listado: resp
            });
        }
    });
});

// notificacion del curso actualizado en BD
app.post('/view-course-updated', (req, res) => {
    Curso.findOneAndUpdate({ codigo: req.body.codigo }, { $set: { estado: 'Cerrado' } }, { new: true }).then((data) => {
        if (data) {
            res.render('view-course-updated', {
                message: 'Curso actualizado exitosamente.',
            });
        } else {
            res.render('error');
        }
    }).catch((err) => {
        reject(err);
    });
});

// inscripcion de estudiante
app.get('/register', (req, res) => {
    if (req.session.role == 'coordinador') { return res.redirect('/'); }
    // listado de cursos disponibles para el select
    Curso.find({ estado: 'Disponible' }).exec((err, resp) => {
        if (!err) {
            res.render('register', {
                listado: resp
            });
        }
    });
});

// notificacion de registro de estudiante
app.post('/view-register', (req, res) => {
    const errors = [];
    let estudiante = new Estudiante({
        documento: req.body.documento,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        telefono: req.body.telefono,
        curso: req.body.curso
    });

    estudiante.save((err, resp) => {
        if (err) {
            errors.push(err);
            res.render('view-register', {
                errors
            });
        }
        res.render('view-register', {
            message: 'Inscripción realizada exitosamente.',
        });
    });
});

// ver todos los estudiantes inscritos
app.get('/list-all-students', (req, res) => {
    if (req.session.role == 'aspirante') { return res.redirect('/'); }
    Estudiante.find({}, (err, resp) => {
        Curso.populate(resp, { path: "curso" }, (err, response) => {
            res.render('list-all-students', {
                listado: response,
            });
        });
    });
});

// ver cursos por estudiantes inscritos
app.get('/list-courses-students', (req, res) => {
    if (req.session.role == 'aspirante') { return res.redirect('/'); }
    Curso.find({}).sort({ codigo: 'asc' }).exec((err, resp) => {
        if (!err) {
            res.render('list-courses-students', {
                listado: resp
            });
        }
    });
});

// ver estudiantes por curso seleccionado
app.get('/list-students/:id', (req, res) => {
    let { id } = req.params;
    Estudiante.find({ curso: id }, (err, resp) => {
        Curso.populate(resp, { path: "curso" }, (err, response) => {
            res.render('list-students', {
                listado: response
            });
        });
    });
});

// notificacion al eliminar estudiante
app.post('/delete-student', (req, res) => {
    const errors = [];
    Estudiante.findOneAndDelete({ documento: req.body.documento }).then((data) => {
        if (data) {
            res.render('delete-student', {
                message: 'El estudiante ha sido eliminado del curso exitosamente.',
            });
        } else {
            errors.push(err);
            res.render('delete-student', {
                errors
            });
        }
    }).catch((err) => {
        errors.push(err);
        res.render('delete-student', {
            errors
        });
    });
});

// sign-in post
app.post('/sign-in', (req, res) => {
    Usuario.findOne({ documento: req.body.documento }, (err, resp) => {
        if (err) {
            res.render('error');
        }

        if (!resp) {
            res.render('sign-in', {
                error: 'Usuario no encontrado, por favor inténtalo nuevamente o regístrate.'
            });
        }

        if (resp) {

            if (!bcrypt.compareSync(req.body.password, resp.password)) {
                res.render('sign-in', {
                    error: 'La contraseña es incorrecta, por favor inténtalo nuevamente.',
                });
            }

            req.session.usuario = resp._id;
            req.session.role = resp.role;

            res.render('home', {
                message: 'Inicio de sesión realizado exitosamente.',
                role: req.session.role,
                session: true
            });
        }
    });
});

// sign-up post
app.post('/sign-up', (req, res) => {
    const errors = [];
    let usuario = new Usuario({
        documento: req.body.documento,
        nombre: req.body.nombre,
        correo: req.body.correo,
        telefono: req.body.telefono,
        password: bcrypt.hashSync(req.body.password, 10),
        role: req.body.role
    });

    usuario.save((err, resp) => {
        if (err) {
            errors.push(err);
            res.render('sign-up', {
                errors
            });
        }
        res.render('sign-in', {
            message: 'Registro realizado exitosamente.',
        });
    });
});

// sign-up get
app.get('/sign-up', (req, res) => {
    res.render('sign-up');
});

// logout
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) { res.render('error'); }
    });
    res.render('sign-in', {
        message: 'Sesión cerrada exitosamente.',
    });
});

// error
app.get('*', (req, res) => {
    res.render('error');
});

module.exports = app