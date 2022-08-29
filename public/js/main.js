const socket = io.connect();

//------------------------------------------------------------------------------------

const formAgregarProducto = document.getElementById('formAgregarProducto')
formAgregarProducto.addEventListener('submit', e => {
    e.preventDefault()
    const prod={
        title:e.target.title.value,
        price:e.target.price.value,
        thumbnail:e.target.foto.value
    }
    socket.emit('new-product',prod)
    return false;
})

socket.on('productos', async productos => {
    const tabla = await makeHtmlTable(productos)
    document.getElementById("productos").innerHTML=tabla
});

function makeHtmlTable(productos) {
    return fetch('plantillas/tabla-productos.hbs')
        .then(respuesta => respuesta.text())
        .then(plantilla => {
            const template = Handlebars.compile(plantilla);
            const html = template({ productos })
            return html
        })
}

//-------------------------------------------------------------------------------------

const inputUsername = document.getElementById('inputUsername')
const inputMensaje = document.getElementById('inputMensaje')
const btnEnviar = document.getElementById('btnEnviar')

const formPublicarMensaje = document.getElementById('formPublicarMensaje')
formPublicarMensaje.addEventListener('submit', e => {
    e.preventDefault()
    const msj = {
        username: inputUsername.value,
        mensaje: inputMensaje.value,
        dateTime: "horario"
    }
    socket.emit('new-mensaje',msj)

    formPublicarMensaje.reset()
    inputMensaje.focus()
    return false;
})

socket.on('mensajes', async mensajes => {
    const html = await makeHtmlList(mensajes)
    document.getElementById('mensajes').innerHTML = html;
})

function makeHtmlList(mensajes) {
    return fetch("plantillas/mensajes.hbs")
    .then(respuesta => respuesta.text())
    .then(plantilla => {
        const template = Handlebars.compile(plantilla);
        const html = template({ mensajes })
        return html
    })
}

inputUsername.addEventListener('input', () => {
    const hayEmail = inputUsername.value.length
    const hayTexto = inputMensaje.value.length
    inputMensaje.disabled = !hayEmail
    btnEnviar.disabled = !hayEmail || !hayTexto
})

inputMensaje.addEventListener('input', () => {
    const hayTexto = inputMensaje.value.length
    btnEnviar.disabled = !hayTexto
})
