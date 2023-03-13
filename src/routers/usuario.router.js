import { Router }  from 'express'
import usuarioModel from '../models/usuarios.models.js'
const router = Router()



router.get('/', async(req , res)=> {

    const usuario = await usuarioModel.find().lean().exec()
    res.render ('listas',{ usuario })
})

router.get('/create', (req , res)=> {
    res.render('create')
})

router.get('/:name', async (req , res)=> {
    const name =req.params.name

    const usuario = await usuarioModel.findOne({name: name}).lean().exec()
    
    res.render('one',{
        name
    })
})

router.post('/', async (req , res)=> {
    const  newusuario =req.body
    const usuariogenerated = new usuarioModel(newusuario)

    await usuariogenerated.save()

    res.redirect(`/usario/${usuariogenerated.nombre}`)
})

router.delete('/:id', (req , res)=> {
    const id =req.params.id
    
    res.send (`Mostrando el usuario ${id}`)
})


export default router 