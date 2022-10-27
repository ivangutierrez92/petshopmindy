async function getData() {
  try {
    let response = await fetch("https://apipetshop.herokuapp.com/api/articulos");
    let art = await response.json();
    let articulos = art.response;
    let cardContainer = document.getElementById("card-container");

    let checkbox = document.getElementById("checkbox");
    let inputSearch = document.getElementById("js-search");

    let check = [];

    let toyFilt = articulos.filter(art => art.tipo.includes("Juguete"));
    let toyDestacados = toyFilt.filter(art => art.stock <= 3);
    filterSearch(check);

    // mostrarDestacados();

    /* function mostrarDestacados() {
      tituloContainer.innerHTML = `<h1 class="text center">Productos destacados</h1>`;
      toyDestacados.map(artDest => {
        makeCards(artDest, containerDest);
      });
    } */

    checkbox.addEventListener("change", filterSearch);
    inputSearch.addEventListener("keyup", filterSearch);

    function filterSearch(checkItem) {
      console.log("");
      /*   tituloContainer.innerHTML = ""; */

      filterchecked = [];
      checkItem = [...document.querySelectorAll('input[type="checkbox"]:checked')].map(element => element.value);

      // let checkedNumber = checkItem.map((value) =>Number(value))

      if (checkItem.length == 0) {
        filterchecked = [...toyFilt];
      } else {
        checkItem.forEach(value => {
          if (value == "barato") {
            filterchecked = filterchecked.concat(toyFilt.filter(juguete => juguete.precio < 400));
          } else if (value == "medio") {
            filterchecked = filterchecked.concat(
              toyFilt.filter(juguete => juguete.precio >= 400 && juguete.precio <= 700)
            );
          } else if (value == "caro") {
            filterchecked = filterchecked.concat(toyFilt.filter(juguete => juguete.precio >= 700));
          }
        });
      }

      // let filterchecked = toyFilt.filter((check) => checkedNumber.includes(check.precio) || checkedNumber.length === 0);
      let filterText = filterchecked.filter(text =>
        text.nombre.toLowerCase().includes(inputSearch.value.toLowerCase())
      );
      /* 
      if (checkItem.length == 0 && !inputSearch.value) {
        mostrarDestacados();
      } */

      cleanDom(cardContainer);

      filterText.sort((element1, element2) => element1.stock - element2.stock);
      let carrito = localStorage.getItem("carrito");
      if(!carrito) {
        carrito = [];
      } else {
        carrito = JSON.parse(carrito);
      }

      filterText.map(card => {
        let estaEnCarrito = carrito.findIndex(juguete => juguete._id == card._id) != -1;
        makeCards(card, cardContainer, estaEnCarrito)
      });

      let elementoProducto = document.querySelectorAll(".js-card");
      elementoProducto.forEach(elemento => {
        elemento.addEventListener("click", event => {
          let target = event.currentTarget
          let juguete = toyFilt.find(juguete => juguete._id === target.id);
          let carrito = localStorage.getItem("carrito");

          if (!carrito) {
            carrito = [];
          } else {
            carrito = JSON.parse(carrito);
          }
          console.log(carrito);
          if (carrito.findIndex(producto => producto._id === juguete._id) == -1) {
            carrito.push(juguete);

            localStorage.setItem("carrito", JSON.stringify(carrito));

            let boton = document.getElementById(`btn-carrito-${juguete._id}`);

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
          <div class="col js-card" id="${data._id}">
            <div class="card h-100 m-auto">
              <img src="${data.imagen}">
                <div class="card-body ">
                <h5 class="card-title">${data.nombre}</h5>
                <div class="d-flex justify-content-center w-100">
                  <button class="btn border border-info rounded-pill my-2">Precio:$ ${data.precio}</button>
                </div>
                <i href="#" id="btn-carrito-${
                  data._id
                }" class="border border-info rounded-pill text-center btn btn-cart fa-solid fa-cart-shopping ${enCarrito ? "btn-success" : ""}"> ${enCarrito ? "Agregado a Carrito" :"Agregar Carrito"}</i>
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
