import mongoose from "mongoose"
import mongoosePaginate from "mongoose-paginate-v2"

const productCollection = 'Productos'

const productSchema = new mongoose.Schema({
    title:{type:String,require:true},
    type:{type:String,require:true},
    price :{type:Number,require:true},
    thumbnail :{type:String,require:true},
    code: {type:String,require:true},
    capacity: {type:Number,require:true}})


    productSchema.plugin(mongoosePaginate)
const productModel = mongoose.model(productCollection, productSchema)

export default productModel