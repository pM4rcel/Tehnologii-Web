const siteName = document.title;

const ROUTES = new Map([
    ['404', {
        path: '/404',
        title: '404 - Not Found | ' + siteName,
    }],
    ['/', {
        path: '/',
        title: 'Home | ' + siteName,
    }],
    ['/login', {
        path: '/login',
        title: 'Login | ' + siteName,
    }],
    ['/browse', {
        path: '/browse',
        title: 'Browse | ' + siteName,
    }],
    ['/register', {
        path: '/register',
        title: 'Sign up | ' + siteName,
    }]
]);

const routeAnchor = event => {
    event.preventDefault();
    urlRoute(event);
};

document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('a.link').forEach(link => {
        link.addEventListener('click', event => routeAnchor(event));
    });
});

const mainContent = document.querySelector('main');

const urlRoute = (event) => {
    window.history.pushState(null, null, event.target.href);
    urlLocationHandler();
};

const urlLocationHandler = async () => {
    let location = window.location.pathname;
    location = location.length === 0 ? '/' : location;

    const route = ROUTES.get(location) || ROUTES.get('404');

    // NOTE: for debugging purposes
    console.log(JSON.stringify(ROUTES.get(location)) + "  " + location + "  " + JSON.stringify(route));
    const response = await fetch('/static/documents/' + route.path + '.html');
    mainContent.innerHTML = await response.text();
    document.title = route.title;
    mainContent.querySelectorAll('a.link')?.forEach(link => {
        link.addEventListener('click', (event) => routeAnchor(event) )
    })
}

window.onpopstate = () => urlLocationHandler();
urlLocationHandler();