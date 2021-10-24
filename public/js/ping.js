// wake up heroku 
console.log('start weak up heroku ml server')

fetch('https://toxic-nb-apis.herokuapp.com/ping').then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            console.log('Error , report to support')  // display on browser 
        }else{
            console.log(data+ ': Wake heroku ml server is Wake .')  // display on browser

        }
    })

})