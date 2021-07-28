// Variables
const cerrarSeccionBusquedaBtn = document.querySelector('#cerrar-seccion-busqueda');
const buscarCiudades = document.querySelector('#buscar-ciudades');
const seccionFormulario = document.querySelector('#seccion-formulario');
const enviar = document.querySelector('#enviar');
const actual = new Date();
const fechaHoy = {
    dia: obtenerDia(actual.getDay()),
    numDia: obtenerNumDia(actual.getDate()),
    mes: obtenerMes(actual.getMonth(),actual.getDate()),
    dia1: obtenerDia(actual.getDay()+2),
    numDia1: obtenerNumDia(actual.getDate()+2),
    mes1: obtenerMes(actual.getMonth(),actual.getDate()+2),
    dia2: obtenerDia(actual.getDay()+3),
    numDia2: obtenerNumDia(actual.getDate()+3),
    mes2: obtenerMes(actual.getMonth(),actual.getDate()+3),
    dia3: obtenerDia(actual.getDay()+4),
    numDia3: obtenerNumDia(actual.getDate()+4),
    mes3: obtenerMes(actual.getMonth(),actual.getDate()+4),
    dia4: obtenerDia(actual.getDay()+5),
    numDia4: obtenerNumDia(actual.getDate()+5),
    mes4: obtenerMes(actual.getMonth(),actual.getDate()+5),
}

// Al cargar el DOM
document.addEventListener('DOMContentLoaded', ()=>{

    iniciarApp(); //Inicializado para Lima

    document.querySelector('#fecha-hoy').innerHTML = `Hoy - ${fechaHoy.dia} ${fechaHoy.numDia}, ${fechaHoy.mes}`;
    document.querySelector('#d-1').innerHTML = `${fechaHoy.dia1}, ${fechaHoy.numDia1} ${fechaHoy.mes1}`;
    document.querySelector('#d-2').innerHTML = `${fechaHoy.dia2}, ${fechaHoy.numDia2} ${fechaHoy.mes2}`;
    document.querySelector('#d-3').innerHTML = `${fechaHoy.dia3}, ${fechaHoy.numDia3} ${fechaHoy.mes3}`;
    document.querySelector('#d-4').innerHTML = `${fechaHoy.dia4}, ${fechaHoy.numDia4} ${fechaHoy.mes4}`;

    //Mostrar seccion busqueda
    buscarCiudades.addEventListener('click', mostrarFormularioBusqueda);

    //Cerrar seccion busqueda
    cerrarSeccionBusquedaBtn.addEventListener('click', cerrarSeccionBusqueda);

    //Validar formulario
    enviar.addEventListener('click', validarFormulario);
});

//Funciones

function obtenerNumDia(num){
    if(num>31) {
        num-=31;
    }
    return num;
}

function obtenerDia(num){
    if(num>7){
        num-=7;
    }

    switch(num){
        case 1:
            return 'Lun'
        case 2:
            return 'Mar'
        case 3:
            return 'Mié'
        case 4:
            return 'Jue'
        case 5:
            return 'Vie'
        case 6:
            return 'Sáb'
        case 7:
            return 'Dom'
        default:
            break;
    }
}

function obtenerMes(num,date){

    if(date>31){
        num++;
    }

    switch(num){
        case 0:
            return 'Ene'
        case 1:
            return 'Feb'
        case 2:
            return 'Mar'
        case 3:
            return 'Abr'
        case 4:
            return 'May'
        case 5:
            return 'Jun'
        case 6:
            return 'Jul'
        case 7:
            return 'Ago'
        case 8:
            return 'Sep'
        case 9:
            return 'Oct'
        case 10:
            return 'Nov'
        case 11:
            return 'Dic'
        default:
            break;
    }
}

function mostrarFormularioBusqueda() {
    seccionFormulario.style.display = 'block';
}

function cerrarSeccionBusqueda() {
    seccionFormulario.style.display = 'none';
}

function validarFormulario(e) {
    e.preventDefault();
    const ciudad = document.querySelector('#ciudad');
    const pais = document.querySelector('#pais');

    if((ciudad.value === '' || pais.value === '') && !seccionFormulario.querySelector('p')){
        const alerta = document.createElement('p');
        alerta.textContent = 'Llene todos los campos...';
        alerta.style.width = '80%';
        alerta.style.margin = '0px auto';
        alerta.style.marginBottom = '30px';
        alerta.style.textAlign = 'center';
        alerta.style.padding = '10px'; 
        alerta.style.color = 'white'; 
        alerta.style.backgroundColor = '#EF5350';
        seccionFormulario.appendChild(alerta);
     
        setTimeout(()=>{
            alerta.remove();
        },3000)

        return;
    }

    cerrarSeccionBusqueda();
    consultarAPIClima(ciudad.value,pais.value);

}

function consultarAPIClima(ciudad, pais){
    const APIKey = 'fc4922b9ba2d01892930dcdef4bbb38a';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}US&appid=${APIKey}`;

    fetch(url)
        .then(respuesta => respuesta.json())
        .then(resultado => {
            mostrarInfoClima(resultado);
        });
}

function mostrarInfoClima(datos) {
    console.log(datos);
    let {main: {temp, humidity, pressure}, visibility, name, weather: {0: {description}}, wind: {speed}} = datos;
    const diasProximos = document.querySelectorAll('.card-day');
    temp = temp - 273;
    document.querySelector('#clima-principal').innerHTML = `${parseInt(temp)} &deg;C`;
    document.querySelector('#descripcion').innerHTML = description;
    document.querySelector('#ciudad-actual').innerHTML =`<i class="fas fa-map-marker-alt"></i> ${name}`;
    document.querySelector('#humedad').innerHTML = `${humidity}%`;
    document.querySelector('#presion').innerHTML = `${pressure} mb`;
    document.querySelector('#visibilidad').innerHTML = `${visibility/1000} miles`;
    document.querySelector('#speed').innerHTML = `${speed}mph`;
    diasProximos.forEach(dia => {
        dia.children[1].children[0].innerHTML = `${parseInt(temp)} &deg;C`;
    });

    insertarImagenClima(description);
    // insertarImagenClimaSemana(description);
}

function insertarImagenClima(description) {
    const diasProximos = document.querySelectorAll('.card-day');

    switch(description){
        case 'overcast clouds':
            document.querySelector('#imagen-clima-hoy').src = 'img/HeavyCloud.png';
            document.querySelector('#descripcion').innerHTML = 'Nublado';
            diasProximos.forEach(dia => {
                dia.children[0].children[1].src = 'img/HeavyCloud.png';
            });
            break;
        case 'broken clouds':
            document.querySelector('#imagen-clima-hoy').src = 'img/HeavyCloud.png';
            document.querySelector('#descripcion').innerHTML = 'Nublado';
            diasProximos.forEach(dia => {
                dia.children[0].children[1].src = 'img/HeavyCloud.png';
            });
            break;
         case 'mist':
            document.querySelector('#imagen-clima-hoy').src = 'img/HeavyCloud.png';
            document.querySelector('#descripcion').innerHTML = 'Nublado';
            diasProximos.forEach(dia => {
                dia.children[0].children[1].src = 'img/HeavyCloud.png';
            });
            break;
        case 'scattered clouds':
            document.querySelector('#imagen-clima-hoy').src = 'img/LightCloud.png';
            document.querySelector('#descripcion').innerHTML = 'Poco Nublado';
            diasProximos.forEach(dia => {
                dia.children[0].children[1].src = 'img/LightCloud.png';
            });
            break;
        case 'few clouds':
            document.querySelector('#imagen-clima-hoy').src = 'img/LightCloud.png';
            document.querySelector('#descripcion').innerHTML = 'Poco Nublado';
            diasProximos.forEach(dia => {
                dia.children[0].children[1].src = 'img/LightCloud.png';
            });
            break;            
        case 'clear sky':
            document.querySelector('#imagen-clima-hoy').src = 'img/Clear.png';
            document.querySelector('#descripcion').innerHTML = 'Despejado';
            diasProximos.forEach(dia => {
                dia.children[0].children[1].src = 'img/Clear.png';
            });
            break;
        default:
            break;
    }
}

function iniciarApp(){
    consultarAPIClima('Lima','PE');
}