import  User  from "./models/user.model.js"
import bcrypt, { hash } from "bcrypt"
import connectTotDatabase from "./db/db.js"

const userRegister = async () => {
    connectTotDatabase()
    try {
        const hashPassword = await bcrypt.hash("admin123", 10)
        const newUser = new User(
            {
                name: "Admin",
                email: "admin@gmail.com",
                password: hashPassword,
                role: "admin"
            })
            await newUser.save()
            
        } catch (error) {
            console.log(error)
        }
}

userRegister()