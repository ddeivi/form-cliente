var lista_libros = [];

function CrearListaLibro(titulo, autor, fecha_publicacion, descripcion) {

    var Libro = {
        titulo: titulo,
        autor: autor,
        fecha_publicacion: fecha_publicacion,
        descripcion: descripcion
    }
    lista_libros.push(Libro);

}

function ObtenerListaLibros() {


    var listaLibros = localStorage.getItem('ListaLibros');
    if (listaLibros == null) {
        lista_libros = [];
    } else {
        lista_libros = JSON.parse(listaLibros);
    }
    return lista_libros;

}