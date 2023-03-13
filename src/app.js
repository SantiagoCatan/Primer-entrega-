import express from 'express'
import hbs from 'express-handlebars'
import mongoose from 'mongoose'
import usuarioRouter from './routers/usuario.router.js'
import productosRouter from './routers/productos.router.js'
import __dirname from './utils.js'
import productsDao from './seedProducts.js'

const app = express()
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


//motos de plantilla
app.engine(
    "hbs",
    engine({
      extname: ".hbs",
      defaultlayout: "index.hbs",
      layoutsDir: __dirname + "/views/layouts",
      partialsDir: __dirname + "/views/partials",
    })
  );
app.set('views', __dirname + '/views')
app.set ('view engine','handlebars')

//configuracion  de la carpeta publica

app.use(express.static(__dirname +'/public'))

//rutas
app.use ('/usuarios', usuarioRouter)
app.use ('/productos', productosRouter)

  

const uri = 'mongodb+srv://sannnty50:Mika14561@tiendaiphone.cpcjnks.mongodb.net/usuarios?retryWrites=true&w=majority'
mongoose.set('strictQuery', false)
mongoose.connect(uri, error =>{
    if (!error){
        console.log('DB connected!')
        app.listen (8080,()=> {
            app.get("/", async (req, res) => {
                res.render("productsDao");
              });
            })
    }else{
            console.log('no se pudo conectar con base de datos')
        }
    })