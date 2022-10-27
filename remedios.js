async function remedios() {
    try {
        let remediosApi = await fetch("https://apipetshop.herokuapp.com/api/articulos")
        remediosApi = await remediosApi.json()
        let arrayRemedios = remediosApi.response
        let todoRemedios = arrayRemedios.filter(item => item.tipo.toLowerCase() == "medicamento")
        console.log(todoRemedios)
        let remediosDestacados = todoRemedios.filter(item => item.stock <= 3)
        console.log(remediosDestacados)
        imprimirRemedios(remediosDestacados, "contenedor_destacados")
        let remediosStock = todoRemedios.filter(item => item.stock > 3)
        imprimirRemedios(remediosStock, "contenedor_remedios")
        console.log(remediosStock)
        printCategories(todoRemedios, "checks")




    } catch (error) {
        console.log(error)
    }



}
remedios()
// funciones para renderizar cartas

function imprimirRemedios(array, id) {
    document.querySelector(`#${id}`).innerHTML = ""
    array.forEach(event => {
        document.querySelector(`#${id}`).innerHTML +=
            `
            <div class="card gap-3" style="width: 14rem;">
            <i href="#" class=" text-center btn btn-danger btn-cart fa-solid fa-cart-shopping"> Agregar Carrito</i>
          <img src="${event.imagen}" class="card-img-top" alt="...">
          <div class="card-body">
            <h5 class="card-title">${event.nombre}</h5>

            <button class="btn btn-danger ">Precio: $ ${event.precio}</button>
            </h6>
            
          </div>
        </div>

            `
    })
}

function test() {
    console.log("funciona")
}

let printCategories = (array, id) => {
    document.querySelector(`#${id}`).innerHTML = ""
    array.forEach(cat => {
        document.querySelector(`#${id}`).innerHTML +=
            `
            <label class="d-flex align-items-center p-1" for="${cat}">${cat}
                <input class="d-flex align-items-center m-1 checkbox" type="checkbox" id="${cat.toLowerCase()}" name="letter" value="${cat.toLowerCase()}">
            </label>
            `
    })
    let checks = document.querySelectorAll('.checkbox')
    checks.forEach(cadaCheck => {
        cadaCheck.addEventListener('click', () => search(eventsApi))
    })

}
