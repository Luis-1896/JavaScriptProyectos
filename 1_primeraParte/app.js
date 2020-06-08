//document.getElementById('app').innerHTML = 'Hola Mundo';
let nombre = prompt('Cual es tu nombre?');
let edad = prompt('Cual es tu edad?');

document.getElementById('app').innerHTML = `Bienvenido ${nombre} de ${edad} años`;