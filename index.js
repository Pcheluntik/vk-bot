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

       const scene = new Scene('Финал 2',
          (ctx) => {
            ctx.reply(step['Финал 2'].question);
          },
          (ctx) => {
            /*ctx.session.name = ctx.message.text;
            //ctx.scene.leave();
            ctx.reply(`Иди нахер, ${ctx.session.name}`);
            ctx.scene.leave();*/
          },
        );

        /*const scene2 = new Scene('Финал 3',
           (ctx) => {
             ctx.reply(step['Финал 3'].question);
           },
           (ctx) => {
             /*ctx.session.name = ctx.message.text;
             //ctx.scene.leave();
             ctx.reply(`Иди нахер, ${ctx.session.name}`);
             ctx.scene.leave();
           },
         );*/


       //Создаем объекты сессии и общей сцены
       //----------Почему передаем одну сцену в stage? Можно ли передавать сразу все сцены?
       const session = new Session();
       const stage = new Stage(scene);
       //const stage2 = new Stage(scene2);

        bot.use(session.middleware());
        bot.use(stage.middleware());

        /*bot.command('нет', (ctx) => {
          ctx.scene.enter('нет');
        });*/


        let keyboardTexts = [];
        //Метод реакции на сообщения
        bot.on((ctx) => {
          //если команда есть в шагах
          if (ctx.message.text == "Связаться с администратором")
          {
            ctx.reply(`Ваш звонок очень важен для нас, ожидайте на линии`);
            bot.stop();
          }
          if (steps[ctx.message.text]) {
            let step = steps[ctx.message.text];
            keyboardTexts = addBtns(ctx.message.text);
            let photoAttach = step.photoUrl ? step.photoUrl : null;
            ctx.reply(step.question, photoAttach, Markup
              .keyboard(keyboardTexts, { columns: 1}).oneTime());
            }

          //если сообщение неизвестно
          if (ctx.message.text != "Связаться с администратором" || steps[ctx.message.text] == false){
            keyboardTexts = addBtns('');
            ctx.reply(steps[''].question, null, Markup
              .keyboard(keyboardTexts, { columns: 1}).oneTime());
          }
        });

        bot.startPolling();

       bot.on('poll-error', error => {
           console.error('error occurred on a working with the Long Poll server ' +
               `(${util.inspect(error, false, 8, true)})`)
       })

       //Добавляем кнопки в сообщение
       function addBtns(textCommand) {
         keyboardTexts = [];
         if(steps[textCommand].btns) {
           for (let i =0; i < steps[textCommand].btns.length; i++ )
           {
             keyboardTexts.push(steps[textCommand].btns[i].msg);
           }
         }
         return keyboardTexts;
       }
