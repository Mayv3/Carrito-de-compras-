'use strict';

/*
 *  Berenguer, Bocutti
 */

let productos = [
    {
        id: 1,
        nombre: 'Pepe',
        descripcion: 'Descripción PEPE',
        precio: 12,
        imagen: 'producto-de-ejemplo.jpg',
        categoría: 'A',
    },
    {
        id: 2,
        nombre: 'Juan',
        descripcion: 'Descripción JUAN',
        precio: 32,
        imagen: 'producto-de-ejemplo.jpg',
        categoría: 'B',
    },
    {
        id: 3,
        nombre: 'Hernesto',
        descripcion: 'Descripción del producto 2',
        precio: 44,
        imagen: 'producto-de-ejemplo.jpg',
        categoría: 'A',
    },
    {
        id: 4,
        nombre: 'Claudio',
        descripcion: 'Descripción del producto 3',
        precio: 51,
        imagen: 'producto-de-ejemplo.jpg',
        categoría: 'C',
    },
    {
        id: 5,
        nombre: 'Schiaretti',
        descripcion: 'Descripción del producto 4',
        precio: 7,
        imagen: 'producto-de-ejemplo.jpg',
        categoría: 'C',
    },
    {
        id: 6,
        nombre: 'Villaruel ♥',
        descripcion: 'Descripción del producto 5',
        precio: 100,
        imagen: 'producto-de-ejemplo.jpg',
        categoría: 'C',
    },
];
const crearEtiqueta = (nombre = null, atributos = {}, contenido = '') => {
    if(!nombre){
        return;
    }

    let etiqueta = document.createElement(nombre);

    for (const atributo in atributos) {
        etiqueta.setAttribute(atributo, atributos[atributo]);
    }

    if (contenido) {
        etiqueta.innerText = contenido;
    }

    return etiqueta;
}


let ul = document.querySelector('ul');
let body = document.querySelector('#body');


/*Array donde se almacenan los productos*/
let arrayProductos = [];
let listaProductos = document.querySelector('#productos')

let total = 0;
let totaldeProductos = 0;



//Creamos los productos!


productos.forEach(producto => {
    //Creamos etiquetas de cada producto con sus datos
    let li = crearEtiqueta('li', {id: 'producto'}, '');
    ul.appendChild(li);

    let img = crearEtiqueta('img', {src:"producto-de-ejemplo.jpg", alt:"Nombre del producto"}, '')
    li.appendChild(img);

    let div = crearEtiqueta('div', '', '');
    li.appendChild(div)

    let h3 = crearEtiqueta('h3', '', `${producto.nombre}`);
    div.appendChild(h3)

    let descripcion = crearEtiqueta('p', '', `Descripcion`);
    div.appendChild(descripcion);

    let precio = crearEtiqueta('p', '', `Precio: $`);
    div.appendChild(precio);

    let span = crearEtiqueta('span', '', `${producto.precio}`);
    precio.appendChild(span)

    let categoria = crearEtiqueta('p', '', `Categoria: ${producto.categoría}`);
    div.appendChild(categoria);

    let button = crearEtiqueta('button', {class: 'btn-add-cart'}, 'Agregar');
    div.appendChild(button);

    let btnVerMas = crearEtiqueta('button', {class: 'btn-vermas'}, 'Ver mas');
    div.appendChild(btnVerMas);
});

const crearCarrito = () => {
    let modal = crearEtiqueta('div', { class: 'modal', id: 'modalCarrito' }, '');
    body.appendChild(modal);

    let contenedor = crearEtiqueta('div', '', '');
    modal.appendChild(contenedor);

    // Boton x
    let btnCerrar = crearEtiqueta('a', { class: 'cerrar', href: 'javascript:void(0)' }, 'X');
    contenedor.appendChild(btnCerrar);

    btnCerrar.addEventListener("click", ()=>{
        cantidadProductosCarrito()
        modal.remove();
    })
    
    let items = crearEtiqueta('p', '', 'Items: ');
    contenedor.appendChild(items);

    let spanItems = crearEtiqueta('span', '', `${totaldeProductos}`);
    items.appendChild(spanItems);

    items.appendChild(document.createTextNode(' - Total: '));

    let spanTotal = crearEtiqueta('span', '', `${total}`);
    items.appendChild(spanTotal); 

    let ulProductos = crearEtiqueta('ul', {id:'ulProductos'}, '');
    contenedor.appendChild(ulProductos);

    let btnVaciar = crearEtiqueta('button', '', 'Vaciar');
    contenedor.appendChild(btnVaciar)

    /*Se le agrega una evento para que borre los productos del array y resetee el html */

     btnVaciar.addEventListener("click", () => {
        // Vacía el array de productos
        arrayProductos = [];

        // Limpia el carrito
        ulProductos.innerHTML = '';

        // Reinicia los totales
        total = 0;
        totaldeProductos = 0;

        // Actualiza los totales en la vista del carrito
        actualizarVistaCarrito();
    });

    let btnCheckout = crearEtiqueta('button', '', 'Checkout');
    contenedor.appendChild(btnCheckout)

    
    // Reinicia los totales
    total = 0;
    totaldeProductos = 0;

    /*Crea los Li de los productos */

    const actualizarVistaCarrito = () => {
        // Limpia el carrito
        ulProductos.innerHTML = '';
    
        // Reinicia los totales
        total = 0;
        totaldeProductos = 0;
    
        arrayProductos.forEach(producto => {
            let productoLi = crearEtiqueta('li', '', `${producto.titulo} $${producto.precio} Cantidad: ${producto.cantidad}`);
            ulProductos.appendChild(productoLi);
    
            let btnEliminarLi = crearEtiqueta('button', '', 'X');
            productoLi.appendChild(btnEliminarLi);
    
            btnEliminarLi.addEventListener("click", () => {
                // Decrementa la cantidad del producto
                if (producto.cantidad > 1) {
                    producto.cantidad--;
                } else {
                    // Si la cantidad es 1 o menos, elimina el producto del array
                    arrayProductos = arrayProductos.filter(p => p.titulo !== producto.titulo);
                }
    
                // Actualiza los totales correctamente
                total -= parseInt(producto.precio);
                totaldeProductos--;
    
                // Actualiza la cantidad y el precio en la vista del carrito
                productoLi.innerHTML = `${producto.titulo} $${producto.precio} Cantidad: ${producto.cantidad}`;
    
                // Actualiza los totales en la vista del carrito
                actualizarVistaCarrito();
            });
    
            // Actualiza los totales correctamente
            total += parseInt(producto.cantidad * producto.precio);
            totaldeProductos += producto.cantidad;
        });
    
        // Actualiza los totales en la vista del carrito
        spanItems.innerText = totaldeProductos;
        spanTotal.innerText = total;
    };

    arrayProductos.forEach(e => {
        let producto = crearEtiqueta('li', '', `${e.titulo} $${e.precio} Cantidad: ${e.cantidad}`)
        ulProductos.appendChild(producto);

        let btnEliminarLi = crearEtiqueta('button', '', 'X');
        producto.appendChild(btnEliminarLi);

        // Actualiza los totales correctamente
        total += parseInt(e.cantidad * e.precio);
        totaldeProductos += e.cantidad;

        btnEliminarLi.addEventListener("click", () => {
            // Decrementa la cantidad del producto
            if (e.cantidad > 1) {
                e.cantidad--;
            } else {
                // Si la cantidad es 1 o menos, elimina el producto del array
                arrayProductos = arrayProductos.filter(product => product.titulo !== e.titulo);
                // Elimina el elemento li del carrito
                producto.remove();
            }

            // Actualiza los totales correctamente
            total -= parseInt(e.precio);
            totaldeProductos--;

            // Actualiza los totales en la vista del carrito
            actualizarVistaCarrito();
        });
    });

};

/*Se crea una funcion para agregar un span que muestre la cantidad de productos agregados*/

let cantidadProductosCarrito = ()=>{
        let carrito = document.querySelector('.AgregarCarrito')
        let cantidadProductosDiv = crearEtiqueta('span', {class:'totalproductos'}, `${totaldeProductos}`);
        carrito.appendChild(cantidadProductosDiv);

        let divTotal = document.querySelector('.total')
        let totalProductos = crearEtiqueta('span', {id: 'spantotal'}, `$${total}`);
        let totalEtiqueta = document.querySelector('#spantotal');
        if(totalEtiqueta){
            totalEtiqueta.remove()
        }
        divTotal.appendChild(totalProductos)
        

    };

/*Evento que ejecuta cada vez que clickeamos los botones de productos*/
listaProductos.addEventListener("click", e => {

    if (e.target.classList.contains('btn-add-cart')) {
        const producto = e.target.parentElement;
        const infoProducto = {
            cantidad: 1,
            titulo: producto.querySelector('h3').textContent,
            precio: parseInt(producto.querySelector('span').textContent),
        };
        console.log(infoProducto)
        const index = arrayProductos.findIndex(product => product.titulo === infoProducto.titulo);

        if (index !== -1) {
            arrayProductos[index].cantidad++;
        } else {
            arrayProductos.push(infoProducto);
        }

        // Reinicia los totales
        total = 0;
        totaldeProductos = 0;

        // Calcula los totales 
        arrayProductos.forEach(producto => {
            total += parseInt(producto.cantidad * producto.precio);
            totaldeProductos += producto.cantidad;
        });

        /*Se agrega la funcion al evento para que cada vez que clicke se sume en el span*/
        cantidadProductosCarrito();
    }

    if (e.target.classList.contains('btn-vermas')) {
        const producto = e.target.parentElement;
        const infoProducto = {
            cantidad: 1,
            titulo: producto.querySelector('h3').textContent,
            precio: parseInt(producto.querySelector('span').textContent),
        };

        const productoIndex = productos.findIndex(p => p.nombre === infoProducto.titulo);

        let modalproducto = crearEtiqueta('div', { class: 'modal', id: 'modalProducto' }, '');
        body.appendChild(modalproducto);

        let divProducto = crearEtiqueta('div', '', '');
        modalproducto.appendChild(divProducto);

        let btnCerrar = crearEtiqueta('a', { class: 'cerrar' }, 'X')
        modalproducto.appendChild(btnCerrar)

        btnCerrar.addEventListener("click", () => {
            modalproducto.remove();
        });

        let descripcion = crearEtiqueta('p', '', `${productos[productoIndex].descripcion}`);
        divProducto.appendChild(descripcion);

        let btnAgregar = document.querySelector('.btn-add-cart');
        let btnModalAgregar = btnAgregar.cloneNode(true);
        divProducto.appendChild(btnModalAgregar);

        btnModalAgregar.addEventListener("click", () => {
    
            const index = arrayProductos.findIndex(product => product.titulo === infoProducto.titulo);

            if (index !== -1) {
                arrayProductos[index].cantidad++;
            } else {
                arrayProductos.push(infoProducto);
            }

            total = 0;
            totaldeProductos = 0;

            arrayProductos.forEach(producto => {
                total += parseInt(producto.cantidad * producto.precio);
                totaldeProductos += producto.cantidad;
            });

            cantidadProductosCarrito();
        });

        // Agrega el botón clonado al modal
        
        
    }
});

/*Se crea un evento para abrir y cerrar el carrito*/

let btnCarrito = document.querySelector('#verCarrito');
btnCarrito.addEventListener("click", ()=>{
    crearCarrito();
});


const filtrarProductosPorCategoria = (categoria) => {

    const productosFiltrados = productos.filter(producto => 
        producto.categoría === categoria);

    ul.innerHTML = '';

    productosFiltrados.forEach(producto => {

        let li = crearEtiqueta('li', { id: 'producto' }, '');
        ul.appendChild(li);

        let img = crearEtiqueta('img', { src: "producto-de-ejemplo.jpg", alt: "Nombre del producto" }, '')
        li.appendChild(img);

        let div = crearEtiqueta('div', '', '');
        li.appendChild(div)

        let h3 = crearEtiqueta('h3', '', `${producto.nombre}`);
        div.appendChild(h3)

        let descripcion = crearEtiqueta('p', '', `Descripcion`);
        div.appendChild(descripcion);

        let precio = crearEtiqueta('p', '', `Precio: $`);
        div.appendChild(precio);

        let span = crearEtiqueta('span', '', `${producto.precio}`);
        precio.appendChild(span)

        let categoria = crearEtiqueta('p', '', `Categoria: ${producto.categoría}`);
        div.appendChild(categoria);

        let button = crearEtiqueta('button', { class: 'btn-add-cart' }, 'Agregar');
        div.appendChild(button);

        let btnVerMas = crearEtiqueta('button', { class: 'btn-vermas' }, 'Ver mas');
        div.appendChild(btnVerMas);
    });
};


// Agrega un evento clic a los enlaces de categoría

let categorias = document.querySelectorAll('.categoria');

categorias.forEach(enlace => {

    enlace.addEventListener('click', (event) => {
        event.preventDefault();
        
        const categoriaSeleccionada = enlace.getAttribute('data-categoria');
        filtrarProductosPorCategoria(categoriaSeleccionada);
    });
});