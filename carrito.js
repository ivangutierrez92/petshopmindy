const $productos = document.getElementById("js-productos");

async function obtenerDatos() {
  let productos = await fetch("https://apipetshop.herokuapp.com/api/articulos");
  productos = await productos.json();
  return productos.response;
}

async function prepararPrograma() {
  let carrito = localStorage.getItem("carrito");
  if (!carrito) {
    let productos = await obtenerDatos();
    localStorage.setItem("carrito", JSON.stringify(productos));
  }
}

async function empezarPrograma() {
  await prepararPrograma();
  let carrito = JSON.parse(localStorage.getItem("carrito"));
  carrito.forEach(producto => $productos.innerHTML += plantillaCarro(producto));
}

function plantillaCarro(producto) {
  return `
  <div class="col-12 col-sm-9 order-1 order-sm-0">
    <p class="mb-0 fs-4">${producto.nombre}</p>
    <p class="fs-4 text-brand fw-bold">${producto.tipo}</p>
    <div class="d-flex gap-3 flex-column flex-sm-row">
      <figure style="width: 200px" class="border">
        <img
          class="w-100"
          src="${producto.imagen}"
          alt="${producto.nombre}"
        />
      </figure>
      <div class="d-flex flex-column align-items-start justify-content-end">
        <div class="d-flex gap-5 justify-content-center align-items-center border-brand border-3 py-1 px-4">
          <span class="fs-4 bold text-brand">1</span>
          <div class="d-flex gap-2">
            <button class="btn-brand rounded-circle fs-tiny"><i class="fa-solid fa-minus"></i></button>
            <button class="btn-brand rounded-circle fs-tiny"><i class="fa-solid fa-plus"></i></button>
          </div>
        </div>
        <button class="text-brand"><i class="fa-solid fa-trash-can"></i> Eliminar</button>
      </div>
    </div>
  </div>
  <div class="col-12 col-sm-3 text-start text-sm-end d-flex flex-column mb-4">
    <p class="mb-0 fs-3 order-1 order-sm-0 text-brand">$${producto.precio}</p>
    <p class="fs-5 mb-0">Precio</p>
  </div>
  <hr class="my-5" />
  `;
}

empezarPrograma();
