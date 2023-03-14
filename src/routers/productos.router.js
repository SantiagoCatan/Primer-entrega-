import { Router }  from 'express'
import seedProducts from '../controllers/productsController.js'
import productModel from '../models/product.models.js'


const router = Router()
//mostrar todos los productos
// 1. GET OK
router.get('/' ,async (req ,res )=>{
    // res.send('Lista de productos...')
    const productos = await productModel.find().lean().exec()
    console.log(productos)
    res.render('productos', { productos })
})

// SeedProducts
router.get('/seedProducts' ,async (req ,res )=>{
  
  const product = await seedProducts()
  return res.status(201).json({status:"success" , message:"Productos agregados!"})
})

/// localhost:8080/api/products/1 => param
// api/products?id=1 => query
// 2. Get by ID
router.get('/:id' , (req ,res )=>{



    const {id} = req.query
    //recorro el Products.json -metodo find : id
   
})

//Poder agregar mas productos
// 3. POST OK
router.post('/' , async (req ,res )=>{
    const {title, descriptions, price, thumbnail, code, capacity} = req.body;
    
    const status = await productService.addEvent(title, descriptions, price, thumbnail, code, capacity)
    if (status === 400 ){
        return res.status(400).json({status:"error",massage:"Producto invalido"})
    }

    return res.status(201).json({status:"success" , message:"Producto Creado!"})
})


export default router 