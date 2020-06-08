// Variables
const email = document.getElementById('email');
const asunto = document.getElementById('asunto');
const mensaje = document.getElementById('mensaje');
const btnEnviar = document.getElementById('enviar');
const formularioEnviar = document.getElementById('enviar-mail');
const resetBtn = document.getElementById('resetBtn');


// event Listener
eventListeners();

function eventListeners() {
    //Inicio de la aplicación y desabilitamos submit
    document.addEventListener('DOMContentLoaded', inicioApp);

    // campos del formulario
    email.addEventListener('blur', validarCampo);
    asunto.addEventListener('blur', validarCampo);
    mensaje.addEventListener('blur', validarCampo);

    //boton de enviar en el submit
    formularioEnviar.addEventListener('submit', enviarEmail);

    // boton de reset
    resetBtn.addEventListener('click', resetFormulario);
}


// functions

function inicioApp() {
    // deshabilitar el envio
    btnEnviar.disabled = true;
}

// Valida que el campo tengo algo escrito

function validarCampo() {
    //Se valida la longitud del texto y que no este vacio
    validarLongitud(this); // con el this, se pasa el input html y el valor

    //validar unicamente el email
    if (this.type === 'email') { //this.type ve si la linea de HTML es tipo email
        validarEmail(this);
    }

    let errores = document.querySelectorAll('.error');
    if (email.value !== '' && asunto.value !== '' && mensaje.value !== '') {
        if (errores.length === 0) {
            btnEnviar.disabled = false;
        }
    }
}

// Restablecer el formulario
function resetFormulario(e) {
    formularioEnviar.reset();
    e.preventDefault();
}

//Cuando se envie el correo
function enviarEmail(e) {
    //console.log('Mail Enviado');

    //Spinner al presionar Enviar
    const spinnerGif = document.querySelector('#spinner');
    spinnerGif.style.display = 'block';

    //Gif que envia email
    const enviado = document.createElement('img');
    enviado.src = 'img/mail.gif';
    enviado.style.display = 'block';

    //Ocultar Spinner y mostrar gif de enviado
    setTimeout(function() {
        spinnerGif.style.display = 'none';
        document.querySelector('#loaders').appendChild(enviado);
        setTimeout(function() {
            enviado.remove();
            formularioEnviar.reset();
        }, 5000);
    }, 3000);

    e.preventDefault();

}

// Verifica la longitud del texto en los campos
function validarLongitud(campo) {
    console.log(campo.value.length);

    //Checa que si la longitud de letras ingresadas es mayor a 0 se pondra en verde y elimina la clase error
    if (campo.value.length > 0) {
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else { // en caso que la longitud es 0 se pone en rojo y agrega la clase error
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}

function validarEmail(campo) {
    const mensaje = campo.value;
    if (mensaje.indexOf('@') !== -1) { // el indexOf checa en que posición esta el @ si no lo encuentra manda un -1
        campo.style.borderBottomColor = 'green';
        campo.classList.remove('error');
    } else {
        campo.style.borderBottomColor = 'red';
        campo.classList.add('error');
    }
}