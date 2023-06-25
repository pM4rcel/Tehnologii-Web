const navigationLinks = document.querySelector(".nav__linkslist");
console.log(navigationLinks);
console.log(navigationLinks.firstChild);

document.addEventListener("DOMContentLoaded", () => {
    document.querySelector("label.nav__toggle > input").addEventListener("change", (event) => {
        if(event.target.checked)
            navigationLinks.parentElement.style.top = "2.7rem";
        else
            navigationLinks.parentElement.style.top = "calc(0em - 2.7em - 100vh)";
    });
});

const loggedInLinks = document.querySelectorAll(".requireLogout");
const loggedOutLinks = document.querySelectorAll(".requireLogin");
const addLinksBasedOnLoggedUser = async () => {
    if(document.cookie.length === 0){
        loggedInLinks.forEach(link => link.style.display = "none");
        loggedOutLinks.forEach(link => link.style.display = "block");
    }else{
        loggedInLinks.forEach(link => link.style.display = "block");
        loggedOutLinks.forEach(link => link.style.display = "none");
    }
}

addLinksBasedOnLoggedUser();
// const createNavLink = (ref, text) => {
//     let clone = navigationLinks.firstChild;
//     clone = clone.nodeType === 3 ? clone.nextSibling.cloneNode(true) : clone.cloneNode(true);
//     clone.firstElementChild .href = ref;
//     clone.firstElementChild.textContent = text;
//     return clone;
// }

//
//  -1: not logged in
//   0: logged in
//   1: logged in and needs token
//

// [{ref: "/", text: "Home", needsToken: -1},
// {ref: "/browse", text:"Browse", needsToken: -1}].forEach(link => {navigationLinks.append(new NavLink(link.ref, link.text))})
// const navLinks = [
//
//     {ref: "/profile", text: "Profile", needsToken: 1},
//     {ref: "/groups", text: "Groups", needsToken: 1},
//     {ref: "/login", text: "Login", needsToken: 0},
//     {ref: "/logout", text: "Logout", needsToken: 1}
// ].map(link => {
//     let mapping = new NavLink(link.ref, link.text);
//     if(link.needsToken === 0){
//         navigationLinks.append(mapping);
//     }
//     return mapping;
// });

// const loginCases = navLinks.filter(link => link.needsToken !== 0);
//
// loginCases.filter(link => getCookie("token") && (link.needsToken > 0)).forEach(link => {
//     navigationLinks.append(link);
// });


// const buildNavigation = async (isLogged) => {
//     loggedInLinks.forEach(link => {
//         if(link.needsToken === -1 && !isLogged)
//             navigationLinks.appendChild(new NavLink(link.ref, link.text));
//         else if(link.needsToken === 0 && isLogged)
//             navigationLinks.appendChild(new NavLink(link.ref, link.text));
//         else if(link.needsToken === 1 && isLogged)
//             navigationLinks.appendChild(new NavLink(link.ref, link.text));
//         else if(link.needsToken === 1 && !isLogged)
//             navigationLinks.appendChild(new NavLink(link.ref, link.text));
//     });
// }

// loggedInLinks.find(link => link.firstChild.nodeType === 3 ? link.firstChild.nextSibling.href : link.firstChild.href === "/logout").addEventListener("click", () => {
//     document.cookie = "";
//     buildNavigation();
//     urlRoute("/login");
// });

// const notLoggedIn = createNavLink("/login", "Login");

// export const buildNavigation = async () => {
//     if(getCookie("token")){
//         navigationLinks.removeChild(child => navigationLinks.lastChild);
//         navigationLinks.forEach(link => navigationLinks.appendChild(link));
//     }else{
//         navigationLinks.forEach(child => navigationLinks.removeChild(navigationLinks.lastChild));
//         navigationLinks.appendChild(notLoggedIn);
//     }
// }
//
// buildNavigation();

// buildNagigation()