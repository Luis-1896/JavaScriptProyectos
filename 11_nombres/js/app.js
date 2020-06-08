/**
 * Este proyecto es similar al siguiente repositorio:
 * github.com/thm/uinames
 */
document.querySelector('#generar-nombre').addEventListener('submit', cargarNombre);

// Llamado a Ajax e imprimir resultados
function cargarNombre(e) {
    e.preventDefault();

    // la siguiente sinxtaxis es para obtener la información de un <select></select> del HTML
    const origen = document.getElementById('origen');
    const origenSeleccionado = origen.options[origen.selectedIndex].value;

    const genero = document.getElementById('genero');
    const generoSeleccionado = genero.options[genero.selectedIndex].value;

    const cantidad = document.getElementById('numero').value;

    let url = '';
    url += 'https://uinames.com/api/?'; //el signo ? significa que se van a pasar mas parametros

    //Si hay origen agregarlo a la URL
    if (origenSeleccionado !== '') {
        url += `region=${origenSeleccionado}&`; // el signo & que se van a pasar otro parametro
    }

    //Si hay un genero agregarlo a la URL
    if (generoSeleccionado !== '') {
        url += `gender=${generoSeleccionado}&`;
    }

    // Si hay una cantidad agregarlo a la URL
    if (cantidad !== '') {
        url += `amount=${cantidad}&`;
    }

    //console.log(url);

    //Conectar con ajax
    // Iniciar XMLHttpRequest
    const xhr = new XMLHttpRequest();

    //Abrimos la conexion
    xhr.open('GET', url, true);

    //Datos e impresion del template
    xhr.onload = function() {
        if (this.status === 200) {
            // console.log(JSON.parse(this.responseText));
            const nombres = JSON.parse(this.responseText);

            //Gnerar el HTML
            let htmlNombres = '<h2>Nombres Generados</h2>';

            htmlNombres += '<ul class="lista">';

            //Imprimir cada nombre
            nombres.forEach(nombre => {
                htmlNombres += `
                    <li>${nombre.name}</li>
                `;
            });

            htmlNombres += '</ul>';

            document.getElementById('resultado').innerHTML = htmlNombres;
        }
    }

    //Enviar el request
    xhr.send();

}