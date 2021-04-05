module.exports = steps = {
  "": {
    question: `Доброе утро, хочешь открытку? `,
    btns: [
      {msg: 'Нет'},
      {msg: 'Да, давай'}
    ]
  },
  "Нет": {
    question: ` А я все равно пришлю, у тебя нет шансов.
    Вообще, я тебя атакую, вперед, котики-енотики, несите открытки в бой!`,
    btns: [
      {msg: 'Отстреливаться мемами'},
      {msg: 'Принять неизбежное'},
      {msg: 'Достать икону'}
    ]
  },

  "Отстреливаться мемами": {
    question: `О нет, мы все умрем!

     Ладно, мне не страшно. Что дальше?`,
    btns: [
      {msg: 'Принять неизбежное'},
      {msg: 'Достать икону'}
    ]
  },
  "Принять неизбежное": {
    question: `На открытку`,
    photoUrl: 'https://vk.com/vsratie_otkritky?w=wall-203141950_226',

    btns: [
      {msg: 'Попробовать еще раз'},
    ]
  },
  "Достать икону": {
    question: `Ну ты и стремный тип!
               На открытку.`,
    photoUrl: 'https://vk.com/vsratie_otkritky?w=wall-203141950_209',
    btns: [
      {msg: 'Попробовать еще раз'},
    ]
  },
  "Да, давай": {
    question: `Как-то ты слишком легко согласился. Не дам. Хотя ладно. Лови.`,
    photoUrl: 'https://vk.com/vsratie_otkritky?w=wall-203141950_217',
    //'https://sun9-23.userapi.com/impg/9QoR9Aa5T5-P5-1IKdm_Bnofaq9AjD7lhJbyxg/bG2BuqexUxU.jpg?size=617x544&quality=96&sign=4c752b00fd0dbfa37bc2dcd659e51d99&type=album',

    /*picture*/

  },

}
