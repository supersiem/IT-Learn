# Custom router

de router die we gebruiken is custom gemaakt voor dit project dus er is geen info over te vinden online. Als je er niet uitkomt kan je mij en dm op discord sturen @siemvk of me een mailtje sturen via siem@siemvk.nl of als je denkt dat je er zelf uit kan komen kan je de code bekijken in `router.js` in de root van het project.

## Hoe werkt het?

de router werkt door alle links op de pagina over te nemen en de standaard actie te voorkomen. Vervolgens wordt het pad van de link opgehaald en wordt de pagina geladen in `<app>` hierna wordt de URL aangepast met `history.pushState` zodat de URL in de adresbalk klopt met de geladen pagina. als laatste wordt js en css bestanden geladen die bij de pagina horen en js bestanden worden als ze inbeded zijn uitgevoert.
**btw je css wordt automatisch geladen als het de zelfde naam heeft als de html pagina.**

## Wat als ik een nieuwe pagina toevoeg?

je kan gewoon de pagina toevoegen in de `pages` map.

## Hoe moet is rederects in js doen?

```javascript
window.navigateTo('/pad/naar/pagina');
```

## ik voeg links toe met javascript hoe zorg ik dat de router die ook pakt?

```javascript
window.updateLinks();
```

## hoe doe ik een rederect?

In router.js staat een variabele genaamd `routerRules` hierin kan je rederects toevoegen zoals hieronder:

```javascript
const routerRules = [
    {
        type: 'redirect',
        from: 'verify-success.html',
        to: 'home.html'
    }
];
```

## Ik heb een vraag over de router!

ik heb je al verteld wat je dan moet doen lees beter.
