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

app.set('view engine', 'hbs');
app.set('views', dirViews)
hbs.registerPartials(dirPartials);

app.get('/', (req, res) => {
    res.render('home');
});

// crear curso
app.get('/create-course', (req, res) => {
    res.render('create-course');
});

// notificación del curso guardado en BD
app.post('/view-course', async(req, res) => {
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

    await curso.save((err, resp) => {
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
app.get('/view-all-courses', async(req, res) => {
    await Curso.find().sort({ codigo: 'asc' }).exec((err, resp) => {
        if (err) {
            res.render('view-all-courses', {
                message: err
            });
        }
        res.render('view-all-courses', {
            listado: resp
        });
    });
});

// actualizar el estado del curso
app.get('/update-course', async(req, res) => {
    await Curso.find({ estado: 'Disponible' }).exec((err, resp) => {
        if (err) {
            res.render('update-course', {
                message: err
            });
        }
        res.render('update-course', {
            listado: resp
        });
    });
});

// notificacion del curso actualizado en BD
app.post('/view-course-updated', async(req, res) => {
    await Curso.findOneAndUpdate({ codigo: req.body.codigo }, { $set: { estado: 'Cerrado' } }, { new: true }).then((data) => {
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
app.get('/register', async(req, res) => {
    // listado de cursos disponibles en select
    await Curso.find({ estado: 'Disponible' }).exec((err, resp) => {
        if (!err) {
            res.render('register', {
                listado: resp
            });
        }
    });
});

// notificacion de registro de estudiante
app.post('/view-register', async(req, res) => {
    const errors = [];
    let estudiante = new Estudiante({
        documento: req.body.documento,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        correo: req.body.correo,
        telefono: req.body.telefono,
        curso: req.body.curso
    });

    await estudiante.save((err, resp) => {
        //pendiente validacion
        if (err) {
            errors.push(err);
            res.render('view-register', {
                message: 'El estudiante ya se encuentra inscrito en el curso.'
            });
        }
        res.render('view-register', {
            message: 'Inscripción realizada exitosamente.',
        });
    });
});

// ver todos los estudiantes inscritos
app.get('/list-students', (req, res) => {
    Estudiante.find({}, (err, resp) => {
        Curso.populate(resp, { path: "curso" }, (err, response) => {
            res.render('list-students', {
                listado: response,
            });
        });

    });
});

// notificacion al eliminar estudiante
app.post('/delete-student', async(req, res) => {
    const errors = [];

    await Estudiante.findOneAndDelete({ documento: req.body.documento }).then((data) => {
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

// error
app.get('*', (req, res) => {
    res.render('error');
});

module.exports = app