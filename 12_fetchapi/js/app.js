document.getElementById('txtBtn').addEventListener('click', cargarTXT);
document.getElementById('jsonBtn').addEventListener('click', cargarJSON);
document.getElementById('apiBTN').addEventListener('click', cargarREST);

// FETCH API con un archivo .txt
function cargarTXT() {
    fetch('datos.txt')
        .then(function(res) {
            // console.log(res.text()); // devuelve el texto de datos.txt
            return res.text();
        })
        .then(function(empleados) {
            //console.log(empleados); //dependiendo del tipo de funcion enviada .text(), .json() por ejemplo es lo que empleados traera al return, en este caso con los datosen texto de datos.txt
            document.getElementById('resultado').innerHTML = empleados;
        })
        .catch(function(err) {
            console.log(err);
        })
}

// FETCH API con un JSON
function cargarJSON() {
    fetch('empleados.json')
        .then(function(res) {
            //console.log(res); //para ver las funciones ir a proto y hay una que se llama json, la cual se usara
            return res.json();
        })
        .then(function(data) {
            let html = '';
            data.forEach(function(empleado) {
                html += `
                <li>${empleado.nombre} - ${empleado.puesto}</li>
            `;
            });
            document.getElementById('resultado').innerHTML = html;
        })
        .catch(function(error) {
            console.log(error);

        })
}

// FETCH API CON UN REST
function cargarREST() {
    fetch('https://picsun.photos/list')
        .then(function(res) {
            return res.json();
        })
        .then(function(imagenes) {
            let html = '';
            imagenes.forEach(function(imagen) {
                html += `
                <li>
                    <a target="_blank" href="${imagen.post_url}"> Ver imagen </a>
                    ${imagen.author}
                </li>
            `;
            });
            document.getElementById('resultado').innerHTML = html;
        })
}