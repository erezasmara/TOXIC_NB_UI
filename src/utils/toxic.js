
const request = require('request')

//send request to python toxic_nb_apis server with promise mythologic
// const GetToxicPredict = (commit = 'test',callback) =>{
//     var url_ = 'url'

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
        var url_ = 'url'
       
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
    var resForToxicMsg = ['"Positive anything is better than negative nothing."',
                        '"One small positive thought can change your whole day."',
                        '"Be positive. Be true. Be kind.','Accentuate the positive, Eliminate the Negative, latch onto the affirmative."',
                        '"Positive thinking is more than just a tagline. It changes the way we behave."',
                        '"The positive thinker sees the invisible, feels the intangible, and achieves the impossible."',
                        '"It makes a big difference in your life when you stay positive."',
                        '"Positive thinking will let you do everything better than negative thinking will."',
                        '"Once you replace negative thoughts with positive ones, you’ll start having positive results."',
                        '"An attitude of positive expectation is the mark of the superior personality."']
    var resForOkMsg = resForToxicMsg
    var random_number = Math.floor(Math.random() * 9);

    if(!typeMessage){
        return resForToxicMsg[random_number]
    }else{
        return resForOkMsg[random_number]
    }
}


module.exports = {
    GetToxicPredict:GetToxicPredict,
}