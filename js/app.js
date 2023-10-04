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
const tarjetasCursos = document.querySelectorAll('.card'); //Busca todos los elementos cuya clase sea curso
let articulosCarrito = [];




console.log(listaCursos); //div lista-cursos
console.log(listaCursos.parentNode); // body
console.log(listaCursos.parentNode.parentNode);// html

console.log(listaCursos.parentElement); // body
console.log(listaCursos.parentElement.parentElement); // html

const row = listaCursos.parentElement.parentElement;

console.log(row.children); // HTMLCollection(2) [head, body]
console.log(row.childNodes); // NodeList(3) [head, text, body]

const div_her = document.querySelector('.encabezado'); // h1 class="encabezado"
console.log(div_her);
console.log(div_her.nextElementSibling); // Primer hermano de h1 en este caso un div 
console.log(div_her.nextElementSibling.nextElementSibling); // Segundo hermano de h1 otro div

const row3 = div_her.nextElementSibling.nextElementSibling;
console.log(row3.previousElementSibling); // Hermano anterior div
console.log(row3.previousElementSibling.previousElementSibling); // 2 hermannos atras h1 

console.log(' ');
console.log(' ');

console.log(document.querySelector('#lista-cursos'));
console.log(document.querySelector('#lista-cursos :nth-child(1)')); // Primer hijo h1 de lista cursos
console.log(document.querySelector('#lista-cursos :nth-child(2)')); // Segundo hijo primer div de lista cursos
console.log(document.querySelector('#lista-cursos :nth-child(3)')); // Enttramos dentor de info-card y nos da su tercer hijo
console.log(document.querySelector('#lista-cursos :nth-child(4)')); // Enttramos dentor de info-card y nos da su cuarto hijo

console.log(' ');
console.log(' ');

console.log(document.querySelector('.info-card'));
console.log(document.querySelector('.info-card :nth-child(1)')); // Primer hijo de info-card = h4
console.log(document.querySelector('.info-card :nth-child(2)')); // Segundo hijo de info-card = p
console.log(document.querySelector('.info-card :nth-child(3)')); // Tercer hijo de info-card = img
console.log(document.querySelector('.info-card :nth-child(4)')); // Cuarto hijo de info-card = p


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

     const infoCurso = {
          imagen: curso.querySelector('img').src, //La imagen del curso
          titulo: curso.querySelector('h4').textContent, //el título del curso
          precio: curso.querySelector('.precio > span').textContent, //el precio con el descuento ya aplicado
          id: curso.querySelector('a').getAttribute('data-id'), //Vamos a buscar el data-id del curso, primero buca el elemento y luego accede al atributo
          autor: curso.querySelector('.info-card p').textContent,
          cantidad: 1
     }

     // Juan Pedro = infocurso.autor
     tarjetasCursos.forEach(element => {
          autores = element.querySelector('.info-card p').textContent
          autor = infoCurso.autor
          if (autores === autor) {

               element.classList.add('borde-verde') // A esos les añadimos un borde verde
               element.querySelector('.precio > span').classList.add('tachado') //Al precio anterior lo tachamos

               newPrecio = document.createElement('p') // Creamos un elemento p
               newPrecio.textContent = ('10') // le añadimos contenido

               // element.querySelector('.precio > span').insertAdjacentElement('afterend', newPrecio)
               element.querySelector('.precio > span').appendChild(newPrecio) // Lo colocamos después del anterior precio
               console.log(element.querySelector('.precio > span'));

               newPrecio.id = 'newPrecio'

               descuento = document.createElement('p') //vamos a crear el elemento 'p' para el descuento
               descuento.textContent = ('DESCUENTO!') //le damos un contenido
               //element.querySelector('.card > img').insertAdjacentElement('beforebegin', descuento)
               element.querySelector('.card > img').appendChild(descuento)
               descuento.classList.add('fondo-descuento')

               // Eliminar la clase 'tachado' del precio anterior
               //newPrecio.style = ('text-decoration : none')
               element.querySelector('#newPrecio').classList.add('destachado')
               console.log(element.querySelector('#newPrecio'));
          }

     });

     curso.classList.remove('borde-verde')
     curso.classList.add('borde-azul')




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

//                 -----------------------------------------------------
//                --------------------- PRUEBAS -------------------------
//                 -----------------------------------------------------

const comprarCestaBtn = document.querySelector('#comprar-cesta'); // Selecciona el botón "Comprar Cesta"

// Agrega un listener al botón "Comprar Cesta"
comprarCestaBtn.addEventListener('click', () => {
     // Obtiene los cursos seleccionados (que no tienen la clase 'borde-verde')
     const cursosSeleccionados = Array.from(tarjetasCursos).filter(curso => !curso.classList.contains('borde-verde'));

     // Elimina los cursos no seleccionados del carrito
     articulosCarrito = articulosCarrito.filter(curso => cursosSeleccionados.some(selCurso => selCurso.dataset.id === curso.id));

     // Actualiza la vista del carrito
     carritoHTML();

     // Calcula el precio total y muestra el botón "Pagar"
     const precioTotal = calcularPrecioTotal();
     mostrarPrecioTotal(precioTotal);
     mostrarBotonPagar();
});

// Función para calcular el precio total de los cursos en el carrito
function calcularPrecioTotal() {
     return articulosCarrito.reduce((total, curso) => total + parseFloat(curso.precio) * curso.cantidad, 0);
}

// Función para mostrar el precio total en el DOM
function mostrarPrecioTotal(precioTotal) {
     const precioTotalElement = document.createElement('p');
     precioTotalElement.textContent = `Precio Total: $${precioTotal.toFixed(2)}`;
     contenedorCarrito.appendChild(precioTotalElement);
}

// Función para mostrar el botón "Pagar"
function mostrarBotonPagar() {
     const pagarBtn = document.createElement('button');
     pagarBtn.textContent = 'Pagar';
     pagarBtn.addEventListener('click', () => {
          alert('Servicio temporalmente inactivo, inténtelo más tarde');
     });
     contenedorCarrito.appendChild(pagarBtn);
}