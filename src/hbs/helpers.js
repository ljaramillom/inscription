const hbs = require('hbs');

// tabla para listar todos los cursos
hbs.registerHelper('listarCursos', (listaCursos) => {
    let texto = `<table class='table table-bordered'> \ <thead> \ <th> Id </th> \ <th> Nombre </th> \ <th> Descripción </th> \ <th> Modalidad </th> \ <th> Valor </th> \ <th> Estado </th> \ <th> Duración (hrs) </th> \ </thead> \ <tbody>`
    listaCursos.forEach(curso => {
        texto = texto +
            `<tr>   <td>${curso.codigo}</td>
                    <td>${curso.nombre}</td>
                    <td>${curso.descripcion}</td>
                    <td>${curso.modalidad}</td>
                    <td>${curso.valor}</td>
                    <td>${curso.estado}</td>
                    <td>${curso.duracion}</td></tr>`
    });
    texto = texto + `</tbody> </table>`
    return texto;
});

// select listar cursos
hbs.registerHelper('listarSelect', (listaCursos) => {
    let texto = `<select class='form-control' name='curso'>`
    listaCursos.forEach(curso => {
        texto = texto +
            `<option value=${curso._id}><td>${curso.nombre}</option>`
    });
    texto = texto + "</select>"
    return texto;
});

// collapse cursos
hbs.registerHelper('mostrarCursos', (listaCursos) => {
    let texto = `<div class='accordion' id='accordionCursos'>`
    let i = 1;
    listaCursos.forEach(curso => {
        texto = texto + `   <div class="card">
                                <div class="card-header" id="heading${i}">
                                    <h5 class="mb-0">
                                        <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                                            <b>Curso:</b> ${curso.nombre} >>
                                            <b>Descripción:</b> ${curso.descripcion} >>
                                            <b>Valor:</b> ${curso.valor}
                                        </button>
                                    </h5>
                                </div>
                            
                                <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                                    <div class="card-body">
                                    <b>Descripción:</b> ${curso.descripcion}<br> 
                                    <b>Modalidad:</b> ${curso.modalidad}<br>
                                    <b>Valor:</b> ${curso.valor}<br>
                                    <b>Estado:</b> ${curso.estado}<br>
                                    <b>Duración (hrs):</b> ${curso.duracion}<br>
                                    </div>
                                </div>
                            </div>`
        i = i + 1;
    });
    texto = texto + `</div>`
    return texto;
});

// collapse cursos con boton
hbs.registerHelper('mostrarCollapse', (listaCursos) => {
    let texto = `<div class='accordion' id='accordionCursos'>`
    let i = 1;
    listaCursos.forEach(curso => {
        texto = texto + `   <div class="card">
            <div class="card-header" id="heading${i}">
                <h5 class="mb-0">
                    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse${i}" aria-expanded="true" aria-controls="collapse${i}">
                        <b>Curso:</b> ${curso.nombre} 
                    </button>
                </h5>
            </div>
        
            <div id="collapse${i}" class="collapse" aria-labelledby="heading${i}" data-parent="#accordionExample">
                <div class="card-body">
                <b>Descripción:</b> ${curso.descripcion}<br> 
                <b>Modalidad:</b> ${curso.modalidad}<br>
                <b>Valor:</b> ${curso.valor}<br>
                <b>Estado:</b> ${curso.estado}<br>
                <b>Duración(hrs):</b> ${curso.duracion}<br><br>
                <button type="submit" value=${curso.codigo} name=codigo class="btn btn-primary">Cerrado</button>
                </div>
            </div>
        </div>`
        i = i + 1;
    });
    texto = texto + `</div>`
    return texto;
});

// tabla listar estudiantes
hbs.registerHelper('mostrarEstudiantes', (listaEstudiantes) => {
    let texto = ` <form action='/delete-student' method='POST'>
    <table class='table table-bordered'> \ <thead> \ <th> Documento de Identidad </th> \ <th> Nombre </th> \ <th> Apellido </th> \ <th> Correo Electrónico </th> \ <th> Teléfono </th> \ <th> Curso </th> \ <th> Acciones </th> \ </thead> \ <tbody>`
    listaEstudiantes.forEach(est => {
        let nombreCurso = est.curso.nombre;
        texto = texto +
            `<tr><td>${est.documento}</td>
            <td> ${est.nombre}</td>
            <td>${est.apellido}</td>
            <td> ${est.correo}</td>
            <td> ${est.telefono}</td>
            <td> ${nombreCurso}</td>
            <td><button type="submit" name="documento" value=${est.documento} class="btn btn-danger">Eliminar</button></td></tr></tr>`
    });
    texto = texto + `</tbody></table></form>`
    return texto;
});