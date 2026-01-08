const connectDB = require("./config/db")
const User = require("./models/user")
const Role = require("./models/role")
const bot = require('./bot')

let roles = ['admin','noob','junior','senior']

connectDB()

const db = require('./models')
async function main(){
    try{
        await db.mongoose.sync({force:true})

        for(let role of roles){
            await db.Roles.create({
                name:role
            })
        }
        
        let role = await db.Roles.findOne({
            where:{
                name : 'admin'
            }
        })
        let admin = await db.Users.create({
            telegramID:1701682483,
            userName:'ousslr',
            coins:99999
        })
        await admin.setRole(role)
        console.log('bot is running...')
    }catch(e){
        console.error(e)
    }
}

main()
