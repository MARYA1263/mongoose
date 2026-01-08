const db = require('../models')

exports.findOrCreateUser = async (msg) =>{
    const [user,created] = await db.Users.findOrCreate({
        where:{
            telegramID:msg.from.id
        },
        defaults:{
            userName:msg.from.username
        }
    })

    if(created){
        const role = await db.Roles.findOne({
            where:{
                name:'noob'
            }
        })
        await  user.setRole(role)
    }
    
    return user
}

exports.addCoin = async (telegramID,amount)=>{
    const user = await db.Users.findOne({
        where:{
            telegramID:telegramID
        }
    })

    console.log(user)

    user.coins += amount

    await user.save();

    return user
}