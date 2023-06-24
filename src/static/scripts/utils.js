export const getCookie = (name) => {
    for(let str in document.cookie.split(";")){
        if(str.trim().startsWith(name + '='))
            return true;
    }
    return false;
}