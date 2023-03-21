//modularizacion por router
import { Router }  from 'express'
import cartController from '../controllers/cartController.js'
import productsController from '../controllers/productsController.js';
import cartModel from '../models/cart.mondels.js'
import mongoose from 'mongoose';



  const cartRouter = Router();

 // CREA CARRITO EN MONGODB
  cartRouter.post("/", async (req, res) => {
    let products = req.body.pids

    const {_id}= await cartController.createCart({pids:products})

    res.send({ Msj: "Carrito Guardado" , id: _id});
  });
  
  cartRouter.delete("/:id", async (req, res) => {
    //REVISAR DELETE EN mongoose
    const { id } = req.params._id;
    const dele = await cartModel.findOne({ _id:id}).lean().exec() 
    res.send({ Msj: "Carrito Borrado" });
  });
  
  cartRouter.get("/:id/productos", async (req, res) => {
    const { id } = req.params;
    let cart = await cartModel.findOne({ _id:id}).lean().exec() ;
    if (cart == undefined) {
      res.json({ msg: "No hay productos" });
    } else {
      res.json({ id: cart.id, productos: cart.productos });
    }
  });
  
  cartRouter.put("/:id/productos/:id_prod", async (req, res) => {
    
    const { id, id_prod } = req.params;

    // 1. Buscar carrito por id en mongo, sino esta, retornar 404 (no existe carrito con id )
    
    const cart = await cartController.getCart(id)
    // 2. buscar los id_productos en el carrito, sino estan lo agrego
      let productos = cart.productos || []

      if (productos && productos.length > 0){
        let productoFinded = productos.find(id => id === id_prod);
        if(!productoFinded) productos.push(id_prod)
      }else{
        productos.push(id_prod)
      }
      cart.productos = productos
     
     const result = await cartController.updateCart(cart)
      
      res.json({ msg: "Producto agregado" , cart:result});
    }
  );
  
  cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
    let { id, id_prod } = req.params;
    const carritos = await cartController.getAll();
    const carrito = await cartController.getById(id);
    if (id > carritos.length) {
      res.json({ error: "No existe el carrito" });
    } else {
      const listaActualizada = carrito.productos.filter(
        (element) => element.id != id_prod
      );
      cartController.updateById(carrito.id,  listaActualizada);
      res.json({ msg: "Producto eliminado" });
    }
  });
  

export default  cartRouter ;