function botonFormulario() {

    btnAgg = document.getElementById("btn-agg").value;

    if (btnAgg == "Registrar libro") {
        aggLibro();

    } else {

        editarLibro();
    }

}


function aggLibro() {

    var titulo = document.getElementById("titulo").value;
    var autor = document.getElementById("autor").value;
    var fecha = document.getElementById("fecha").value;
    var descripcion = document.getElementById("descripcion").value;


    if (titulo.length == 0 || autor.length == 0 || fecha.length == 0 || descripcion.length == 0) {
        error();
    } else {

        CrearListaLibro(titulo, autor, fecha, descripcion)

        localStorage.setItem('ListaLibros', JSON.stringify(lista_libros));

        obtenerLibros();
        success();

        document.getElementById("titulo").value = "";
        document.getElementById("autor").value = "";
        document.getElementById("fecha").value = "";
        document.getElementById("descripcion").value = "";


    }
}



function obtenerLibros() {

    var list = ObtenerListaLibros(),
        tbody = document.querySelector('#tabla-libros tbody');

    tbody.innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        var row = tbody.insertRow(i),

            titulo = row.insertCell(0),
            descripcion = row.insertCell(1),
            autor = row.insertCell(2),
            fecha = row.insertCell(3),
            acciones = row.insertCell(4);

        titulo.innerHTML = list[i].titulo;
        descripcion.innerHTML = list[i].descripcion;
        autor.innerHTML = list[i].autor;
        fecha.innerHTML = list[i].fecha_publicacion;
        acciones.innerHTML = '<button type="buttton" class="btn-borrar" onclick="eliminar(' + i + ')"> <i class="far fa-trash-alt"></i> </button> <button type="buttton" class="btn-editar" onclick="obtenerLibroEditar(' + i + ')"> <i class="far fa-edit"></i> </button>';


        tbody.appendChild(row);
    }
}



function obtenerLibroEditar(idLibro) {

    localStorage.setItem('idLibro', idLibro);

    var list = ObtenerListaLibros();

    document.getElementById("titulo").value = list[idLibro].titulo;
    document.getElementById("autor").value = list[idLibro].autor;
    document.getElementById("fecha").value = list[idLibro].fecha_publicacion;
    document.getElementById("descripcion").value = list[idLibro].descripcion;

    document.getElementById("descripcion").value = list[idLibro].descripcion;

    btnCancelar = document.getElementById("btn-cancelar");
    btnCancelar.style.display = "block";

    btnAgg = document.getElementById("btn-agg").value = "Editar";

    var containerForm = document.getElementById("container-form");
    containerForm.scrollIntoView();


}

function editarLibro() {

    var titulo = document.getElementById("titulo").value;
    var autor = document.getElementById("autor").value;
    var fecha = document.getElementById("fecha").value;
    var descripcion = document.getElementById("descripcion").value;


    if (titulo.length == 0 || autor.length == 0 || fecha.length == 0 || descripcion.length == 0) {
        error();
    } else {

        var list = ObtenerListaLibros();

        var idLibro = localStorage.getItem('idLibro');

        var titulo = document.getElementById("titulo").value;
        var autor = document.getElementById("autor").value;
        var fecha = document.getElementById("fecha").value;
        var descripcion = document.getElementById("descripcion").value;

        list[idLibro].titulo = titulo;
        list[idLibro].autor = autor;
        list[idLibro].fecha_publicacion = fecha;
        list[idLibro].descripcion = descripcion;

        list.splice(idLibro, 1, list[idLibro]);

        localStorage.setItem('ListaLibros', JSON.stringify(list));

        obtenerLibros();
        success();
        cancelar();
    }


}

function cancelar() {

    document.getElementById("titulo").value = "";
    document.getElementById("autor").value = "";
    document.getElementById("fecha").value = "";
    document.getElementById("descripcion").value = "";

    btnCancelar = document.getElementById("btn-cancelar");
    btnCancelar.style.display = "none";
    btnAgg = document.getElementById("btn-agg").value = "Registrar libro";

}



function success() {
    Swal.fire({
        title: 'Correcto',
        text: 'Registro exitoso',
        icon: 'success',
        showConfirmButton: false,
        timer: 1000
    })
}

function error() {
    Swal.fire({
        title: 'Error',
        text: 'Ingrese todos los datos',
        icon: 'error',
        showConfirmButton: false,
        timer: 1000
    })
}


function borrarLibro(idLibro) {

    var list = ObtenerListaLibros();
    list.splice(idLibro, 1);
    localStorage.setItem('ListaLibros', JSON.stringify(list));
    obtenerLibros();

}


function eliminar(idLibro) {
    Swal.fire({
        title: '¿Eliminar este registro?',
        text: "Este registro se eliminará",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Confirmar',
        cancelButtonText: 'Cancelar'

    }).then((result) => {
        if (result.isConfirmed) {

            borrarLibro(idLibro);

            Swal.fire(
                'Correcto',
                'Su registro ha sido eliminado',
                'success'
            )
        }
    })
}