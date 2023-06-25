export class ProfileBook extends HTMLElement {
    constructor() {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        const toBeCreated = document.getElementById("profile-book").content.cloneNode(true);
        toBeCreated.attachShadow({ mode: "open" });

        toBeCreated.querySelector("a.link").setAttribute("href", this.getAttribute("href"));
        const image = toBeCreated.querySelector("img");
        image.setAttribute("src", this.getAttribute("src"));
        image.setAttribute("alt", this.getAttribute("alt"))

        shadowRoot.append(toBeCreated);
    }
}



export class NavLink extends HTMLElement {
    constructor(ref, text) {
        super();
        const shadowRoot = this.attachShadow({ mode: "open" });
        const toBeCreated= document.getElementById("nav-link").content.cloneNode(true);
        const anchor= toBeCreated.querySelector("a.link");
        anchor.setAttribute("href", ref);
        toBeCreated.setAttribute("style", )
        anchor.innerHTML = text;
        shadowRoot.append(toBeCreated);
    }
}


customElements.define("profile-book", ProfileBook);
customElements.define("nav-link", NavLink);
