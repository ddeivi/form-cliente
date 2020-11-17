function botonFormulario() {

    btnAgg = document.getElementById("btn-agg").value;

    if (btnAgg == "Registrar libro") {
        aggLibro();

    } else {

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