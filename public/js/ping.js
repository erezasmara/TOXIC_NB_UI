// wake up heroku 
console.log('start weak up heroku ml server ...')

fetch('https://toxic-nb-apis.herokuapp.com/ping',{
    method: "GET",
    headers: {'Content-Type':'application/json'}}
    ).then((response) =>{
    response.json().then((data) =>{
        if(data.error){
            console.log('Error , report to support')  // display on browser 
        }else{
            console.log(' Wake heroku ml server is Wake .')  // display on browser

        }
    })

})