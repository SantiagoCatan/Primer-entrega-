import mongoose from "mongoose"

const  usuarioscolleccion = "usuarios"

const usuarioSchema = new mongoose.Schema({
    id: Number,
    name: String,
    type: String,
})

const usuarioModel = mongoose.model (usuarioscolleccion, usuarioSchema)

export default usuarioModel