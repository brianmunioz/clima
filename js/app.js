const container = document.querySelector('.container');
const resultado = document.querySelector('#resultado');
const formulario = document.querySelector('#formulario');

window.addEventListener('load',()=>{
    formulario.addEventListener('submit',buscarClima);
})

function buscarClima(e){
    e.preventDefault();

    const ciudad = document.querySelector('#ciudad').value;
    const pais = document.querySelector('#pais').value;
    if (ciudad.trim() === '' || pais.trim() === ''){
        mostrarError('ambos campos son obligatorios');

        return;
    }

    consultarAPI(ciudad,pais);
}

function mostrarError(mensaje){
    const alerta = document.querySelector('.bg-red-100');

    if (!alerta){
        const alerta = document.createElement('div');

        alerta.classList.add('bg-red-100','border-red-400','text-red-700','px-4',
        'py-3','rounded', 'max-w-md','mx-auto','mt-6','text-center');
        alerta.innerHTML = `
        <strong class="font-bold">Error!</strong>
        <span class="block">${mensaje}</span>
        `;
        container.appendChild(alerta);

        setTimeout(()=>{
            alerta.remove();
        },5000)
    }


}
function consultarAPI(ciudad,pais){
    const appID = '3fefc46807418bfdc7a03fd86c54a8f1';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}`;
    fetch(url)
                .then(respuesta => respuesta.json())
                .then(datos => {
                    if (datos.cod === '404'){
                        mostrarError('No se pudo encontrar')
                        return;
                    }
                    mostrarClima(datos);
                })
            }

function mostrarClima(datos){
    const {main: {temp,temp_max,temp_min}} = datos;
    const centigrados = kelvinAGrados(temp);
limpiarHTML();
    const actual = document.createElement('p');
    actual.innerHTML = `${centigrados} &#8451;`;
    actual.classList.add('font-bold','text-6xl');

    const resultadoDIV  = document.createElement('div');
    resultadoDIV.classList.add('text-center','text-white');
    resultadoDIV.appendChild(actual);
    resultado.appendChild(resultadoDIV);
}
function kelvinAGrados(temp){
return parseInt(temp - 273.15);


}

function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);
    }
}

