// const doWorkPromise = new Promise((resolve, reject)=>{
//     setTimeout(()=>{
//         reject('things goes wrong')
//         //resolve('things goes well')
//     },3000)

// })

// doWorkPromise.then((result)=>{
//     console.log(result)
// }).catch((error)=>{
//     console.log(error)
// })


// const toxic = require('./src/utils/toxic.js')

// toxic.GetToxicPredict('שדגשדג').then((resolve)=>{
//     console.log(resolve)

// }).catch((reject)=>{
//     console.log(reject)
// })

const GenerateResponseMessage = (typeMessage) =>{
    var resForToxicMsg =['bad text','not ok text','fail','stop use this language']
    var resForOkMsg = ['good','keep with this language','i love when you speak like that','your the best']
    var random_number = Math.floor(Math.random() * 4);

    if(typeMessage == 'toxic'){
        return resForToxicMsg[random_number]
    }else{
        return resForOkMsg[random_number]
    }
}

console.log(GenerateResponseMessage('toxic'))