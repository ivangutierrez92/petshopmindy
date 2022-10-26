let $botoon = document.getElementById("registrojs")
$botoon.addEventListener( 'click', registrar )
function registrar(){
    let datosDeCliente = []
        nombre = '',
        apellido = ''

    nombre = document.querySelector('#nombre').value;
    apellido = document.querySelector('#apellido').value;

    console.log('nombre' + nombre);
    console.log('apellido' + apellido);
}