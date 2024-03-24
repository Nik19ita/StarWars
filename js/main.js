const cssPromise = {}


function loadResourse(src) {
    // Загрузка js
    if (src.endsWith('.js')) {
        return import(src)
    }

    if (src.endsWith('.css')) {
        if (!cssPromise[src]) {
            const link = document.createElement('link')
            link.rel = 'stylesheet'
            link.href = src
            cssPromise[src] = new Promise(resolve => {
                link.addEventListener('load', () => resolve())
            })
            document.head.append(link)
        }
        return cssPromise[src]
    }
}

const searchParams = new URLSearchParams(location.search)

let filmNomber
switch (searchParams.get('episod')) {
    case '1':
        filmNomber = 4
        break;
    case '2':
        filmNomber = 5
        break;
    case '3':
        filmNomber = 6
        break;
    case '4':
        filmNomber = 1
        break;
    case '5':
        filmNomber = 2
        break;
    case '6':
        filmNomber = 3
        break;
}


Promise.all([
    './create-pages.js',
    './fetch.js',
    'css/style-episode.css',
].map(src => loadResourse(src))).then(([pageModule, dataModule]) => {
    dataModule.getFilmInfo(filmNomber).then(data => pageModule.render(data.result, dataModule.planetsInfo))
})






