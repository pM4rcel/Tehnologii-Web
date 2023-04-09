// It permits the user to see the password that he's introducing as text
function togglePassword(event){
    const passInput = event.currentTarget.previousElementSibling;
    const slashedEye = event.currentTarget.firstElementChild;
    const normalEye = slashedEye.nextElementSibling;
    if(passInput.getAttribute('type') === 'password'){
        slashedEye.style.display = 'none';
        normalEye.style.display = 'block';
        passInput.setAttribute('type', 'text');
    }else{
        slashedEye.style.display = 'block';
        normalEye.style.display = 'none';
        passInput.setAttribute('type', 'password');
    };
}

// Later on: 
//          -> function that assures that password input and its confirmation match

// function popup(popping, element, state){
//     popping.style.display = state;
//     document.getElementById('mask').style.display = state;
// }