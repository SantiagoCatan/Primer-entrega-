//modularizacion por router
import { Router }  from 'express'
import cartController from '../controllers/cartController.js'
import productsController from '../controllers/productsController.js';
import cartModel from '../models/cart.mondels.js'
import mongoose from 'mongoose';



const cartRouter = Router();

 // RUTA CARRITO
cartRouter.post("/", async (req, res) => {
    let base = {  carrito: [] };
    await cartController.save(base).populate('_id');
    res.send({ Msj: "Carrito Guardado" });
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
  
  cartRouter.post("/:id/productos/:id_prod", async (req, res) => {
    const { id, id_prod } = req.params;
    const producto = await productsController.getById(id_prod);
    const carritos = await cartController.getAll();
    const carrito = await cartController.getById(id);
    if (id > carritos.length) {
      res.json({ error: "No existe el carrito" });
    } else {
      const carritoActualizado = [...carrito.productos, producto];
  
      cartController.updateById(carrito.id, carrito.timestamp, carritoActualizado);
      res.json({ msg: "Producto agregado" });
    }
  });
  
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