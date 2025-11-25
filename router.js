// dit is de router voor de applicatie
// we vervangen alle <a> links met js router navigatie
// verander hier niet te veel aan

// de globale route variabele
window.currentRoute = '/';

// script injectior
async function injectJS(code, id = undefined) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.textContent = code;
    script.id = id;
    document.head.appendChild(script);
}

// we voeren deze code uit bij elke page navigatie
function updateLinks() {
    document.querySelectorAll('a').forEach(link => {
        if (link.getAttribute('routed') === 'true') return; // al aangepast

        const href = link.getAttribute('href');
        if (!href || href.startsWith('http') || href.startsWith('mailto:') || href.startsWith('#')) {
            // dit zijn grappige links of externe links, die negeren we
            link.setAttribute('routed', 'true');
            return;
        }
        link.addEventListener('click', (e) => {
            e.preventDefault();
            navigateTo(href);
        });
        link.setAttribute('routed', 'true');
    });

    // oja we moeten ook de title updaten
    document.title = document.querySelector('main').querySelector('h1')?.innerText || 'IT Learn'

    document.querySelectorAll('script').forEach(async script => {
        if (script.getAttribute('routed') === 'true') return; // al geïnjecteerd

        if (script.src) {
            injectJS(await fetch(script.src).then(res => res.text()), 'PageScript');
        } else {
            injectJS(script.textContent, 'PageScript');
        }
        script.setAttribute('routed', 'true');
    });

}

// dit is de navigatie zelf
async function navigateTo(route) {
    // nuke de oude scripts
    document.querySelectorAll('script[id="PageScript"]').forEach(script => script.remove());

    // zet de link in de globale variabele en in de url balk (hashbased)
    window.currentRoute = route;
    let url = new URL(window.location.href);
    url.searchParams.set('route', route);
    window.history.pushState({}, '', url);

    // haal de nieuwe content op
    const newContent = await fetch(route).then(res => res.text());

    // vervang de main content
    document.querySelector('main').innerHTML = newContent;

    // update de links opnieuw
    updateLinks();

    // stuur een event dat we van pagina veranderd zijn
    window.dispatchEvent(new Event('page-changed'));
}

// we doen een setup bij het laden van de pagina
window.addEventListener('load', async () => {
    // check de url voor een route parameter
    let url = new URL(window.location.href);
    let route = url.searchParams.get('route') || '/home.html';

    document.querySelectorAll('script').forEach(script => {
        script.setAttribute('routed', 'true');
    });

    await navigateTo(route);
});

// maak de window variabele beschikbaar
window.updateLinks = updateLinks;
window.navigateTo = navigateTo;