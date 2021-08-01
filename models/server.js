const express = require('express')
const cors = require('cors');
const { socketController } = require('../sockets/controllers');

class Server {
    constructor() {
        // Inicializaciones
        this.app = express()
        this.server = require('http').createServer( this.app )
        this.io     = require('socket.io')( this.server );
        this.port = process.env.PORT

        this.paths = {}

        //Middlewares
        this.middlewares()

        // Sockets
        this.sockets()
    }
    middlewares() {
        //CORS
        this.app.use( cors() )
        //Directorio Publico
        this.app.use(express.static('public'))
    }
    sockets() {
        this.io.on("connection", socketController)
    }
    listen() {
        this.server.listen(this.port, () => {
            console.log(`Servidor corriendo en el puerto ${this.port}`)
        })
    }
}

module.exports = Server