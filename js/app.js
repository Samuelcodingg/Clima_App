// Variables
const cerrarSeccionBusquedaBtn = document.querySelector('#cerrar-seccion-busqueda');
const buscarCiudades = document.querySelector('#buscar-ciudades');
const seccionFormulario = document.querySelector('#seccion-formulario');
const enviar = document.querySelector('#enviar');
const actual = new Date();
const fechaHoy = {
    dia: obtenerDia(),
    numDia: actual.getDate(),
    mes: obtenerMes(),
}

// Al cargar el DOM
document.addEventListener('DOMContentLoaded', ()=>{

    document.querySelector('#fecha-hoy').innerHTML = `Hoy - ${fechaHoy.dia} ${fechaHoy.numDia}, ${fechaHoy.mes}`;

    //Mostrar seccion busqueda
    buscarCiudades.addEventListener('click', mostrarFormularioBusqueda);

    //Cerrar seccion busqueda
    cerrarSeccionBusquedaBtn.addEventListener('click', cerrarSeccionBusqueda);

    //Validar formulario
    enviar.addEventListener('click', validarFormulario);
});

//Funciones

function obtenerDia(){
    switch(actual.getDay()){
        case 1:
            return 'Lunes'
        case 2:
            return 'Martes'
        case 3:
            return 'Miércoles'
        case 4:
            return 'Jueves'
        case 5:
            return 'Viernes'
        case 6:
            return 'Sábado'
        case 7:
            return 'Domingo'
        default:
            break;
    }
}

function obtenerMes(){
    switch(actual.getMonth()){
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
    let {main: {temp}, name, weather: {0: {description}}} = datos;
    temp = temp - 273;
    document.querySelector('#clima-principal').innerHTML = `${parseInt(temp)} &deg;C`;
    document.querySelector('#descripcion').innerHTML = description;
    document.querySelector('#ciudad-actual').innerHTML = `<i class="fas fa-map-marker-alt"></i> ${name}`;
}