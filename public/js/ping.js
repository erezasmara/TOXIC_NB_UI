// wake up heroku 
console.log('start weak up heroku ml server ...')



fetch('https://toxic-nb-apis.herokuapp.com/ping',{
    method: "GET",
    mode: 'no-cors',
    headers: {'Content-type': 'application/json'}}
    ).then((response) =>{
    
    response.text().then((data) =>{
        console.log(data)
        console.log('Wake heroku ml server is Wake .')  // display on browser

    })

})