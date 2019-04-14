# inscription-course

- **Estructura de la aplicación**
```
inscription-course
|--public
    |--assets
        |--css
        |--js
|--src
    |--config
        |--config.js
    |--hbs
        |--helpers.js
    |--models
        |--cursos.js
        |--estudiantes.js
        |--usuarios.js
    |--routes
        |--index.js
    |--app.js
|--template
    |--partials
        |--footer.hbs
        |--head.hbs
        |--navbar.hbs
        |--users.hbs
    |--views
        |--create-course.hbs
        |--delete-student.hbs
        |--error.hbs
        |--home.hbs
        |--list-all-students.hbs
        |--list-courses-students.hbs
        |--list-students.hbs
        |--register.hbs
        |--sign-in.hb
        |--sign-up.hb
        |--update-course.hbs
        |--view-all-courses.hbs
        |--view-course-updated.hbs
        |--view-course.hbs
        |--view-register.hbs
|--package.json
|--node_modules
|--README.md
```

- **Ejecución de la aplicación**

1. Realizar ```npm install``` para descargar las librerías
2. Ejecutar el siguiente comando en consola
```
node src/app
```
3. Abrir el navegador con la siguiente dirección **http://localhost:3000**


