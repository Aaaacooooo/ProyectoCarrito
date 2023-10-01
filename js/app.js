// Variables, debes hacer el querySelector adecuado

// const carrito = document.getElementById('carrito'); //Busca el primer elemento cuyo id sea "carrito"
// const listaCursos = document.getElementById('lista-cursos'); //Busca el primer elemento cuyo id sea "lista-cursos"
// const contenedorCarrito = document.getElementById('tbody'); //Busca el primer elemento tbody dentro del elemento con id lista-carrito
// const vaciarCarritoBtn = document.getElementById('vaciar-carrito'); //Busca el primer elemento cuyo id sea vaciar-carrito
// const tarjetasCursos= document.getElementsByClassName('.curso'); //Busca todos los elementos cuya clase sea curso
// let articulosCarrito = [];

const carrito = document.querySelector('#carrito'); //Busca el primer elemento cuyo id sea "carrito"
const listaCursos = document.querySelector('#lista-cursos'); //Busca el primer elemento cuyo id sea "lista-cursos"
const contenedorCarrito = document.querySelector('#lista-carrito tbody'); //Busca el primer elemento tbody dentro del elemento con id lista-carrito
const vaciarCarritoBtn = document.querySelector('#vaciar-carrito'); //Busca el primer elemento cuyo id sea vaciar-carrito
const tarjetasCursos = document.querySelectorAll('.curso'); //Busca todos los elementos cuya clase sea curso
let articulosCarrito = [];

const autores = []; //array para almacenar los nombres de los autores
// Itera sobre cada elemento con la clase "curso" y extrae el nombre del autor




// Listeners
cargarEventListeners();

function cargarEventListeners() {
     // Dispara cuando se presiona "Agregar Carrito"
     listaCursos.addEventListener('click', agregarCurso);


     // Cuando se elimina un curso del carrito
     carrito.addEventListener('click', eliminarCurso);

     // Al Vaciar el carrito
     vaciarCarritoBtn.addEventListener('click', vaciarCarrito);


     // NUEVO: Contenido cargado
     document.addEventListener('DOMContentLoaded', () => {
          articulosCarrito = JSON.parse(localStorage.getItem('carrito')) || [];
          // console.log(articulosCarrito);
          carritoHTML();
     });
}

//                                                                Elemento proporciona el trozo de código es listaCursos
// Función que añade el curso al carrito
function agregarCurso(e) {
     e.preventDefault();
     // Delegation para agregar-carrito
     if (e.target.classList.contains('agregar-carrito')) {
          const curso = e.target.parentElement.parentElement;
          // Enviamos el curso seleccionado para tomar sus datos
          leerDatosCurso(curso);

     }

}

// Lee los datos del curso
// Usa querySelector para encontrar los elementos que se indican
function leerDatosCurso(curso) {
     console.log(curso);
     const infoCurso = {
          imagen: curso.querySelector('img').src, //La imagen del curso
          titulo: curso.querySelector('h4').textContent, //el título del curso
          precio: curso.querySelector('.precio > span').textContent, //el precio con el descuento ya aplicado
          id: curso.querySelector('a').getAttribute('data-id'), //Vamos a buscar el data-id del curso, primero buca el elemento y luego accede al atributo
          autor: curso.querySelector('a').getAttribute('data-autor'),
          cantidad: 1
     }
     console.log(infoCurso.autor) // Juan Pedro
     //Ahora tengo que buscar la forma de buscar una variable con la que pueda acceder a todos los autores de todos los cursos
     tarjetasCursos.forEach(curso => {
          const autor = curso.querySelector('a').getAttribute('data-autor');
          // Añade el nombre del autor al array si aún no está presente
          if (!autores.includes(autor)) {
               autores.push(autor);
          }
     });
     // Ahora, el array 'autores' contiene todos los nombres de los autores de los cursos
     console.log(autores, 'autores');
     // // Lógica para aplicar estilos y ajustar el precio basado en el autor
     // if (infoCurso.autor === 'Juan Pedro') {
     //      curso.classList.add('borde-azul'); // Aplica el borde azul al curso
     //      infoCurso.precio = (parseInt(infoCurso.precio) - 5) + ' €'; // Reduce el precio en 5€
     // } else {
     //      curso.classList.add('borde-verde'); // Aplica el borde verde a los cursos del mismo autor
     // }

     // if (infoCurso.autor === 'Juan Pedro') {
     //      curso.style.border = '2px solid green'; // Aplica el borde verde a los cursos del autor "Juan Pedro"
     //      infoCurso.precio = (parseInt(infoCurso.precio) - 5) + ' €'; // Reduce el precio en 5€
     // }

     curso.classList.add('borde-azul'); // Aplica el borde azul al curso
     //Buscamos entre todos los cursos los que tengan el mismo autor al seleccionado
     if (curso.autor === infoCurso.autor) {
          tarjetasCursos.classList.add('borde-verde'); // Aplica el borde verde a los cursos del mismo autor
          tarjetasCursos.precio = (parseInt(infoCurso.precio) - 5) + ' €'; // Reduce el precio en 5€
     }


     if (articulosCarrito.some(curso => curso.id === infoCurso.id)) {
          const cursos = articulosCarrito.map(curso => {
               if (curso.id === infoCurso.id) {
                    let cantidad = parseInt(curso.cantidad);
                    cantidad++
                    curso.cantidad = cantidad;
                    return curso;
               } else {
                    return curso;
               }
          })
          articulosCarrito = [...cursos];
     } else {
          articulosCarrito = [...articulosCarrito, infoCurso];
     }

     console.log(articulosCarrito)

     carritoHTML();
}

// Elimina el curso del carrito en el DOM
function eliminarCurso(e) {
     e.preventDefault();
     if (e.target.classList.contains('borrar-curso')) {
          // e.target.parentElement.parentElement.remove();
          const curso = e.target.parentElement.parentElement;
          const cursoId = curso.querySelector('a').getAttribute('data-id');

          // Eliminar del arreglo del carrito
          articulosCarrito = articulosCarrito.filter(curso => curso.id !== cursoId);

          carritoHTML();
     }
}


// Muestra el curso seleccionado en el Carrito
function carritoHTML() {

     vaciarCarrito();

     articulosCarrito.forEach(curso => {
          const row = document.createElement('tr');
          row.innerHTML = `
               <td>  
                    <img src="${curso.imagen}" width=100>
               </td>
               <td>${curso.titulo}</td>
               <td>${curso.precio}</td>
               <td>${curso.cantidad} </td>
               <td>
                    <a href="#" class="borrar-curso" data-id="${curso.id}">X</a>
               </td>
          `;
          contenedorCarrito.appendChild(row);
     });

     // NUEVO:
     sincronizarStorage();

}


// NUEVO: 
function sincronizarStorage() {
     localStorage.setItem('carrito', JSON.stringify(articulosCarrito));
}

// Elimina los cursos del carrito en el DOM
function vaciarCarrito() {
     // forma rapida (recomendada)
     while (contenedorCarrito.firstChild) {
          contenedorCarrito.removeChild(contenedorCarrito.firstChild);
     }
}