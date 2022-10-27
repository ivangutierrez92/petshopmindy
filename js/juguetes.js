async function getData() {
  try {
    let response = await fetch(
      "https://apipetshop.herokuapp.com/api/articulos"
    );
    let art = await response.json();
    let articulos = art.response;
    let cardContainer = document.getElementById("card-container");
    let containerDest = document.getElementById("destacado");
    let checkbox = document.getElementById("checkbox");
    let inputSearch = document.getElementById("js-search");
    let tituloContainer = document.getElementById("titulo");
    let check = [];

    let toyFilt = articulos.filter((art) => art.tipo.includes("Juguete"));
    let toyDestacados = toyFilt.filter((art) => art.stock <= 3);
    filterSearch(check);

    // mostrarDestacados();

    function mostrarDestacados() {
      tituloContainer.innerHTML = `<h1 class="text center">Productos destacados</h1>`;
      toyDestacados.map((artDest) => {
        makeCards(artDest, containerDest);
      });
    }
    let ordenPorPrecio = [...toyFilt].sort(
      (element1, element2) => element1.precio - element2.precio
    );
    let menorPrecio = ordenPorPrecio[0];
    let mayorPrecio = ordenPorPrecio[ordenPorPrecio.length - 1];

    checkbox.addEventListener("change", filterSearch);
    inputSearch.addEventListener("keyup", filterSearch);

    function filterSearch(checkItem) {
      containerDest.innerHTML = "";
      tituloContainer.innerHTML = "";

      filterchecked = [];
      checkItem = [
        ...document.querySelectorAll('input[type="checkbox"]:checked'),
      ].map((element) => element.value);
      console.log(
        "🚀 ~ file: juguetes.js ~ line 47 ~ filterSearch ~ checkItem",
        checkItem
      );

      // let checkedNumber = checkItem.map((value) =>Number(value))

      if (checkItem.length == 0) {
        filterchecked = [...toyFilt];
      } else {
        checkItem.forEach((value) => {
          if (value == "barato") {
            filterchecked=filterchecked.concat(
              toyFilt.filter((juguete) => juguete.precio < 400)
            );
          } else if (value == "medio") {
            filterchecked=filterchecked.concat(
              toyFilt.filter(
                (juguete) => juguete.precio >= 400 && juguete.precio <= 700
              )
            );
          } else if (value == "caro") {
           filterchecked = filterchecked.concat(
              toyFilt.filter((juguete) => juguete.precio >= 700)
            );
          }
        });
      }
      console.log(filterchecked);

      // let filterchecked = toyFilt.filter((check) => checkedNumber.includes(check.precio) || checkedNumber.length === 0);
      let filterText = filterchecked.filter((text) =>
        text.nombre.toLowerCase().includes(inputSearch.value.toLowerCase())
      );

      if (checkItem.length == 0 && !inputSearch.value) {
        mostrarDestacados();
      }

      cleanDom(cardContainer);
      filterText.map((card) => makeCards(card, cardContainer));
    }
    console.log(
      "🚀 ~ file: juguetes.js ~ line 87 ~ filterSearch ~ filterchecked",
      filterchecked
    );

    function cleanDom(contain) {
      contain.innerHTML = "";
    }

    function makeCards(data, container) {
      container.innerHTML += `
          <div class="col">
              <div class="card h-100">
              <img src="${data.imagen}">
                <div class="card-body ">
                <h5 class="card-title">${data.nombre}</h5>
                <div class="d-flex justify-content-center w-100">
                  <button class="btn border border-info rounded-pill my-2">Precio:$ ${data.precio}</button>
                </div>
                </h6>
                <i href="#" class="border border-info rounded-pill text-center btn  btn-cart fa-solid fa-cart-shopping"> Agregar Carrito</i>
              </div>
            </div> 
          </div>
      `;
    }
  } catch (error) {}
}
getData();
