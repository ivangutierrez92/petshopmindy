const $productos = document.getElementById("js-productos");
const $precioTotal = document.getElementById("js-precio-total");
const $cantidadProductos = document.getElementById("js-cantidad-productos");
const $vaciarCarro = document.getElementById("js-vaciar-carro");
const $botonPagar = document.getElementById("js-boton-pagar");
const $main = document.getElementById("js-main");

function obtenerAlmacenamiento() {
  let carrito = localStorage.getItem("carrito");
  if (!carrito) {
    return [];
  }
  return JSON.parse(carrito);
}

function empezarPrograma() {
  let carrito = obtenerAlmacenamiento();

  if (!carrito.length) {
    printNotFoundMessage($main);
    return;
  }

  carrito = carrito.map(producto => {
    let cantidad = producto.cantidad || 1;
    return { ...producto, cantidad };
  });

  carrito.forEach(producto => ($productos.innerHTML += plantillaCarro(producto)));
  actualizarValores(carrito);

  let $botonesEliminar = document.querySelectorAll(".js-boton-eliminar");
  $botonesEliminar.forEach(boton => {
    boton.addEventListener("click", e => {
      let id = e.target.id.split("-")[1];
      carrito = eliminarProducto(id, carrito);
      if (!carrito.length) {
        printNotFoundMessage($main);
      }
    });
  });

  let $botonesSumar = document.querySelectorAll(".js-boton-sumar");
  $botonesSumar.forEach(boton => {
    boton.addEventListener("click", e => {
      let id = e.currentTarget.id.split("-")[1];
      carrito = sumarProducto(id, carrito);
    });
  });

  let $botonesRestar = document.querySelectorAll(".js-boton-restar");
  $botonesRestar.forEach(boton => {
    boton.addEventListener("click", e => {
      let id = e.currentTarget.id.split("-")[1];
      carrito = restarProducto(id, carrito);
    });
  });

  $vaciarCarro.addEventListener("click", () => {
    printNotFoundMessage($main);
    localStorage.removeItem("carrito");
  });

  $botonPagar.addEventListener("click", finalizarCompra);
}

function plantillaCarro(producto) {
  return `
  <div id="${producto._id}">
  <div class="d-flex flex-sm-row flex-column">
  <div class="order-1 order-sm-0 flex-grow-1">
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
        
          <div class="d-flex">
            <button id="restar-${producto._id}" class="btn-brand rounded-0 fs-tiny js-boton-restar"><i class="fa-solid fa-minus"></i></button>
            <span class="fs-4 px-2 bold text-brand border" id="numero-${producto._id}">${producto.cantidad}</span>
            <button id="sumar-${producto._id}" class="btn-brand rounded-0 fs-tiny js-boton-sumar"><i class="fa-solid fa-plus"></i></button>
          </div>
        <button id="boton-${producto._id}" class="text-brand js-boton-eliminar"><i class="fa-solid fa-trash-can"></i> Eliminar</button>
      </div>
    </div>
  </div>
  <div class="text-start text-sm-end d-flex flex-column mb-4">
    <p class="mb-0 fs-3 order-1 order-sm-0 text-brand">$${producto.precio}</p>
    <p class="fs-5 mb-0">Precio</p>
  </div>
  </div>
  <hr class="my-5" />
  </div>
  `;
}

function printNotFoundMessage(container) {
  container.innerHTML = "<h3>No hay productos en el carro</h3>";
}

function actualizarValores(lista) {
  let valoresLista = lista.reduce(
    (a, b) => {
      a.cantidad += b.cantidad;
      a.total += b.precio * b.cantidad;
      return a;
    },
    { cantidad: 0, total: 0 }
  );

  $cantidadProductos.innerHTML = `${valoresLista.cantidad} ${valoresLista.cantidad === 1 ? "Producto" : "Productos"}`;
  $precioTotal.innerHTML = `$${valoresLista.total}`;
}

function sumarProducto(id, lista) {
  lista.forEach(producto => {
    if (producto._id == id && producto.stock >= producto.cantidad + 1) {
      producto.cantidad += 1;
      let $numeroProductos = document.getElementById(`numero-${id}`);
      $numeroProductos.innerHTML = `${producto.cantidad}`;
    }
  });
  actualizarValores(lista);
  localStorage.setItem("carrito", JSON.stringify(lista));
  return lista;
}

function restarProducto(id, lista) {
  lista.forEach(producto => {
    if (producto._id == id && producto.cantidad > 1) {
      producto.cantidad -= 1;
      let $numeroProductos = document.getElementById(`numero-${id}`);
      $numeroProductos.innerHTML = `${producto.cantidad}`;
    }
  });

  actualizarValores(lista);
  localStorage.setItem("carrito", JSON.stringify(lista));
  return lista;
}

function eliminarProducto(id, lista) {
  let listaFiltrada = lista.filter(elemento => elemento._id != id);

  let $producto = document.getElementById(id);
  $producto.remove();

  actualizarValores(listaFiltrada);
  localStorage.setItem("carrito", JSON.stringify(listaFiltrada));
  return listaFiltrada;
}

function finalizarCompra() {
  localStorage.removeItem("carrito");
  alert(
    "¡Guau!, la compra se ha realizado con los datos de transacción automática que conseguimos. Los productos llegarán a la brevedad. ¡Gracias por su compra!"
  );
  location.href = "./index.html";
}

empezarPrograma();
