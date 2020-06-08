const boton1 = document.getElementById('boton1');

boton1.addEventListener('click', function() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'empleado.json', true); //Accion GET para obtener, URL empleado.json, Asyncrono

    xhr.onload = function() {
        if (this.status === 200) {
            // console.log(JSON.parse(this.responseText)); //Con JSON.parse se para el JSON a objeto
            const persona = JSON.parse(this.responseText);

            const htmlTemplate = `
            <ul>
                <li>ID: ${persona.id}</li>
                <li>Nombre: ${persona.nombre}</li>
                <li>Empresa: ${persona.empresa}</li>
                <li>Actividades: ${persona.trabajo}</li>
            </ul>
            `;

            document.getElementById('empleado').innerHTML = htmlTemplate;
        }
    }

    xhr.send();
});

//
const boton2 = document.getElementById('boton2');
boton2.addEventListener('click', function() {
    const xhr = new XMLHttpRequest();

    xhr.open('GET', 'empleados.json', true); //Accion GET para obtener, URL empleado.json, Asyncrono

    xhr.onload = function() {
        if (this.status === 200) {
            // console.log(JSON.parse(this.responseText)); //Con JSON.parse se para el JSON a objeto
            const personal = JSON.parse(this.responseText);

            let htmlTemplate = '';
            personal.forEach(persona => {
                htmlTemplate += `
                <ul>
                    <li>ID: ${persona.id}</li>
                    <li>Nombre: ${persona.nombre}</li>
                    <li>Empresa: ${persona.empresa}</li>
                    <li>Actividades: ${persona.trabajo}</li>
                </ul>
                `; // con += se van concatenando
            });

            document.getElementById('empleados').innerHTML = htmlTemplate;
        }
    }

    xhr.send();
});