import mongoose from "mongoose"

const  usuarioscolleccion = "users"

const usuarioSchema = new mongoose.Schema({
    name: { type:String},
    last_name: { type:String},
    email: { type:String},
    age: Number,
    password: { type:String},
})
mongoose.set("strictQuery",false)//obligatorio , si no tirrar undefind


const usuarioModel = mongoose.model (usuarioscolleccion, usuarioSchema)

export default usuarioModel