//Manejo y creacion de json de productos
import mongoose from "mongoose"
import db from "../models/cart.mondels.js"



class cartController {
    constructor() {}
static cart = []
    //funcion para genera el enerador
   static generadorIds = () => {
        const count = this.cart.length

        if (count === 0) {
            return 1
        } else {
            return (this.cart[count - 1].id) + 1
        }

    }
    //funcion para generar el array y pushearlo dentro del mismo
   static createCart = async ({cid,pids}) => {
        let cart = {
            products:pids
        };
        
        if(cid === undefined){
            cid = this.generadorIds()
        }

        cart.id = cid
        

        //Validad(obligatorio)
        if (!pids || pids.length === 0) {
            
            console.error("faltan parametros")
            return  400;
        }
      
        return this.saveCart(cart)
    }

    static saveCart = async(cart) =>{
        const cartGenerated = new db(cart)
        return await cartGenerated.save()
     
    }

    static deleteCart = async(db,id) => {

        if(db.length === 0){
            return 400;
        }

        const dbFiltered = db.filter(p => p.id != parseInt(id))
       
        if (dbFiltered.length === db.length){
            return 404;
        }
        await this.saveCart(dbFiltered)

        return 200;
    }


    
    static getCart = async (id)=>{
        return await db.findById(id);
    }


    static updateCart = async (cart)=>{
        return await db.updateOne({ _id: cart._id}, {products:cart.products})

    }

}
export default cartController

