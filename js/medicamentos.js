async function getData() {
  try {
    let response = await fetch("https://apipetshop.herokuapp.com/api/articulos");
    let art = await response.json();
    let articulos = art.response;
    let cardContainer = document.getElementById("card-container");

    let checkbox = document.getElementById("checkbox");
    let inputSearch = document.getElementById("js-search");

    let check = [];

    let medicamentoFilt = articulos.filter(art => art.tipo.includes("Medicamento"));
    filterSearch(check);

    checkbox.addEventListener("change", filterSearch);
    inputSearch.addEventListener("keyup", filterSearch);

    function filterSearch(checkItem) {
      filterchecked = [];
      checkItem = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(element => element.value);

      if (checkItem.length == 0) {
        filterchecked = [...medicamentoFilt];
      } else {
        checkItem.forEach(value => {
          if (value == "barato") {
            filterchecked = filterchecked.concat(medicamentoFilt.filter(medicamento => medicamento.precio < 400));
          } else if (value == "medio") {
            filterchecked = filterchecked.concat(
              medicamentoFilt.filter(medicamento => medicamento.precio >= 400 && medicamento.precio <= 700)
            );
          } else if (value == "caro") {
            filterchecked = filterchecked.concat(medicamentoFilt.filter(medicamento => medicamento.precio >= 700));
          }
        });
      }

      let filterText = filterchecked.filter(text =>
        text.nombre.toLowerCase().includes(inputSearch.value.toLowerCase())
      );

      cleanDom(cardContainer);

      filterText.sort((element1, element2) => element1.stock - element2.stock);
      let carrito = localStorage.getItem("carrito");
      if (!carrito) {
        carrito = [];
      } else {
        carrito = JSON.parse(carrito);
      }

      filterText.forEach(card => {
        let estaEnCarrito = carrito.findIndex(medicamento => medicamento._id == card._id) != -1;
        makeCards(card, cardContainer, estaEnCarrito);
      });

      if (!filterText.length) {
        cardContainer.innerHTML = `
        <h2 class="text-danger w-100 bg-white">
        No se pudo encontrar productos con los filtros establecidos, guau. Por favor, utilice otros filtros, guau.
        </h2>`;
      }

      let elementoProducto = document.querySelectorAll(".js-card");
      elementoProducto.forEach(elemento => {
        elemento.addEventListener("click", event => {
          let target = event.currentTarget;
          let medicamento = medicamentoFilt.find(medicamento => medicamento._id === target.id);
          let carrito = localStorage.getItem("carrito");

          if (!carrito) {
            carrito = [];
          } else {
            carrito = JSON.parse(carrito);
          }
          console.log(carrito);
          if (carrito.findIndex(producto => producto._id === medicamento._id) == -1) {
            carrito.push(medicamento);

            localStorage.setItem("carrito", JSON.stringify(carrito));

            let boton = document.getElementById(`btn-carrito-${medicamento._id}`);

            boton.classList.add("btn-success");
            boton.innerText = "Agregado a Carrito";
          }
        });
      });
    }

    function cleanDom(contain) {
      contain.innerHTML = "";
    }

    function makeCards(data, container, enCarrito) {
      container.innerHTML += `
          <div class="col">
            <div class="card h-100 m-auto js-card" id="${data._id}">
              <img src="${data.imagen}">
                <div class="card-body ">
                <h5 class="card-title">${data.nombre}</h5>
                <div class="d-flex justify-content-center w-100">
                  <div class="p-2 border border-info rounded-pill my-2">Precio: $${data.precio}</div>
                </div>
                <i href="#" id="btn-carrito-${
                  data._id
                }" class="border border-info rounded-pill text-center btn btn-cart fa-solid fa-cart-shopping ${
        enCarrito ? "btn-success" : ""
      }"> ${enCarrito ? "Agregado a Carrito" : "Agregar Carrito"}</i>
              </div>
              ${data.stock <= 3 ? `<div class="w-100 text-white bg-danger">¡Últimos productos!</div>` : ""}
            </div> 
          </div>
      `;
    }
  } catch (error) {
    console.log(error);
  }
}
getData();
