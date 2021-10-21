
const request = require('request')

//send request to python toxic_nb_apis server with promise mythologic
// const GetToxicPredict = (commit = 'test',callback) =>{
//     var url_ = 'https://toxic-nb-apis.herokuapp.com/'

//     const body = {data: commit}
//     request({
//         method : 'post',
//         url : url_,
//         body:body,
//         json:true
//     },(error,{body}={})=>{
//         if(error){
//             callback('unable to connect to server',undefined)
//         }else if(body.error){
//             callback({"Error": body.error},undefined)
//         }else{
//             callback(undefined,body)
//         }
//     })
// }


//making http request and wrap it with promise
//the predict model built python and flask server
const GetToxicPredict = (commit) =>{

    return new Promise((resolve,reject) =>{
        var url_ = 'https://toxic-nb-apis.herokuapp.com/'
       
        request({
            method : 'post',
            url : url_,
            body:commit,
            json:true

        },(error,{body}={})=>{
            if(error){
                reject({'error': 'Unable connect to server'})
            }else if(body.error){
                reject({'error': body.error})
            }else{
                resolve({body,
                        tip:GenerateResponseMessage(body.result)})
            }
        })

    })

}

// GetToxicPredict('hello').then((resolve)=>{
//     console.log(resolve)

// }).catch((reject)=>{
//     console.log(reject)

// })


//generate tip for user
const GenerateResponseMessage = (typeMessage) =>{
    var resForToxicMsg =['bad text','not ok text','fail','stop use this language']
    var resForOkMsg = ['good','keep with this language','i love when you speak like that','your the best']
    var random_number = Math.floor(Math.random() * 4);

    if(!typeMessage){
        return resForToxicMsg[random_number]
    }else{
        return resForOkMsg[random_number]
    }
}


module.exports = {
    GetToxicPredict:GetToxicPredict,
}