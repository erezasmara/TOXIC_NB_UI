console.log('hello from toxic ui application')
//colors
const RedColor = 'rgb(245, 0, 0, 0.5)'
const GreenColor = 'rgb(0, 255, 0, 0.3)'
const BlueColor = 'rgba(44, 121, 221, 0.3)'
//images
const BadImg = '/img/bad.png'
const OkImg = '/img/ok.png'
//show & hide content
const hide = 'none'
const display = 'table' 

//getting form elements
const toxicForm = document.querySelector('form')
const titleFormBox = document.getElementById('titleForm')
const input = document.querySelector('input')
const button = document.querySelector('#form_btm')
const circle_loader = document.querySelector('.circle-animation')
//getting popup response elements
const popup = document.getElementById("myPopup");
const userTextReq = document.getElementById('userTextReq')
const toxicRes = document.getElementById('toxicRes')
const popupArrow = document.getElementById('popup-arrow')
const statusImg = document.getElementById('statusImg')


toxicForm.addEventListener('submit',(e)=>{

    e.preventDefault()
    const comment = JSON.stringify({data:input.value})
    //reset form
    input.value = ''
    InitFormValue('LOADING...', display, hide, hide)
    popup.classList.toggle("show",false);
    

    //fetch post request to express server
    fetch("<url>",{
        method: "POST",
        headers: {'Content-Type':'application/json'},
        body: comment,
        }).then((response)=>{
        response.json().then((data)=>{
            console.log(data)
            if(data.error){
                InitValuesPopup(RedColor,RedColor,'',data.error,BadImg)
                InitFormValue('INSERT YOURS COMMENT', hide, display, display)
                popup.classList.toggle("show",true);
                
            }else{
                InitFormValue('INSERT YOURS COMMENT', hide, display, display)
                popup.classList.toggle("show",true);

                if(!data.body.result){
                    InitValuesPopup(RedColor, RedColor, 'Trying to improve your self', data.tip.toString(), BadImg)

                }else{
                    InitValuesPopup(GreenColor, GreenColor, 'It seems you know how to behave accordingly', data.tip.toString(), OkImg)

                }
            }
        })
    })
})


// toggle on div guru
const GuruPop = () => {
    InitValuesPopup(BlueColor,BlueColor,'Namaste','Positive thinking is more than just a tagline. It changes the way we behave....',' ')
    popup.classList.toggle("show");
}

// initial popup
const InitValuesPopup = (_displayPopup,_popupArrow,_userTextReq,_toxicRes,_statusImg) =>{
    popup.style.background = _displayPopup || popup.style.background
    popupArrow.style.borderTopColor = _popupArrow || popupArrow.style.borderTopColor
    userTextReq.textContent = _userTextReq || ''
    toxicRes.textContent = _toxicRes || toxicRes.textContent
    statusImg.src = _statusImg || statusImg.src
   
}

//initial form
const InitFormValue = (_titleFormBox,_circle_loader,_button,_input) =>{
    titleFormBox.textContent = _titleFormBox || titleFormBox.textContent
    circle_loader.style.display = _circle_loader || circle_loader.style.display
    button.style.display = _button || button.style.display
    input.style.display = _input || input.style.display

}
 


