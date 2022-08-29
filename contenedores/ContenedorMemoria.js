const fs = require('fs')

class ContenedorMemoria {
    constructor() {
        this.elementos = []
        this.id = 0
    }

    listar(id) {
        
    }

    async listarAll() {
        try {
            const data = await fs.promises.readFile("Mensajes","utf-8")
            let array = JSON.parse(data)
            return array
        } catch (error) {
            return("No hay mensajes")
        }
    }

    async guardar(msj) {
        try{
            let data= await this.listarAll()
            var date = new Date();
            var now = date.toLocaleTimeString('en-US');
            console.log(now);
            data=[...data,{username:msj.username,mensaje:msj.mensaje,dateTime: now }]
            let newArray=JSON.stringify(data)
            await fs.promises.writeFile("Mensajes",`${newArray}`)
            return({username:msj.username,mensaje:msj.mensaje,dateTime:"20:30"})
        }
        catch(error){
            let array = []
            array.push({username:msj.username,mensaje:msj.mensaje,dateTime:"20:30"})
            await fs.promises.writeFile("Productos",JSON.stringify(array))
            return(array)
        }
    }

    actualizar(elem, id) {
        
    }

    borrar(id) {
        
    }

    borrarAll() {
        
    }
}

module.exports = ContenedorMemoria
