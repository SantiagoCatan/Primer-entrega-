import express from 'express'
import hbs from 'express-handlebars'
import mongoose from 'mongoose'
import usuarioRouter from './routers/usuario.router.js'
import productosRouter from './routers/productos.router.js'
import cartHandler from './routers/cart.router.js'
import __dirname from './utils.js'


const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//motor de plantilla
app.engine('handlebars', hbs.engine())
app.set('views', __dirname + '/views')
app.set ('view engine','handlebars')



//configuracion  de la carpeta publica

app.use(express.static(__dirname +'/public'))

//rutas

app.use ('/usuarios', usuarioRouter)
app.use ('/productos', productosRouter)
app.use ('/carts', cartHandler)


const uri = 'mongodb+srv://sannnty50:Mika14561@tiendaiphone.cpcjnks.mongodb.net/usuarios?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
mongoose.connect(uri, error => {
    if (error) {
        console.log('No se pudo conectar con la base de datos')
        return
    }
    console.log('DB connected!')

    const server = app.listen(8080, () => console.log('Server Up!'))
    server.on('error', e => console.log(e))
})

