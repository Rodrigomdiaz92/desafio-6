const express = require('express')


const { Server: HttpServer } = require('http')
const { Server: Socket } = require('socket.io')

const ContenedorMemoria = require('../contenedores/ContenedorMemoria.js')
const ContenedorArchivo = require('../contenedores/ContenedorArchivo.js')

const contenedorArchivo = new ContenedorArchivo()
const contenedorMemoria = new ContenedorMemoria()

//--------------------------------------------
// instancio servidor, socket y api
    const app = express()
    const httpServer = new HttpServer(app)
    const io = new Socket(httpServer)

    app.use(express.static('./public'));
    app.get('/', (req, res) => {
        res.sendFile('index.html', { root: __dirname });
    });

//--------------------------------------------
// configuro el socket

io.on('connection', async socket => {
    console.log('nuevo usuario conectado');
    const productos = await contenedorArchivo.listarAll()
    socket.emit('productos', productos)

    socket.on('new-product', async prod => {
        const guardar = await contenedorArchivo.guardar(prod)
        const productos = await contenedorArchivo.listarAll()
        io.sockets.emit('productos', productos);
    });

    //---------------------

    const mensajes = await contenedorMemoria.listarAll()
    socket.emit("mensajes", mensajes)

    socket.on('new-mensaje', async msj=> {
        const guardar = await contenedorMemoria.guardar(msj)
        const mensajes = await contenedorMemoria.listarAll()
        io.sockets.emit("mensajes",mensajes)
    })
});

//--------------------------------------------
// agrego middlewares

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static('public'))

//--------------------------------------------
// inicio el servidor

const PORT = 8080
const connectedServer = httpServer.listen(PORT, () => {
    console.log(`Servidor http escuchando en el puerto ${connectedServer.address().port}`)
})
connectedServer.on('error', error => console.log(`Error en servidor ${error}`))
