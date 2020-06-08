//eventlistener
document.getElementById('cargar').addEventListener('click', cargarDatos);

//Funcion

function cargarDatos() {
    // Crear el objeto xmlhttprequest
    const xhr = new XMLHttpRequest();

    // Abrir una conexión
    xhr.open('GET', 'datos.txt', true); //ACCIÓN HTTP, URL, ASYNCRONO

    // Una vez que carga obtener el status
    xhr.onload = function() {
        // 200 : Correcto   |   403 : Prohibido |   404 : No encontrado
        if (this.status === 200) {
            //console.log(this.responseText);
            document.getElementById('listado').innerHTML = `<h1>${this.responseText}</h1>`;
        }
    }

    /**
     * Version anterior
     * 
     * xhr.onreadystatechange=function(){
     *  console.log(`Estado ${this.readyState}`);
     * 
     *  if(this.readyState===4 && this.status===200){
     *      console.log(this.responseText);
     *  }
     * }
     * 
     * ready status
     * 
     * 0.- No inicializado
     * 1.- Conexion establecido
     * 2.- Recibido
     * 3.- Procesado
     * 4.- Respuesta lista
     * 
     * 
     */



    // Enviar el request
    xhr.send();


}