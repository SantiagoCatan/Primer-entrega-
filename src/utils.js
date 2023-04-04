import { fileURLToPath } from 'url'
import { dirname } from 'path'
import bcrypt from'bcrypt'
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default __dirname

//creacion de HASSH
export const createHash = password =>{
        return bcrypt.hashSync(password , bcrypt.genSaltSync(10))
}

//compara el HASH con la contraseña 
export const isValidPassword = (user,password) =>{
    return bcrypt.compareSync(password, user.password)
}

