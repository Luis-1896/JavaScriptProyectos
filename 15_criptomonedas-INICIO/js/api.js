class API {
    constructor(apikey) {
        this.apikey = apikey;
    }

    //OBTENER TODAS LAS MONEDAS
    async obtenerMonedadAPI() {
        const url = `https://min-api.cryptocompare.com/data/all/coinlist?api_key=${this.apikey}`; //?api_key=${this.apikey} es porque recibe un parametro

        //FETCH A LA API
        const urlObtenerMonedas = await fetch(url);

        //RESPUESTA EN JSON
        const monedas = await urlObtenerMonedas.json();

        return {
            monedas
        }
    }

    async obtenerValores(moneda, criptomoneda) {
        const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}&api_key=${this.apikey}`;

        // CONVERTIR EN REST API
        const urlConvertir = await fetch(url);

        const resultado = await urlConvertir.json();

        return {
            resultado
        }
    }

}