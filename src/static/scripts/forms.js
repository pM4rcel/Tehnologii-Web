const togglePassword= event => {
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
    }
};
