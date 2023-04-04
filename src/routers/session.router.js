import { Router } from 'express'
import usuarioModel from '../models/usuarios.models.js'
import creatHash, { isValidPassword } from '../utils'
import passport from 'passport'



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
router.post('/registro', passport.authenticate('register',{failureRedirect:'/session/failRegister'}) , async (req,res)=>{

    res.redirect('/session/login')
})


//"VISTA" error-arma una visualizacion
router.get ('/failRegister',(req,res)=>{

    res.send({error: 'failRegister'})
})



//VISTA logiando
router.get ('/login',(req,res)=>{

    res.render('session')
})

//logeo con GITHUB

router.get ('/github',passport.authenticate('github', {scope: [ 'user:email' ]}),(req,res)=>{


})

router.get('/githubcallback',passport.authenticate('github',{failureRedirect:'/login'},async(req,res)=>{
    console.log("callback",user.req)
    req.session.user=req.user
    console.log("User session", req.session.user)
    res.redirect("/")
}))


//API  de logeo
router.post ('/login',passport.authenticate('login',{failureRedirect: '/session/failLogin'}),async(req,res)=>{
   
    if(!req.user){
            return res.status(400).send({status:'error',error:'invalid credentiales'})

    }
        req.session.user={
            first_name:req.user.first_name,
            last_name:req.user.last_name,
            email:req.user.email,
            age:req.user.age,
        }

    res.redirect('/productos')
})

//error al logiarse
router.get ('/failLogin', (req,res)=>{

    res.send({error: 'Fail Login'})

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