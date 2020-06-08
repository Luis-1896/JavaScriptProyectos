//vARIABLES
const carrito = document.getElementById('carrito'); //obtiene el contenido del id carrito del html
const cursos = document.getElementById('lista-cursos'); // obtiene el contenido del id lista-cursos del html
const listaCursos = document.querySelector('#lista-carrito tbody'); //se va inservar en el tbody del html
const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); // obtiene el contenido del id vaciar-carrito del html

// LISTENERS EVENTS

cargarEventListeners();

function cargarEventListeners() {
    //Dispara cuando se presiona "Agregar carrito"
    cursos.addEventListener('click', comprarCurso);

    //Cuando se elimina un curso del carrito
    carrito.addEventListener('click', eliminarCurso);

    // Al vaciar carrito
    vaciarCarritoBtn.addEventListener('click', vaciarCarrito);

    // Al cargar el documento, mostrar LocalStorage
    document.addEventListener('DOMContentLoaded', leerLocalStorage);
}


//FUNCTIONS

// Función que añade el curso al carrito
function comprarCurso(e) {
    e.preventDefault();
    //console.log(e.target.classList);
    // Delegation para agregar carrito
    if (e.target.classList.contains('agregar-carrito')) { //se usar contains para acceder al nombre de la clase que queremos
        const curso = e.target.parentElement.parentElement; // se pone doble parentElement, porque queremos ir dos niveles arriba de la clase agregar-carrito (acceder a la clase carrito)
        // Enviamos el curso seleccionado para tomar sus datos
        leerDatosCurso(curso);
    }

}

// Lee los datos del curso
function leerDatosCurso(curso) {
    console.log(curso);
    const infoCurso = {
            imagen: curso.querySelector('img').src, // la direccion de la imagen de la card seleccionada
            titulo: curso.querySelector('h4').textContent, // el texto que esta en el elemento h4
            precio: curso.querySelector('.precio span').textContent, // obtiene el texto que esta en la clase precio y elemento span
            id: curso.querySelector('a').getAttribute('data-id') //obtiene el id de cada card
        }
        //console.log(infoCurso);
    insertarCarrito(infoCurso);

    //console.log(curso);
}

function insertarCarrito(curso) {
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
    listaCursos.appendChild(row);
    guardarCursoLocalStorage(curso);
}

function eliminarCurso(e) {
    e.preventDefault();
    //console.log('eliminado');
    let curso,
        cursoID;
    if (e.target.classList.contains('borrar-curso')) { //solo toma como delegation a la clase borrar curso
        e.target.parentElement.parentElement.remove(); //eminina desde el padre elemento tr, por eso es dos parentElement
        curso = e.target.parentElement.parentElement; // obtengo todo el directorio html desde tr
        cursoID = curso.querySelector('a').getAttribute('data-id'); //obtengo el id del componente a html
    }
    eliminarCursoLocalStorage(cursoID);
}

//Elimina los cursos en el DOM
function vaciarCarrito() {
    //forma lenta de vaciar el carrito
    //listaCursos.innerHTML='';

    //forma rapida (recomendada)
    while (listaCursos.firstChild) { //mientras exista un elemento
        listaCursos.removeChild(listaCursos.firstChild); // el removeChild necesita el parametro previo o a eliminar

    }

    //Vaciar local Storage
    vaciarLocalStorage();
    return false;

}

// Almacena cursos en el carrito a local storage
function guardarCursoLocalStorage(curso) {
    let cursos;
    // Toma el valor de un arreglo con datos de LS o vacio
    cursos = obtenerCursosLocalStorage();
    console.log(cursos);

    // el curso seleccionado se agrega al arreglo
    cursos.push(curso);

    localStorage.setItem('cursos', JSON.stringify(cursos));

}

//Comprueba que haya elementos en el Local Storage
function obtenerCursosLocalStorage() {
    let cursosLS;

    // comprobamos si hay algo en localStorage
    if (localStorage.getItem('cursos') === null) {
        cursosLS = [];
    } else {
        cursosLS = JSON.parse(localStorage.getItem('cursos'));
    }
    return cursosLS;


}

// Imprime los cursos de LS en el carrito

function leerLocalStorage() {
    let cursosLS;
    cursosLS = obtenerCursosLocalStorage();
    cursosLS.forEach(curso => {
        //construir el template
        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${curso.imagen}" width=100>
        </td>
        <td>${curso.titulo}</td>
        <td>${curso.precio}</td>
        <td>
            <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
        </td>
    `;
        listaCursos.appendChild(row);
    });
}

// eliminar el curso de local storage por ID
function eliminarCursoLocalStorage(curso) {
    console.log(curso);
    let cursosLS;
    //obtenemos el arreglo de cursos
    cursosLS = obtenerCursosLocalStorage();
    // iteramos comparando el ID del curso borrado con los del LS
    cursosLS.forEach(function(cursoLS, index) {
        if (cursoLS.id === curso) {
            cursosLS.splice(index, 1); //ubica al curso y lo quita de su ubicación por el 1, 
        }
    });
    // Añadimos el arreglo actual a local storage
    localStorage.setItem('cursos', JSON.stringify(cursosLS));
}

// eliminar toos los cursos de local storage
function vaciarLocalStorage() {
    localStorage.clear();
}