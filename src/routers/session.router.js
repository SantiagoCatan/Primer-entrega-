import { Router } from 'express'
import usuarioModel from '../models/usuarios.models.js'

const router = Router()

//donde guardar la session //mongo

const auth = (res,req,next) =>{
        if(req.session?.user) return next()
        return res.status(401).send('auth error')
}

//VISTA de registro de usuario

router.get('/registro',(req,res)=>{
    
    res.render('registro')
})

//API  de registro de usurio
router.post('/registro',async (req,res)=>{

    const usernew = req.body
    const user = new usuarioModel(usernew)
    console.log("BODDYYYY:" , usernew)
    console.log("USER TO SABEL:  ",user)
    await user.save()//cotroller? 

    res.redirect('/session/login')
})


//VISTA logiando
router.get ('/login',(req,res)=>{

    res.render('session')
})


//API  de logeo
router.post ('/login',async(req,res)=>{
    const { email , password } = req.body

    const user = await usuarioModel.findOne({email, password}).lean().exec()
    console.log(user)
    if(!user){
        return res.status(401).render('errors/base',{
            error:"Error en el mail y/o contraseña"
        })
    }
   
    req.session.user = user
    req.session.admin = true
    
    res.redirect('/productos')
})


router.get ('/private', auth, (req,res)=>{
    res.send('private page')

})


//elliminar sesion
router.get ('/logout',(req,res)=>{
    req.session.destroy(err =>{
        if(err) {
            res.star('logout ok!').render('error'),{
                error:err
            } 
        }
        else {
            res.redirect('/session/login')
        }
    })
 
}
)

// //para enviar la cookie al cliente
// router.get('/setSignedCookie',(req,res)=>{
//     res.cookie('nombre de la Cookie','Valor de la cookie',{maxAge:5000}).send("Cookie")
// })
// router.get('/getCookie',(req,res)=>{
//     res.send(req.signedCookies)
// })
// router.get('/deleteCookie',(req,res)=>{
//     res.clearCookie('nombre de la Cookie'.send('cookie a sido Borrada'))

// })


export default router 