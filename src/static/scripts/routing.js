const siteName = document.title;

const ROUTES = new Map([
    ["404", {
        path: "/404",
        title: "404 - Not Found | " + siteName,
    }],
    ["/", {
        path: "/",
        title: "Home | " + siteName,
    }],
    ["/login", {
        path: "/login",
        title: "Login | " + siteName,
    }],
    ["/browse", {
        path: "/browse",
        title: "Browse | " + siteName,
    }],
    ["/register", {
        path: "/register",
        title: "Sign up | " + siteName,
    }],
    ["/forgot-password", {
        path: "/forgot-password",
        title: "Forgot Password | " + siteName,
    }],
    ["/profile", {
        path: "/profile",
        title: "Profile | " + siteName,
    }],
    ["/documentation", {
        path: "/documentation",
        title: "Documentation | " + siteName}]
]);

const routeAnchor = event => {
    event.preventDefault();
    urlRoute(event.target.href);
};

document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("a.link").forEach(link => {
        link.addEventListener("click", event => routeAnchor(event));
    });
});

const mainContent = document.querySelector("main");

export const urlRoute = (path) => {
    window.history.pushState(null, null, path);
    urlLocationHandler();
};

const urlLocationHandler = async () => {
    let location = window.location.pathname;
    location = location.length === 0 ? "/home" : location;

    const route = ROUTES.get(location) || ROUTES.get("404");

    // NOTE: for debugging purposes
    console.log(JSON.stringify(ROUTES.get(location)) + "  " + location + "  " + JSON.stringify(route));
    const response = await fetch("/static/documents/" + route.path + ".html");
    mainContent.innerHTML = await response.text();
    document.title = route.title;
    mainContent.querySelectorAll("a.link")?.forEach(link => {
        link.addEventListener("click", (event) => routeAnchor(event) )
    })
}

window.onpopstate = () => urlLocationHandler();
// urlLocationHandler();