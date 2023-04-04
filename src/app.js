import express from 'express'
import hbs from 'express-handlebars'
import mongoose from 'mongoose'
import usuarioRouter from './routers/usuario.router.js'
import productosRouter from './routers/productos.router.js'
import cartRouter from './routers/cart.router.js'
import sessionRouter from './routers/session.router.js'
import session from 'express-session'
import cookieParser  from 'cookie-parser'
import __dirname from './utils.js'
import MongoStore from 'connect-mongo'
import passport from 'passport'
import initializePassport from './config/passport.config.js'

const app = express()
const uri = 'mongodb+srv://sannnty50:Mika14561@tiendaiphone.cpcjnks.mongodb.net/?retryWrites=true&w=majority'



app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//motor de plantilla
app.engine('handlebars', hbs.engine())
app.set('views', __dirname + '/views')
app.set ('view engine','handlebars')

//configuracion  de la carpeta publica
app.use(express.static(__dirname +'/public'))

app.use(session({
    store: MongoStore.create({ 
        mongoUrl: uri,
        dbName: "Session",
        mongoOptions:{
            useNewUrlParser: true,
            useUnifiedTopology: true
        },
        ttl:110,
    }),
    secret:'c0der',
    resave:true,
    seveUninitialized:true

}))

//inicializacion de password
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

//rutas
app.use ('/usuarios', usuarioRouter)
app.use ('/productos', productosRouter)
app.use ('/carts', cartRouter)
app.use ('/session', sessionRouter)



mongoose.set('strictQuery', false)

app.use(cookieParser("CookieGenerada"))



mongoose.connect(uri, error => {
    if (error) {
        console.log('No se pudo conectar con la base de datos')
       return
    }
    
    console.log('DB connected!')
    const server = app.listen(8080, () => console.log('Server Up!'))
     server.on('error', e => console.log(e))
 })


