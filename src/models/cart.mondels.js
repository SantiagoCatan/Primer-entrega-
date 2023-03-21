import mongoose from "mongoose"


const cartCollection = 'cart'

const productSchema = new mongoose.Schema({
    title:{type:String,require:true},
    type:{type:String,require:true},
    price :{type:Number,require:true},
    thumbnail :{type:String,require:true},
    code: {type:String,require:true},
    capacity: {type:Number,require:true}})

    
const cartModel = mongoose.model(cartCollection, productSchema)

export default cartModel