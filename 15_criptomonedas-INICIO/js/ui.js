class Interfaz {

    constructor() {
        this.init();
    }

    init() {
        this.construirSelect();
    }

    construirSelect() {

        cotizador.obtenerMonedadAPI()
            .then(monedas => {
                //CREAR UN SELECT DE OPCIONES
                const select = document.querySelector('#criptomoneda');

                //ITERAR POR LOS RESULTADOS DE LA API
                for (const [key, value] of Object.entries(monedas.monedas.Data)) {
                    //AÑADIR EL SYMBOL Y EL NOMBRE COMO OPCIONES
                    const opcion = document.createElement('option');
                    opcion.value = value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
            })
    }

    mostrarmensaje(mensaje, clases) {
        const div = document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));
        //console.log(div);

        //SELECCIONAR MENSAJES
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);

        //MOSTRAR CONTENIDO
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 3000);

    }

    // IMPRIMIR EL RESULTADO DE LA COTIZACIÓN
    mostrarResultado(resultado, moneda, crypto) {

        //EN CASO DE UN RESULTADO ANTERIOR, OCULTARLO
        const resultadoAnterior = document.querySelector('#resultado > div');
        if (resultadoAnterior) {
            resultadoAnterior.remove();
        }

        const datosMoneda = resultado[crypto][moneda];

        //RECORTAR DIGITOS A PRECIO
        let precio = datosMoneda.PRICE.toFixed(2),
            porcentaje = datosMoneda.CHANGEPCTDAY.toFixed(2),
            actualizado = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-MX');

        //CONSTRUIR EL TEMPLATE
        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body text-light">
                    <h2 class="card-title">Resultado:</h2>
                    <p>El Precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL}
                    es de: $ ${precio}</p>
                    <p>Variación último día: % ${porcentaje}</p>
                    <p>Última Actualización: ${actualizado}</p>
                </div>
            </div>
        `;
        this.mostrarOcultarSpinner('block');
        setTimeout(() => {
            //INSERTAR EL RESULTADO
            document.querySelector('#resultado').innerHTML = templateHTML;

            //OCULTAR EL SPINNER
            this.mostrarOcultarSpinner('none');
        }, 3000);
    }

    //MOSTRAR UN SPINNER DE CARGA AL ENVIAR LA COTIZACIÓN
    mostrarOcultarSpinner(vista) {
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display = vista;
    }


}