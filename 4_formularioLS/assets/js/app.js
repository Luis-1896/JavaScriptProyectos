// variables
const listaTweets = document.getElementById('lista-tweets');


//Event Listeners
eventListeners();

function eventListeners() {
    //cuando se envia el formulario
    document.querySelector('#formulario').addEventListener('submit', agregarTweet);

    // Borrar Tweets
    listaTweets.addEventListener('click', borrarTweet);

    //contenido cargado
    document.addEventListener('DOMContentLoaded', localStorageListo);
}


//Funciones


//Añadir tweet del formulario
function agregarTweet(e) {
    e.preventDefault();
    //leer el valor del textarea
    const tweet = document.getElementById('tweet').value;
    //crear boton de eliminar
    const botonBorrar = document.createElement('a'); //se crear el elemento enlace
    botonBorrar.classList = 'borrar-tweet'; //se le asigna este nombre de clase
    botonBorrar.innerText = 'X'; //se le asigna este nombre al boton

    //crear elemento y añadirle el contenido a la lista
    const li = document.createElement('li');
    li.innerText = tweet;
    // añadre el botón de borrar el tweet
    li.appendChild(botonBorrar);
    //añade el tweet a la lista

    listaTweets.appendChild(li);

    // Añadir a LocalStorage
    agregarTweetLocalStorage(tweet);
}

// Elimina el Tweet del DOM
function borrarTweet(e) {
    e.preventDefault();
    if (e.target.className === 'borrar-tweet') {
        //console.log(e.target.parentElement.remove());
        //alert('Tweet Elimindo');
        e.target.parentElement.remove();
        borrarTweetLocalStorage(e.target.parentElement.innerText);
    }

}

//Mostrar datos de localStorage en la lista 
function localStorageListo() {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    tweets.forEach(tweet => {
        const botonBorrar = document.createElement('a'); //se crear el elemento enlace
        botonBorrar.classList = 'borrar-tweet'; //se le asigna este nombre de clase
        botonBorrar.innerText = 'X'; //se le asigna este nombre al boton

        //crear elemento y añadirle el contenido a la lista
        const li = document.createElement('li');
        li.innerText = tweet;
        // añadre el botón de borrar el tweet
        li.appendChild(botonBorrar);
        //añade el tweet a la lista

        listaTweets.appendChild(li);

    });
}


//Agrega tweet a LocalStorage

function agregarTweetLocalStorage(tweet) {
    let tweets;
    tweets = obtenerTweetsLocalStorage();
    // Añadir ek nuevo tweet
    tweets.push(tweet);
    // Convertir de string a arreglo para local Storage
    localStorage.setItem('tweets', JSON.stringify(tweets));
}

//Coproba que haya elementos en localStorage, retorna un arreglo
function obtenerTweetsLocalStorage() {
    let tweets;
    // Revisamos los valores de local storage
    if (localStorage.getItem('tweets') === null) {
        tweets = [];
    } else {
        tweets = JSON.parse(localStorage.getItem('tweets'));
    }
    return tweets;
}

//Eliminar tweet de localStorage
function borrarTweetLocalStorage(tweet) {
    let tweets, tweetBorrar;
    //eLIMINA LA X DEL TWEET
    tweetBorrar = tweet.substring(0, tweet.length - 1); //substring corta el string en un nuemero de letras y queremos que quite la X

    tweets = obtenerTweetsLocalStorage();

    tweets.forEach(function(tweet, index) {
        if (tweetBorrar === tweet) {
            tweets.splice(index, 1); //dice que de la posición que se encuentre la coincidencia de borrar el tweet (por el index) va eliminar solo ese elemento, por el 1
        }
    });

    localStorage.setItem('tweets', JSON.stringify(tweets));
}