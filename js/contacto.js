let $boton = document.getElementById("registrojs");
$boton.addEventListener("click", registrar);


function registrar(event) {
  event.preventDefault();
  let datosDeCliente = {
    nombre: "",
    apellido: "",
    mail: "",
    telefono: "",
    nombreDeMascota: "",
    tipoDeMascota: "",
    comentario: "",
  };
  datosDeCliente.nombre = document.querySelector("#nombre").value;
  datosDeCliente.apellido = document.querySelector("#apellido").value;
  datosDeCliente.mail = document.querySelector("#email").value;
  datosDeCliente.telefono = document.querySelector("#telefono").value;
  datosDeCliente.nombreDeMascota = document.querySelector("#nombreMascota").value;
  datosDeCliente.tipoDeMascota = [...document.querySelectorAll('input[type="radio"]:checked')].map(
    event => event.value
  );
  datosDeCliente.comentario = document.querySelector("#validationTextarea").value;
    let datosClienteArray = localStorage.getItem("datos-contacto");
    if(!datosClienteArray) {
        datosClienteArray = [];
    } else {
        datosClienteArray = JSON.parse(datosClienteArray);
    }
  datosClienteArray.push(datosDeCliente);
  localStorage.setItem("datos-contacto", JSON.stringify(datosClienteArray));

  swal({
    text: "se guardaron los datos correctamente",
    icon: "success",
  });
  event.target.form.reset();

}
