"use strict";

/*
 *  Pereyra Carlo
 */

let products = [
  {
    id: 1,
    name: "Flores Minimalistas",
    description:
      "Esta colección destaca la belleza minimalista de las flores. Cada pétalo se convierte en una expresión artística que captura la esencia de la simplicidad en la naturaleza.",
    price: 10,
    image: "img/1.jpg",
    category: "Naturaleza",
  },
  {
    id: 2,
    name: "Black and White",
    description:
      "La obra maestra 'Black and White' explora el poder expresivo del blanco y negro. Cada detalle revela una narrativa única, destacando la fuerza de la dualidad.",
    price: 20,
    image: "img/2.jpg",
    category: "Abstracto",
  },
  {
    id: 3,
    name: "Rostros",
    description:
      "La colección 'Rostros' sumerge al espectador en la profundidad emocional de los retratos. Cada rostro cuenta su propia historia, una exploración de la complejidad humana a través del arte.",
    price: 30,
    image: "img/3.webp",
    category: "Retratos",
  },
  {
    id: 4,
    name: "Naturaleza",
    description:
      "La obra 'Naturaleza' revela la majestuosidad de la naturaleza. Cada pieza es una ventana a paisajes asombrosos y momentos efímeros capturados en el tiempo.",
    price: 40,
    image: "img/4.jpg",
    category: "Naturaleza",
  },
  {
    id: 5,
    name: "Linea Intrépida",
    description:
      "La colección 'Linea Intrépida' explora el arte audaz de líneas y formas expresivas. Cada obra desafía las convenciones y lleva al espectador a una travesía visual llena de provocación y reflexión.",
    price: 50,
    image: "img/5.webp",
    category: "Abstracto",
  },
  {
    id: 6,
    name: "Formas del Amanecer",
    description:
      "La obra 'Formas del Amanecer' es una exploración artística de las formas que emergen con el amanecer. Cada imagen captura la magia de la transición entre la oscuridad y la luz, invitándote a contemplar el renacer diario.",
    price: 60,
    image: "img/6.jpg",
    category: "Naturaleza",
  },
];

// Variables globales
let allProducts = [];
let productsList = document.getElementById("productos");
let body = document.getElementById("body");
let btnShowCart = document.getElementById("verCarrito");
let ulProducts; 

// Función para crear etiquetas

const createTag = (tagName, attributes = {}, content = "", children = []) => {
  if (!tagName) return null;

  let element = document.createElement(tagName);
  Object.keys(attributes).forEach((attr) => {
    element.setAttribute(attr, attributes[attr]);
  });

  if (typeof content === "string" || typeof content === "number") {
    element.textContent = content;
  } else if (content instanceof Node) {
    element.appendChild(content);
  }

  children.forEach((child) => {
    if (child instanceof Node) {
      element.appendChild(child);
    }
  });

  return element;
};
const clearElement = (element) => {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
};
const deleteBanner = (banner)=>{
  banner.remove();
}
const updateLocalStorage = () => {
  localStorage.setItem('cart', JSON.stringify(allProducts));
};

// Crear productos

let createProducts = () => {
  products.forEach((product) => {
    let img = createTag("img", {
      src: product.image,
      alt: `Imagen de ${product.name}`,
      class: "imagenLi",
    });

    let li = createTag(
      "li",
      { "data-id": product.id, class: "liProduct" },
      "",
      [
        img,
        createTag("div", { class: "infoProduct" }, "", [
          createTag("h3",'', product.name),
          createTag("p", {}, `Precio: $`, [
            createTag("span", {}, product.price.toString()),
          ]),
          createTag("p", "", `${product.category}`),
          createTag('div', {class:'buttonContainer'}, '', [
            createTag("button", { class: "btn-show-more" }, "Ver Más"),
            createTag("button", { class: "btn-add-cart" }, "Comprar"),
          ]),
          
        ]),
      ]
    );

    productsList.appendChild(li);
  });
};

let addedProducts = () => {
  body.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-add-cart")) {
      const productLi = e.target.closest("li");
      const productId = parseInt(productLi.dataset.id);
      const product = products.find((p) => p.id === productId);

      const existingProduct = allProducts.find((p) => p.id === productId);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        allProducts.push({ ...product, quantity: 1 });
      }
      updateLocalStorage()
      updateMiniCart();
    }
  });
};

// Crear Modal y Cerrar

let showModal = () => {
  productsList.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn-show-more")) {
      let productLi = e.target.closest("li");
      let productId = parseInt(productLi.dataset.id);
      let product = products.find((p) => p.id === productId);

      if (product) {
        let modal = createTag("div", { class: "modal opacity0", id: 'modalShowMore' }, "", [
          createTag("div", { class: "divModal"}, "", [
            createTag("div", { class: "div-image" }, "", [
              createTag(
                "img",
                { src: `${product.image}`, class: "modal-image" },
                ""
              ),
            ]),
            createTag("div", { class: "info-description" }, "", [
              createTag("h3", "", `${product.name}`),
              createTag("span", "", `$${product.price}`),
              createTag("p", {class: 'category'}, `${product.category}`),
              createTag("p", "", `${product.description}`),
              createTag('div', {class: 'containerButtons'}, '', [
                createTag("button", { class: "cerrar" }, "Atras"),
                createTag("button", { class: "btn-add-cart" }, "Agregar")
              ])
            ]),
          ]),
        ]);

        
        // Agregar evento clic al botón "Agregar" dentro del modal

        modal.querySelector(".btn-add-cart").addEventListener("click", () => {
          const existingProduct = allProducts.find((p) => p.id === productId);
          if (existingProduct) {
            existingProduct.quantity += 1;
          } else {
            allProducts.push({ ...product, quantity: 1 });
          }

          updateMiniCart();
        });
        smoothModal('modalShowMore')
        body.appendChild(modal);


        // Agregar evento clic al botón "cerrar" dentro del modal
        let btnCerrar = document.querySelector('.cerrar')

        btnCerrar.addEventListener('click', ()=>{
          closeModal('modalShowMore')
        })
      }
    }
  });
};
const closeModal = (modalId) => {

  const modal = document.getElementById(modalId);

  if(modal.classList.contains('opacity1')){
    modal.classList.remove('opacity1')
    modal.classList.add('opacity0')
  }

  setTimeout(function() {

     modal.remove()
  }, 300);

  updateMiniCart();
};

// Crear carrito y actualizar sus datos

let createCart = () => {
  //Evento en el cual se crea el carrito y todas sus etiquetas
  btnShowCart.addEventListener("click", () => {
    let modal = document.querySelector("#modalCarrito");
    if (!modal) {
      modal = createTag("div", { class: "modal opacity0", id: "modalCarrito" }, "", [
        createTag("a",{ class: "cerrar", href: "javascript:void(0)", id: "btnClose" },"X"),
        createTag("div", { class: "divContainer" }, ""),
      ]);
      body.appendChild(modal);
      smoothModal('modalCarrito');
    }

    const container = modal.querySelector("div");
    clearElement(container);

    const ulProducts = createTag("ul", {});

    createLiProducts(ulProducts)

    //Evento que activa la funcion que cierra el modal del carrito :D

    const closeBtn = modal.querySelector(".cerrar");
    closeBtn.addEventListener("click", () => {
      closeModal("modalCarrito");
    });

    // Funcionalidad para actualizar los totales

    const totalText = `Items: ${allProducts.reduce(
      (acc, product) => acc + product.quantity,
      0
    )} - Total: $${allProducts
      .reduce((acc, product) => acc + product.price * product.quantity, 0)
      .toFixed(2)}`;
    const totalParagraph = createTag("p", {class: 'totalInfo'}, totalText);
    container.appendChild(totalParagraph);
    container.appendChild(ulProducts);

    // Crear botones de "Vaciar", "Checkout", y eliminar productos solo si hay productos en el carrito

    if (allProducts.length > 0) {

      let containerButtons = createTag('div', {class: 'buttonsCart'}, '')

      const btnEmpty = createTag("button", { class: "btnEmpty" }, "Vaciar");
      const btnCheckout = createTag("button",{ class: "checkout" },"Checkout");

      containerButtons.appendChild(btnEmpty);
      containerButtons.appendChild(btnCheckout);

      container.appendChild(containerButtons)

      // Funcionalidad para vaciar el contenido
      btnEmpty.addEventListener("click", () => {
        allProducts = [];
        clearElement(ulProducts);

        const totalText = `Items: 0 - Total: $0.00`;
        const totalParagraph = container.querySelector("p");
        totalParagraph.textContent = totalText;

        // Eliminar los botones de "Vaciar" y "Checkout"
        btnEmpty.remove();
        btnCheckout.remove();
        updateLocalStorage()
      });

      //Funcionalidad para eliminar los productos
      ulProducts.addEventListener("click", (e) => {
        if (e.target.classList.contains("remove-product")) {
          const productLi = e.target.closest("li.product-li");
          const productId = parseInt(
            productLi.querySelector("a.remove-product").dataset.id
          );

          // Encontrar el producto en el array allProducts
          const selectedProduct = allProducts.find(
            (product) => product.id === productId
          );

          // Si el producto tiene más de una unidad, reducir la cantidad
          if (selectedProduct.quantity > 1) {
            selectedProduct.quantity -= 1;
            // Actualizar visualmente la cantidad en el elemento HTML
            const quantityElement = productLi.querySelector(".quantity");
            quantityElement.textContent = ` x ${selectedProduct.quantity}`;
          } else {
            // Si solo hay una unidad, eliminar el producto del array y del carrito visualmente
            allProducts = allProducts.filter(
              (product) => product.id !== productId
            );
            // Eliminar visualmente el elemento del carrito
            productLi.remove();
          }

          // Actualizar visualmente el total
          const totalText = `Items: ${allProducts.reduce(
            (acc, product) => acc + product.quantity,
            0
          )} - Total: $${allProducts
            .reduce((acc, product) => acc + product.price * product.quantity, 0)
            .toFixed(2)}`;
          const totalParagraph = container.querySelector("p");
          totalParagraph.textContent = totalText;

          // Si no hay productos, eliminar los botones de "Vaciar" y "Checkout"
          if (allProducts.length === 0) {
            btnEmpty.remove();
            btnCheckout.remove();
          }
        }
        updateLocalStorage()
      });

      createPaymentProcess(btnCheckout);
    }
  });
};
const updateMiniCart = () => {
  const miniCartItems = document.getElementById("itemsCount");
  const miniCartTotal = document.getElementById("totalPrice");

  miniCartItems.textContent = allProducts.reduce(
    (sum, product) => sum + product.quantity,
    0
  );
  miniCartTotal.textContent = allProducts
    .reduce((sum, product) => sum + product.price * product.quantity, 0)
    .toFixed(2);
};
const createLiProducts = (ul)=>{
  allProducts.forEach((product) => {
    const li = createTag("li", { class: "product-li" }, "", [
      createTag('img', {class: 'imgCart', src: `${product.image}`}, ''),
      createTag("div", { class: "info-product-cart" }, "", [
        createTag("p", "", `${product.name}`),
        createTag("span", { class: "priceProduct" }, `$${product.price}`),
        createTag("span", { class: "quantity" }, `x ${product.quantity}`),
      ]),
      createTag("a",{href: "#",class: "remove-product",id: "btnDeleteLi","data-id": product.id},"Eliminar"),
    ]);

    ul.appendChild(li);
  });
}

// Filtrar productos por categoria
const createTagFiltered = (category) => {
  clearElement(productsList);

  const filteredProducts = category
    ? products.filter((p) => p.category === category)
    : products;

  filteredProducts.forEach((product) => {
    let img = createTag("img", {
      src: product.image,
      alt: `Imagen de ${product.name}`,
      class: "imagenLi",
    });

    let li = createTag(
      "li",
      { "data-id": product.id, class: "liProduct" },
      "",
      [
        img,
        createTag("div", { class: "infoProduct" }, "", [
          createTag("h3", {}, product.name),
          createTag("p", {}, `Precio: $`, [
            createTag("span", {}, product.price.toString()),
          ]),
          createTag("p", "", `Categoria: ${product.category}`),
        ]),
        createTag('div', {class:'buttonContainer'}, '', [
          createTag("button", { class: "btn-show-more" }, "Ver Más"),
          createTag("button", { class: "btn-add-cart" }, "Comprar"),
        ]),
      ]
    );

    productsList.appendChild(li);
  });
};
const filterProducts = () => {
  let categories = document.querySelectorAll(".category-link");
  categories.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();

      const categorySelected = link.getAttribute("data-category");
      createTagFiltered(categorySelected);

      if (categorySelected === "Todo") {
        productsList.innerHTML = "";
        createProducts();
        let banner = document.querySelector(".banner");
        if (banner) banner.remove();
      } else {
        const banners = [
          "./img/banners/banner1.jpg",
          "./img/banners/banner2.PNG",
        ];

        if (banners.length > 1) {
          const bannersPrevious = document.querySelector(".banner");
          if (bannersPrevious) {
            bannersPrevious.remove();
          }
        }

        const randomIndex = Math.floor(Math.random() * banners.length);
        let randomBanner = banners[randomIndex];

        let banner = createTag("img",{src: `${randomBanner}`, class: "banner" },"");
        body.appendChild(banner);

        // Eliminar banner al pasar 10 segundos
        setTimeout(function () {
          deleteBanner(banner);
        }, 10000);

      }
    });
  });
};


// -- Creacion del proceso de compra -- //

const createPaymentProcess = (btnCheckOut) => {
  btnCheckOut.addEventListener("click", () => {
    
    closeModal('modalCarrito')
    productsList.innerHTML = '';
    createPaymentTags()
    
  });
};
const createLiPayment = (ul)=>{
  allProducts.forEach((product) => {
    const li = createTag("li", { class: "product-li-cart" }, "", [
      createTag("div", { class: "info-product-cart" }, "", [
        createTag('img', {src: `${product.image}`, class: 'productImage'}, ''),
        createTag("p", "", `${product.name}`),
        createTag("span", { class: "priceProduct" }, `$${product.price}`),
        createTag("span", { class: "quantity" }, `x ${product.quantity}`),
      ]),
    ]);

    ul.appendChild(li);
  });
}

const createPaymentTags = () => {
  let modal = createTag('div', { class: 'modal opacity0', id: 'paymentModal' }, '', [
    createTag('div', { id: 'paymentDiv' }, '', [
      createTag('div', { class: 'containerPay' }, '', [
        createTag('div', { class: 'imgPayment' }, '', [
          createTag('img', { src: 'img/user.png', class: 'imgPay opacity1' }, '')
        ]),
        createTag('div', { class: 'paymentProducts' }, '', [
          createTag('p', '', `Items: ${allProducts.reduce(
            (acc, product) => acc + product.quantity,
            0
          )} - Total: $${allProducts
            .reduce((acc, product) => acc + product.price * product.quantity, 0)
            .toFixed(2)}`,),
          createTag('ul', { class: 'paymentUl' }, '')
        ]),
        createTag('div', { class: 'form' }, '', [
          createTag('form', '', '', [
            createTag('div', {class: 'inputName'}, '', [
              createTag('div', '', '', [
                createTag('label', '', 'Nombre y apellido'),
                createTag('input', {name: 'nombre', type: 'text',placeholder: 'Claudio Herrera',class: 'user', required: 'true',pattern: '(?=.*[A-Za-zÁÉÍÓÚáéíóúñÑ])[A-Za-zÁÉÍÓÚáéíóúñÑ\\s]+',title: 'Solo se permiten letras y espacios'}, ''),
              ]),
              createTag('div', {class: 'inputTel'}, '', [
                createTag('label', '', 'Telefono'),
                createTag('input', {name: 'Tel', type: 'number', placeholder: '323 324 3241', class: 'user', required: 'true' }, '')
              ]),
            ]),
            createTag('div', {class: 'inputEmail'}, '', [
              createTag('label', '', 'Correo electronico'),
              createTag('input', {name: 'email', type: 'email', placeholder: 'Claudioherrera@gmail.com', class: 'user', required: 'true' }, '')
            ]),
            createTag('div', {class: 'inputDireccion'}, '', [
              createTag('div', '', '', [
                createTag('label', '', 'Domicilio de entrega'),
                createTag('input', {name: 'direccion',type: 'text',placeholder: 'Av don bosco 4700',class: 'user',required: 'true',pattern: '(?=.*[A-Za-z])(?=.*[0-9])[A-Za-z0-9\\s]+',title: 'Debe contener al menos una letra y un numero de direccion (Solo letras y numeros)'
              }, ''),
              ]),
              createTag('div', '', '', [
                createTag('label', '', 'Fecha de entrega'),
                createTag('input', {name: 'direccion',type: 'date',required: 'true'}, ''),
              ])
            ]),
            createTag('div', { class: 'cardInfo' }, '', [
              createTag('div', '', '', [
                createTag('label', '', 'Número de la tarjeta'),
                createTag('input', {name: 'numero de tarjeta', type: 'number', placeholder: '0000 0000 0000 0000', class: 'cardNumber', min: '0', required: 'true' }, ''),
              ]),
              createTag('div', '', '', [
                createTag('label', '', 'CVV'),
                createTag('input', {name: 'codigo de seguridad', type: 'number', placeholder: '000', pattern: '\\d', maxlength: '3', class: 'cvv', required: 'true' }, ''),
              ])
            ]),
            createTag('div', { class: 'buttonsContainer' }, '', [
              createTag('button', { id: 'back' }, 'Atras'),
              createTag('button', { type: 'submit', id: 'continue'}, 'Comprar')
            ]),
          ])
        ])
      ])
    ])
  ]);

  smoothModal('paymentModal')
  body.appendChild(modal)

  let paymentUl = document.querySelector('.paymentUl')
  createLiPayment(paymentUl)

  // Cerrar el proceso de pago

  let btnBack = document.querySelector('#back');
  btnBack.addEventListener('click', (e) => {
    e.preventDefault()
    closeModal('paymentModal')
    console.log('payment process delete')
    createProducts()
  });

  max3()
  max16()
  changeImage()


  const form = modal.querySelector('form');


 validateBtnBuy()
  
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if(validateForm()){

      confirmPay();
    }
  });
};
const validateBtnBuy = ()=>{

    let btnContinue = document.getElementById('continue');
    btnContinue.addEventListener('mouseover', ()=>{

      btnContinue.classList.add('disabled')
      btnContinue.setAttribute("disabled", "true");
      if(validateForm()){
        btnContinue.classList.remove('disabled')
        btnContinue.removeAttribute('disabled')
      }

    })

}
const confirmPay = ()=>{
  let modal = createTag('div', {class: 'modal opacity0', id: 'confirmModal'}, '',[
    createTag('div', {id: 'confirmDiv'}, '', [
      createTag('img', {src: './img/confirmarPago.jpg', alt: 'Confirmar pago'}, ''),
      createTag('p', '', 'Por favor, confirme la compra'),
      createTag('div', {class: 'confirmButtons'}, '', [
        createTag('button', {class: 'back'}, 'Cancelar'),
        createTag('button', {class: 'confirm'}, 'Confirmar'),
      ])
    ])
  ])
  smoothModal('confirmModal')
  body.appendChild(modal)



  let btnBack = document.querySelector('.back');
  btnBack.addEventListener('click', ()=>{
    closeModal('confirmModal')
  })

  let btnConfirm = document.querySelector('.confirm');
  btnConfirm.addEventListener('click', ()=>{
    closeModal('confirmModal')
    closeModal('paymentModal')
    paymentSucess()
  })


}
const paymentSucess = ()=>{
  let modal = createTag('div', {class: 'modal opacity0', id: 'paymentSucess'}, '', [
      createTag('div', {id: 'containerSucess'}, '', [
        createTag('img', {src: 'img/sucess.png', class: 'imgSucess'}, ''),
        createTag('div', {class: 'infoPay'}, '', [
          createTag('h2', '', 'PAGO REALIZADO CON EXITO'),
          createTag('p', '', 'Gracias por elegirnos! te enviaremos un email con tu factura de compra.'),
          createTag('button', {class: 'home'}, 'Volver')
        ]),
      ])
  ])
  
  
  body.appendChild(modal)
  smoothModal('paymentSucess')
  let btnVolver = document.querySelector('.home');
  
  btnVolver.addEventListener('click', ()=>{
    closeModal('paymentSucess');
    createProducts()
  })

  allProducts = [];
  clearElement(ulProducts);
}
const validateForm = () => {
  let validity = true;

  // Validación del nombre y apellido
  const nameInput = document.querySelector('input[name="nombre"]');
  if (!/^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/.test(nameInput.value)) {
    showError(nameInput, 'Ingrese un nombre válido.');
    validity = false;
  } else {
    hideError(nameInput);
  }

  // Validación del correo electrónico
  const emailInput = document.querySelector('input[name="email"]');
  if (!/^\S+@\S+\.\S+$/.test(emailInput.value)) {
    showError(emailInput, 'Ingrese un correo electrónico válido.');
    validity = false;
  } else {
    hideError(emailInput);
  }

  // Validación de la dirección
  const direccionInput = document.querySelector('input[name="direccion"]');
  if (!/^[A-Za-z0-9\s]+$/.test(direccionInput.value)) {
    showError(direccionInput, 'Ingrese una dirección válida.');
    validity = false;
  } else {
    hideError(direccionInput);
  }

  // Validación del número de tarjeta
  const cardNumberInput = document.querySelector('input[name="numero de tarjeta"]');
  if (!/^\d{16}$/.test(cardNumberInput.value)) {
    showError(cardNumberInput, 'Tarjeta de credito invalida.');
    validity = false;
  } else {
    hideError(cardNumberInput);
  }

  // Validación del CVV
  const cvvInput = document.querySelector('input[name="codigo de seguridad"]');
  if (!/^\d{3}$/.test(cvvInput.value)) {
    showError(cvvInput, 'Codigo de seguridad incorrecto.');
    validity = false;
  } else {
    hideError(cvvInput);
  }
  return validity;
};


const showError = (input, message) => {
  const errorSpan = input.parentElement.querySelector('.error-message');
  if (!errorSpan) {
    const span = createTag('span', { class: 'error-message' }, message);
    input.parentElement.appendChild(span);
  } else {
    errorSpan.textContent = message;
  }
};
const hideError = (input) => {
  const errorSpan = input.parentElement.querySelector('.error-message');
  if (errorSpan) {
    errorSpan.remove();
  }
};


// Funciones
const changeImage = () => {
  let inputCardNumber = document.querySelector('.cardNumber');
  let isCardImage = false;

  inputCardNumber.addEventListener('focus', () => {

    if (!isCardImage) {
      console.log('Imagen cambiada a card');
      smooth('./img/card.png')
      isCardImage = true;
    }
  });

  let inputsUser = document.querySelectorAll('.user');

  inputsUser.forEach(input => {
    input.addEventListener('focus', () => {
      if (isCardImage) {
        smooth('./img/user.png')
        isCardImage = false;
      }
    });
  });
};
let smooth = (src)=>{
      let img = document.querySelector('.imgPay');
      img.classList.remove('opacity1')
      img.classList.add('opacity0')

      setTimeout(() => {
      if (img.classList.contains('opacity0')) {
        img.classList.remove('opacity0');
        img.setAttribute('src', src);
        img.classList.add('opacity1');
        
      }
    }, 480);
}
let smoothModal = (id)=>{
  setTimeout(function() {
    let modal = document.getElementById(id);
    if(modal.classList.contains('opacity0')){
      modal.classList.remove('opacity0')
      modal.classList.add('opacity1')
    }
  }, 10);
}
let max3 = ()=>{
  // Evento para que tenga un limite de 3 el input
  document.querySelector('.cvv').addEventListener('input', function(e){
    let value = e.target.value

    if(value.length > 3){
      e.target.value = value.slice(0,3)
    }
  })
}
let max16 = ()=>{
  // Evento para que tenga un limite de 16 el input
  document.querySelector('.cardNumber').addEventListener('input', function(e){
    let value = e.target.value

    if(value.length > 3){
      e.target.value = value.slice(0,16)
    }

    if(value < 0){
      e.target.value = '0'
    }
  })
}

// Inicializar la funcionalidad del carrito
document.addEventListener("DOMContentLoaded", () => {
  createProducts();
  addedProducts();
  createCart();
  createTagFiltered();
  showModal();
  filterProducts();

  const storedCart = localStorage.getItem('cart');
  if (storedCart) {
    allProducts = JSON.parse(storedCart);
    updateMiniCart();
  }
});

