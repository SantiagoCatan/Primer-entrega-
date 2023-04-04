import passport from "passport";
import local from 'passport-local'
import usuarioModel from "../models/usuarios.models";
import GitHubStrategy from 'passport-github2'
import { createHash, isValidPassword } from "../utils";

const localStrategy = local.Strategy

const initializePassport = () =>{


    //iniciar con github
    passport.use('github', new GitHubStrategy({
        clientID:"Iv1.d8b7248250f0d111",
        clientSecret:"6ea6bcec91df938fbc5211a417e49c40d1ae0808",
        callbackURL: "http://localhost:8080/api/session/githubcallback"

    },async(accessToken,reFreshToken,profile, done)=>{
            console.log(profile)
            done (null,profile)

    }))

    //registra usuario nuevo-hash en password
    passport.use('register', new localStrategy({

        passReqToCallback: true ,
        usernameField: 'email'
    },async(req, username, password, done) => {
        const {first_name,last_name,email,age} = req.body
        try{
            const user = await usuarioModel.findOne({email: username})
                if (user){
                    console.log("user alread exists")
                    return done(null,false)
                }

                const newUser = {
                    first_name,
                    last_name,
                    email,
                    age,
                    password: createHash(password)
                }
                const result = await usuarioModel.create(newUser)
                
                return done(null,result)

        } catch(err){

            return done ("error al obtener user")
        }
    }))

    //buscar username y password(hash),y logea

    passport.use('login', new localStrategy({
        usernameField: 'email'
    },async(username, password, done)=>{
        try{
            const user = await usuarioModel.findOne({email:username})

            if(!user) {
                console.log("user doesn/'t exits")
                return done(null,user)
            }

            if(!isValidPassword(user, password)) return done(null, false)
            return done(null,user)


        } catch(err){


        }
    

    }))

    passport.serializeUser((user , done)=>{

        done(null , user._id)
    })

    passport.deserializeUser(async (id , done) =>{

        const user = await usuarioModel.findById(id)
        done(null,user)

    })
}

export default initializePassport