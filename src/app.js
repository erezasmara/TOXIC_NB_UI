
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
app.get('/',(req,res) =>{
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
        message:"this is some helpful text.",
        description:"description",
        name :'Erez Asmara'
    })
})


app.post('/toxic_predict',(req,res) =>{

    if(!req.body || req.body.data.length <= 0){
        return res.status(404).send({
            error : "you must provide text."
        })
    }else if(req.body.data.length > 50){
        return res.status(404).send({
            error : "max 50 Characters"
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


app.get('/*',(req,res) =>{
    res.render('404',{
        title:"404",
        message:"Require page not found.",
        description:"description",
        name :'Erez Asmara'
    })
})




app.listen(3000, () =>{
    console.log('Server is up on port: ' + port)
})