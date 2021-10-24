# Toxic Comments Classification Naive base UI
Project Structure:
```
Toxic_nb_UI
├─ README.md
├─ package-lock.json
├─ package.json
├─ public
│  ├─ css
│  │  ├─ form.css
│  │  ├─ loader.css
│  │  ├─ nav.css
│  │  ├─ popup.css
│  │  └─ style.css
│  ├─ img
│  │  ├─ bad.png
│  │  ├─ guru.png
│  │  ├─ ok.png
│  │  └─ profile_pic.jpeg
│  └─ js
│     └─ app.js
├─ src
│  ├─ app.js
│  └─ utils
│     └─ toxic.js
├─ templates
│  ├─ partials
│  │  ├─ footer.hbs
│  │  └─ header.hbs
│  └─ views
│     ├─ 404.hbs
│     ├─ about.hbs
│     ├─ help.hbs
│     ├─ home.hbs
│     └─ index.hbs



```
Description:
TOXIC application can detect if your comment is toxic, the process done by ML (written with python) ,
for more information visit github projects link.

Requirement:
- "express": "^4.17.1",
- "hbs": "^4.1.2",
- "nodemon": "^2.0.14",
- "request": "^2.88.2"


CODE
app.js
```JS

const express = require('express')
const path = require('path')
const hbs = require('hbs')
const toxic = require('./utils/toxic.js')

//define express
const app = express()
const port = process.env.PORT || 3000
app.use(express.json());


//define path to project file
const publicDirPath = path.join(__dirname,'../public')
const viewDirPath = path.join(__dirname,'../templates/views')
const partialsDirPath = path.join(__dirname,'../templates/partials')
console.log(publicDirPath)


//define views & hbs engine
app.set('view engine','hbs')
app.set('views',viewDirPath)
hbs.registerPartials(partialsDirPath)

//setup static directory to serve
app.use(express.static(publicDirPath))


//Routes
app.post('/toxic_predict',(req,res) =>{

    if(!req.body || req.body.data.length <= 0){
        return res.status(404).send({
            error : "Please provide a text to begin the process."
        })
    }else if(req.body.data.length > 50){
        return res.status(404).send({
            error : "Maximum 50 characters is required."
        })
    }
    // send the request to machine learning server
    toxic.GetToxicPredict(req.body).then((resolve) =>{
        console.log(resolve);
        res.status(201).send(resolve)
    }).catch((reject) =>{
        res.status(404).send(reject)
    })

})

app.get('',(req,res) =>{
    res.render('index',{
        title:"title",
        description:"description",
        name :'Erez Asmara'
    })
})

app.get('/home',(req,res) =>{
    res.render('home',{
        title:"HOME",
        message:"",
        description:"description",
        name :'Erez Asmara'
    })
})

app.get('/about',(req,res) =>{
    res.render('about',{
        title:"ABOUT",
        message:"Back-end Developer",
        description:"description",
        name :'Erez Asmara'
        
    })
})


app.get('/help',(req,res) =>{
    res.render('help',{
        title:"HELP",
        message:"Toxic comments naive base application",
        description:"this application can detect if your comment is toxic, the process done by ML (written with python) , for more information visit github projects link.",
        name :'Erez Asmara'
    })
})


app.get('/*',(req,res) =>{
    res.render('404',{
        title:"404",
        message:"Require page not found.",
        description:"description",
        name :'Erez Asmara'
    })
})




app.listen(3000, () =>{
    console.log(`Server is up on port: ${port}`)
})
```
toxic.js
```JS
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
```