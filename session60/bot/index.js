const TelegramBot = require('node-telegram-bot-api');
const db = require('../models')
const userController = require('../controllers/user.controller');

const bot = new TelegramBot('8581909201:AAG8swNEDKGDoCAq7EvvHd4qVHU9purrHxQ',{polling: true})

bot.onText(/\/start/,(msg)=> userController.start(bot,msg));
bot.onText(/\/balance/,(msg)=> userController.balance(bot,msg))
bot.onText(/\/add_balance\s+(\d+)\s+(\d+)/,async (msg,match)=>{
    
    let amount = parseInt(match[1])
    let id = match[2]

    let user = await db.Users.findOne({
        where:{
            telegramID:msg.from.id
        },
        include: [{
            model: db.Roles
        }]
    })
//SELECT * FROM users u WHER u.id = msg.from.id JOIN Roles r ON r.id = u.roleId;

    if(user.role.name == 'admin'){
        // console.log('admin is allowed')
        await userController.addBalance_admin(amount,id)
    }else{
        bot.sendMessage(
            msg.chat.id,
            `you are not allowed`
        )
    }
    
})
bot.on('message', (msg) => userController.addBalance(1,msg));

module.exports = bot