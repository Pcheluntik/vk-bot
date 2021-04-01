/* { Bot, Keyboard, KeyboardColor } = require('node-vk-bot');
const util = require('util');

const steps = require('./steps');

const bot = new Bot({
    token: '20bcfc9fccc77d5d862a43bb462b35a2bc7bb260a1eb30aac1a55ce0a607023972b7b9ccd6d77c916f0aa',
    group_id: 203141950
}).start();

console.log('Bot started!');

bot.get(/./i, (message, exec, reply) => {
  let keyboard = new Keyboard(true);*/
  /*let info;*/
//  let info = message.payload && steps[JSON.parse(message.payload)] || steps[''];
//  let photo = message.uploadPhoto && steps[JSON.parse(message.uploadPhoto)] || steps[''];

  /*if (message.payload) {
        info = JSON.parse(message.payload);
        console.log(steps[info]);
        messageFromBot = steps[info];
      } else {
        messageFromBot = steps[''];
      };*/
/*  for (let i = 0; i < info.btns.length; i++) {
    if (i) keyboard.addRow();
    const btn = info.btns[i];
    keyboard.addButton(btn.msg, KeyboardColor.PRIMARY, JSON.stringify(btn.next));
  }

    if (info.photoUrl) {
      console.log(photo.photoUrl);
      reply(photo.photoUrl, {keyboard}).catch(e => console.error(e));
    } else {
      reply(info.question, {keyboard}).catch(e => console.error(e));
    };
})

bot.on('poll-error', error => {
    console.error('error occurred on a working with the Long Poll server ' +
        `(${util.inspect(error, false, 8, true)})`)
})*/

/*TO DO: 1. Подключить бота
       2. Заставить его отвечать*/

       //Подключаем модули
       VkBot = require('node-vk-bot-api');
       const util = require('util');
       const steps = require('./steps');

       const Stage = require('node-vk-bot-api/lib/stage');
       const Markup = require('node-vk-bot-api/lib/markup');
       const Scene = require('node-vk-bot-api/lib/scene');
       const Session = require('node-vk-bot-api/lib/session');

       const API_KEY = require('./API_KEY');
       //Для получения записей со стены сообщества


       //Создаем экземляр бота
       const bot = new VkBot({
         token: API_KEY.myToken,
         group_id: API_KEY.groupID,
       }).start();
       console.log('Bot started!');

       const scene = new Scene('нет',
          (ctx) => {
            ctx.scene.next();
            ctx.reply('Все равно получишь, ок?');//.catch(e => console.error(e));
          },
          (ctx) => {
            ctx.session.name = ctx.message.text;
            //ctx.scene.leave();
            ctx.reply(`Иди нахер, ${ctx.session.name}`);
            ctx.scene.leave();
          },
        );


       //Создаем объекты сессии и общей сцены
       //----------Почему передаем одну сцену в stage? Можно ли передавать сразу все сцены?
       const session = new Session();
       const stage = new Stage(scene);

        bot.use(session.middleware());
        bot.use(stage.middleware());

        /*bot.command('нет', (ctx) => {
          ctx.scene.enter('нет');
        });*/


        let keyboardTexts = [];
        bot.on((ctx) => {
          if (steps[ctx.message.text]) {
            keyboardTexts = addBtns(ctx.message.text);
            ctx.reply(steps[ctx.message.text].question, null, Markup
              .keyboard(keyboardTexts).oneTime());
          }
          else  {
            keyboardTexts = addBtns('');
            ctx.reply(steps[''].question, null, Markup
              .keyboard(keyboardTexts).oneTime());
          }
        });

        bot.startPolling();

       bot.on('poll-error', error => {
           console.error('error occurred on a working with the Long Poll server ' +
               `(${util.inspect(error, false, 8, true)})`)
       })

       function addBtns(textCommand) {
         keyboardTexts = [];
         for (let i =0; i < steps[textCommand].btns.length; i++ )
         {
           keyboardTexts.push(steps[textCommand].btns[i].msg);
         }
         return keyboardTexts;
       }
