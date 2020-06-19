//INICIALIZAR CLASES
const cotizador = new API('e26953aaf129f9e7b5e4c11b0f4f496b3c5bb1a47706553de715f8d824306365');
const ui = new Interfaz();

//cotizador.obtenerMonedadAPI();

// leer el formulario
const formulario = document.querySelector('#formulario');

//eventListener
formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    //console.log('enviando');

    //LEER LA MONEDA SELECCIONADA
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;

    //LEER LA CRIPTOMONEDA SELECCIONADA
    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    //COMPROBAR QUE AMBOS CAMPOS TENGAN ALGO SELECCIONADO
    if (monedaSeleccionada === '' || criptoMonedaSeleccionada === '') {
        // ARROJAR UNA ALERTA DE ERROR
        ui.mostrarmensaje('Ambos Campos son Obligatorios', 'alert bg-danger text-center');

    } else {
        // TOTO BIEN, CONSULTAR LA API
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada);
            })
    }


})