// llamamos partes del html para utilizar mas adelante y les damos el nombre que utilizaremos en esta parte del codigo
const html = document.querySelector(".propiedades")
const btn = document.getElementById("buscar")
const rooms = document.getElementById("roomsQuantity")
const metersMin = document.getElementById("since")
const metersMax = document.getElementById("until")
const total = document.querySelector(".py-3") 
// definimos templates y registro numerico en 0 para realizar una cuenta de los objetos que pasen el filtro inicial 
let template = '' 
let numReg = 0 
//funcion que detecta si se realizo un click en btn y verifica los campos para evitar campos vacios o errores de logica como un minimo mayor al maximo en busqueda
const cambio = function (click, rommsSearch, MeterMinSearch, MeterMaxSearch) {
  if (
    click === "true" &&
    (rooms.value === "" || metersMin.value === "" || metersMax.value === "")
  ) {
    //en caso de que falte un campo se enviara una alerta al usuario para avisarle
    alert('Aun faltan campos por rellenar')
    //return es utilizado para que en caso de no cumplirse la condicion el siguiente bloque de codigo no se ejecute
    return
  } else if (metersMin.value > metersMax.value) {
    //en caso de que el profe fabian nos intente rajar poniendo un numero mayo en minimo que el maximo esto le dara un mensaje de que eso no esta permitido
    alert('El minimo de metros no debe superar el maximo de metros en tu busqueda')
    return
  } else {
    //aqui reseteamos el valor de template y numreg para usar innerHTML para usar los datos obtenidos tras la busqueda
    template = ''
    html.innerHTML = ''
    numReg = 0
    //filtro inicial donde agrupamos una copia del JSON que sera utilizada para filtrar busquedas
    let Properties = propiedadesJSON.filter(
      ({ rooms, meters }) =>
        rooms >= rommsSearch &&
        meters >= MeterMinSearch &&
        meters <= MeterMaxSearch
    )
    for (let prop of Properties) {
      numReg = numReg + 1
      dataLoad(prop.src, prop.name, prop.rooms, prop.meters, prop.description)
    }
    //esto es dejado fuera de for para optimizacion ya que de dejarlo dentro con cada actualizacion de termino de ciclo la informacion seria sobreescrita hasta el termino de los ciclos
    html.innerHTML = template
    total.innerHTML = `Total: ${numReg}`
  }
}
//llamamos a la funcion dataload para cargar los datos en las cards en su respectivo orden en el array con += para no sobreescribirlas
const dataLoad = function (src, name, rooms, meters, description) {
    template += `<div class="propiedad"><div class="img" style=" background-image: url('${src}');"></div>
    <section>
    <h5>${name}</h5>
    <div class="d-flex justify-content-between">
    <p>Cuartos: ${rooms}</p>
    <p>Metros: ${meters}</p>
    </div>
    <p class="my-3">${description}</p>
    <button class="btn btn-info">Ver más</button>
    </section>
    </div>`
  }
//funcion que cambia el valor de false a true con un click para realizar una busqueda por medio del boton btn
btn.addEventListener('click', () => {
  cambio('true', rooms.value, metersMin.value, metersMax.value)
})
//funcion que previene que se ejecute una busqueda al iniciar la pagina
  cambio('false', -Infinity, -Infinity, Infinity)
