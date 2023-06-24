import {getCookie} from "./utils.js";

const navigation = document.querySelector('ul.nav__linkslist');
console.log(navigation)

export const buildNav = () => {
    const navLink = document.createElement('div');
    navLink.className = "nav__link";

    if(getCookie('name')){
        navigation.removeChild(navigation.lastChild);
        navigation.appendChild(buildNavLink('/login', 'Login'));
    }else{
        navigation.removeChild(navigation.lastChild);
        navigation.appendChild(buildNavLink('/profile', 'Profile'));
    }
}

class NavLink extends HTMLElement{
    #linkUrl;
    #text;
    constructor(aLink, aText) {
        super();


    }
}

const buildNavLink = (linkUrl, text) => {
    const link = document.createElement('li');
    link.className = 'nav__link';
    const anchor = document.createElement('a');
    anchor.href = linkUrl;
    anchor.className = 'link';
    anchor.textContent = text;
    link.appendChild(anchor);
    return link;
}

