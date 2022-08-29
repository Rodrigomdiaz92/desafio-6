const fs = require('fs')

class ContenedorArchivo {

    constructor() {
    }

    async listar(id) {
        try{
            const array = await this.listarAll()
            let encontrado=[]
            for(let i = 0;i<array.length;i++){
                if(array[i].id===id){
                    encontrado=array[i]
                }
            }
            if (encontrado.length===0) {
                return("No existe ese id")
            }else{
                return(encontrado)
            }
        }catch(error){
            return("Ocurrio un problema")
        }
    }

    async listarAll() {
        try {
            const data = await fs.promises.readFile("Productos","utf-8")
            let array = JSON.parse(data)
            return array
        } catch (error) {
            console.log("No existe el archivo")
        }
    }

    async guardar(prod) {
        try{
            let data= await this.listarAll()
            let newId=data[data.length-1].id+1
            data=[...data,{title:prod.title,price:prod.price,thumbnail:prod.thumbnail,id:newId}]
            let newArray=JSON.stringify(data)
            await fs.promises.writeFile("Productos",`${newArray}`)
            return({title:prod.title,price:prod.price,thumbnail:prod.thumbnail,id:newId})
        }
        catch(error){
            let array = []
            array.push({title:prod.title,price:prod.price,thumbnail:prod.thumbnail,id:1})
            await fs.promises.writeFile("Productos",JSON.stringify(array))
            return(array)
        }
    }

    async actualizar(prod, id) {
        const array = await this.listarAll()
        let newArray=[]
        let nuevo = false
        for(let i=0;i<array.length;i++){
            if(array[i].id!==id){
                newArray.push(array[i])
            }else{
                nuevo=true
                newArray.push({prod,id:id})
            }
        }
        if(nuevo){
            let data=JSON.stringify(newArray)
            await fs.promises.writeFile("Productos",`${data}`)
            return(newArray)
        }else{
            return("id invalido")
        }
    }

    async borrar(id) {
        try{
            const array = await this.listarAll()
            let newArray=[]
            let borrado=""
            for(let i=0;i<array.length;i++){
                if(array[i].id!==id){
                    newArray.push(array[i])
                }else{
                    borrado=array[i]
                }
            }
            if(borrado!==""){
                await fs.promises.writeFile("Productos",JSON.stringify(newArray))
                return(borrado)
            }else{
                return("id invalido")
            }
        }catch(error){
            return("Ocurrio un error")
        }
    }

    async borrarAll() {
        try{
            await fs.promises.writeFile("Productos",[])
        }catch(err){
            return("error")
        }
    }
}

module.exports = ContenedorArchivo