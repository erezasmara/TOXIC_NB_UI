console.log('hello from express')

const toxicForm = document.querySelector('form')
const input = document.querySelector('input')
const circle_loader = document.querySelector('.circle-animation')
const button = document.querySelector('#form_btm')
const popup = document.getElementById("myPopup");
const userTextReq = document.getElementById('userTextReq')
const toxicRes = document.getElementById('toxicRes')


toxicForm.addEventListener('submit',(e)=>{

    e.preventDefault()

    const text = JSON.stringify({data:input.value})
    input.style.display = 'none'
    input.value = ''
    button.style.display = 'none'
    circle_loader.style.display = 'table'
    popup.classList.toggle("show",false);



    //fetch post request to express server
    fetch("http://localhost:3000/toxic_predict",{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: text
        }).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            if(data.error){

                console.log({'error':data.error})
                circle_loader.style.display = 'none'
                button.style.display = ''
                input.style.display = ''
                popup.classList.toggle("show",true);
                popup.style.background = '#f500008a'
                userTextReq.textContent ='"' + (data.msg || '') + '"' 
                toxicRes.textContent = data.error


            }else{
                console.log(data)
                circle_loader.style.display = 'none'
                button.style.display = ''
                input.style.display = ''
                popup.classList.toggle("show",true);
                userTextReq.textContent ='"' + data.body.msg + '"' 
                toxicRes.textContent = data.tip.toString()

                if(!data.body.result){
                    popup.style.background = '#f500008a'

                }else{
                    popup.style.background = '#15ff009c'

                }
                
            }
        })
    })
})

