/* CLASES */

class Reserva {
    constructor(id, generacion, paquete, persona) {
        this.id = id;
        this.generacion_de_ticket = generacion;
        this.paquete = paquete;
        this.persona = persona;
    }
}
class Paquete {
    constructor(id, ubicacion, fecha, dias, hospedaje, precio) {
        this.id = id;
        this.ubicacion = ubicacion;
        this.fecha_contratada = fecha;
        this.dias = dias;
        this.hospedaje = hospedaje;
        this.precio = precio;
    }
}
class Persona {
    constructor(id, nombre, apellido, pasaporte, pais) {
        this.id = id;
        this.nombre = nombre;
        this.apellido = apellido;
        this.pasaporte = pasaporte;
        this.pais = pais;
    }
}

/* FUNCIONES */

function main() {
    borrarStorageYDatos();
    weatherMadrid();
    weatherToledo();
    weatherAranjuez();
}

function weatherMadrid() {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=40.416667&lon=-3.7025&appid=c1be562ef1e96a1d0a255a314911359d&units=metric&lang=es')
        .then((response) => response.json())
        .then((data) => {
            let weatherMadrid = document.querySelector("#weatherMadrid");
            let tiempoMadrid = document.createElement("div");
            tiempoMadrid.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
            <p class="weatherText">Temp. <strong>${data.main.temp}°C</strong> | S.T. <strong>${data.main.feels_like}°C</strong></p>
        `;
            weatherMadrid.appendChild(tiempoMadrid)
        });
}
function weatherToledo() {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=39.866667&lon=-4.033333&appid=c1be562ef1e96a1d0a255a314911359d&units=metric&lang=es')
        .then((response) => response.json())
        .then((data) => {
            let weatherToledo = document.querySelector("#weatherToledo");
            let tiempoToledo = document.createElement("div");
            tiempoToledo.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
            <p class="weatherText">Temp. <strong>${(data.main.temp)}°C</strong> | S.T. <strong>${data.main.feels_like}°C</strong></p>
        `;
            weatherToledo.appendChild(tiempoToledo)
        });
}
function weatherAranjuez() {
    fetch('https://api.openweathermap.org/data/2.5/weather?lat=40.033333&lon=-3.602778&appid=c1be562ef1e96a1d0a255a314911359d&units=metric&lang=es')
        .then((response) => response.json())
        .then((data) => {
            let weatherAranjuez = document.querySelector("#weatherAranjuez");
            let tiempoAranjuez = document.createElement("div");
            tiempoAranjuez.innerHTML = `
            <img src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png">
            <p class="weatherText">Temp. <strong>${data.main.temp}°C</strong> | S.T. <strong>${data.main.feels_like}°C</strong></p>
        `;
            weatherAranjuez.appendChild(tiempoAranjuez)
        });
}

function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
    window.history.replaceState({
        foo: 'bar'
    }, '', '#');
}

function validarSeleccionHotel() {
    swal({
        title: "No has seleccionado un hotel",
        text: "Por favor, selecciona uno para continuar",
        icon: "error",
    });
}

function validarCantidadHotel(){
    swal({
        title: "No se puede seleccionar más de un alojamiento",
        text: "No te hagas problema, nos quedaremos con el primero elegido. Podés continuar con el proceso de reserva",
        icon: "warning",
    });
    contadorHoteles = 1;
    restablecerBotones();
}

function validarString() {
    swal({
        title: "Has colocado números",
        text: "Por favor ingresa los datos nuevamente",
        icon: "error",
    });
    formulario.reset()
    personas.push();
}

function formularioSuccess() {
    swal({
        icon: "success",
        text: "¡Agregaste una persona!",
        button: false,
        timer: 1800
    });
    formulario.reset();
}

function reservaSuccess() {
    swal({
        icon: "success",
        title: "Finalizaste tu reserva",
        text: "¡Que tengas una gran estadía!",
        button: false,
        timer: 2500
    });
}

function alertaBorrar() {
    swal({
        title: "¿Deseas limpiar los datos?",
        text: "Una vez que se limpian los mismos, no podrás obtenerlos nuevamente",
        icon: "warning",
        buttons: true,
        buttons: ["Cancelar", "OK"],
        dangerMode: true,
    })
        .then((willDelete) => {
            if (willDelete) {
                swal("Tus datos fueron eliminados.", {
                    icon: "success",
                });
                localStorage.clear();
                reservas = [];
                paquetes = [];
                personas = [];
                let bloquesReserva = document.querySelector(".bloques-reserva");
                let encontrarClase = document.contains(bloquesReserva);
                resumenReserva.remove(encontrarClase);
                setTimeout(() => {
                    location.reload();
                }, 2500);
                topFunction();
            } else {
                swal("Tus datos están a salvo");
            }
        });
}

function creadorDeBloquePersonas() {
    for (i = 0; i < personas.length; i++) {
        let contenedorResumenPersonas = document.createElement("div");
        contenedorResumenPersonas.className = "col-md-auto bloques-reserva";
        contenedorResumenPersonas.id = "resumenPersonas";
        contenedorResumenPersonas.innerHTML = `
            <h4>Persona: <strong>${i + 1}</strong></h4>
            <h4>Nombre completo: <strong>${reservas[0].persona[i].nombre.toUpperCase()} ${reservas[0].persona[i].apellido.toUpperCase()}</strong></h4>
            <h4>Pasaporte: <strong>${reservas[0].persona[i].pasaporte.toUpperCase()}</strong></h4>
            <h4>País: <strong>${reservas[0].persona[i].pais.toUpperCase()}</strong></h4>
        </div>
        `;
        resumenReserva.appendChild(contenedorResumenPersonas);
    };
}

function creadorDeBloqueReserva() {
    let contenedor = document.createElement("div");
    contenedor.className = "col-md-auto bloques-reserva";
    contenedor.id = "resumen";
    contenedor.innerHTML = `
        <h4>Hotel: <strong>${reservas[0].paquete[0].hospedaje} (${reservas[0].paquete[0].ubicacion})</strong></h4>
        <h4>Fecha: <strong>Del ${reservas[0].paquete[0].fecha_contratada.getDate()}/${reservas[0].paquete[0].fecha_contratada.getMonth() + 1}/${reservas[0].paquete[0].fecha_contratada.getFullYear()} al ${reservas[0].paquete[0].fecha_contratada.getDate() + reservas[0].paquete[0].dias}/${reservas[0].paquete[0].fecha_contratada.getMonth() + 1}/${reservas[0].paquete[0].fecha_contratada.getFullYear()}</strong></h4>
        <h4>Cantidad de personas: <strong>${reservas[0].persona.length}</strong></h4>
        <br>
        <h4>Precio total: <strong>U$D ${(reservas[0].paquete[0].precio) * (reservas[0].persona.length)}</strong></h4>
    </div>
    `;
    resumenReserva.appendChild(contenedor);
}

function agregarReservaStorage() {
    let reservaJSON = JSON.stringify(reservas);
    localStorage.setItem("Reserva", reservaJSON);
}

function borrarStorageYDatos() {
    let formularioReserva = document.querySelector("#formularioReserva");
    let botonBorrar = document.createElement("button");
    botonBorrar.className = "btn btn-outline-danger mt-2";
    botonBorrar.id = "borrarTodo";
    botonBorrar.innerText = "Limpiar datos";
    formularioReserva.appendChild(botonBorrar);
    botonBorrar.addEventListener('click', () => {
        alertaBorrar();
    });
}

function desactivarBotones(){
    finalizarReserva.classList.add("disabled");
    formulario.classList.add("disabled");
    botonAgregar.classList.add("disabled");
    botonReservaUno.classList.add("disabled");
    botonReservaDos.classList.add("disabled");
    botonReservaTres.classList.add("disabled");
}

function restablecerBotones() {
    botonReservaUno.classList.remove("btn-secondary");
    botonReservaUno.classList.add("btn-primary");
    botonReservaDos.classList.remove("btn-secondary");
    botonReservaDos.classList.add("btn-primary");
    botonReservaTres.classList.remove("btn-secondary");
    botonReservaTres.classList.add("btn-primary");
}

/* VARIABLES GLOBALES */

let personas = [];
let paquetes = [];
let reservas = [];
let contadorDeReservas = 1;
let contadorPersonas = 1;
let clicked = false;
let contadorHoteles = 0;

/* EVENTOS Y MODIFICACIONES EN EL DOM */

/* Paquetes */
botonReservaUno = document.querySelector("#boton-reserva1");
botonReservaDos = document.querySelector("#boton-reserva2");
botonReservaTres = document.querySelector("#boton-reserva3");
botonAgregar = document.querySelector("#btnAgregar");


botonReservaUno.addEventListener('click', () => {
    botonReservaUno.classList.remove("btn-primary");
    botonReservaUno.classList.add("btn-secondary");
    let paqueteMadrid = new Paquete(1, "Madrid", new Date("2024-11-24"), 7, "Hilton Hotel", 13000);
    paquetes.push(paqueteMadrid);
    clicked = true;
    contadorHoteles++;
})
botonReservaDos.addEventListener('click', () => {
    botonReservaDos.classList.remove("btn-primary");
    botonReservaDos.classList.add("btn-secondary");
    let paqueteToledo = new Paquete(2, "Toledo", new Date("2024-3-14"), 10, "Nuestro Camino Hotel", 6000);
    paquetes.push(paqueteToledo);
    clicked = true;
    contadorHoteles++;
})
botonReservaTres.addEventListener('click', () => {
    botonReservaTres.classList.remove("btn-primary");
    botonReservaTres.classList.add("btn-secondary");
    let paqueteAranjuez = new Paquete(3, "Aranjuez", new Date("2024-05-12"), 10, "BlueStar Aparts", 7000);
    paquetes.push(paqueteAranjuez);
    clicked = true;
    contadorHoteles++;
})

/* Formulario */
let formulario = document.querySelector("#formulario");
let nombreInput = document.querySelector("#nombreInput");
let apellidoInput = document.querySelector("#apellidoInput");
let pasaporteInput = document.querySelector("#pasaporteInput");
let nacionalidadInput = document.querySelector("#nacionalidadInput");
let paisesLista = document.querySelector("#paises");    



formulario.onsubmit = (event) => validarFormulario(event);
function validarFormulario(event) {
    event.preventDefault();
    
    idPersona = contadorPersonas++;
    nombre = nombreInput.value;
    apellido = apellidoInput.value;
    pasaporte = pasaporteInput.value;
    pais = paisesLista.value;

    let persona = new Persona(idPersona, nombre, apellido, pasaporte, pais);
    (isNaN(nombre) && true) ?
        (isNaN(apellido) && true) ?
                (clicked && true) ?
                    (contadorHoteles === 1) ?
                        (formularioSuccess(), personas.push(persona)) : (validarCantidadHotel()) : (validarSeleccionHotel()) : (validarString()) : (validarString());
}

/* Reserva */
let finalizarReserva = document.querySelector("#finalizarReserva");
let resumenReserva = document.querySelector("#resumenReserva");

finalizarReserva.addEventListener('click', () => {
    let reserva = new Reserva(contadorDeReservas, Date(), paquetes, personas);
    contadorDeReservas++;
    reservas.push(reserva);
    reservaSuccess();
    creadorDeBloqueReserva();
    creadorDeBloquePersonas();
    agregarReservaStorage();
    desactivarBotones();
});
main();

