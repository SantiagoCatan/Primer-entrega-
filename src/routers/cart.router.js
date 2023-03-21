//modularizacion por router
import { Router }  from 'express'
import cartService from '../controllers/cartController'
import Products from '../controllers/productsController';
import cartModel from '../models/cart.mondels'
import mongoose from 'mongoose';


const cartRouter = Router();

 // RUTA CARRITO
cartRouter.post("/", async (req, res) => {
    let base = {  productos: [] };
    await cartService.find(base).populate('_id');
    res.send({ Msj: "Carrito Guardado" });
  });
  
  cartRouter.delete("/:id", async (req, res) => {
    //REVISAR DELETE EN mongoose
    const { id } = req.params;
    res.json(await cartService.deleteCart(id));
    res.send({ Msj: "Carrito Borrado" });
  });
  
  cartRouter.get("/:id/productos", async (req, res) => {
    const { id } = req.params;
    let cart = await cartService.getById(id);
    console.log(cart.productos);
    if (cart.productos == undefined) {
      res.json({ msg: "No hay productos" });
    } else {
      res.json({ id: cart.id, productos: cart.productos });
    }
  });
  
  cartRouter.post("/:id/productos/:id_prod", async (req, res) => {
    const { id, id_prod } = req.params;
    const producto = await Products.getById(id_prod);
    const carritos = await cartService.getAll();
    const carrito = await cartService.getById(id);
    if (id > carritos.length) {
      res.json({ error: "No existe el carrito" });
    } else {
      const carritoActualizado = [...carrito.productos, producto];
  
      cartService.updateById(carrito.id, carrito.timestamp, carritoActualizado);
      res.json({ msg: "Producto agregado" });
    }
  });
  
  cartRouter.delete("/:id/productos/:id_prod", async (req, res) => {
    let { id, id_prod } = req.params;
    const carritos = await cartService.getAll();
    const carrito = await cartService.getById(id);
    if (id > carritos.length) {
      res.json({ error: "No existe el carrito" });
    } else {
      const listaActualizada = carrito.productos.filter(
        (element) => element.id != id_prod
      );
      cartService.updateById(carrito.id,  listaActualizada);
      res.json({ msg: "Producto eliminado" });
    }
  });
  

module.exports = cartRouter ;