export function getFilmInfo(episod) {
    return fetch(`https://www.swapi.tech/api/films/${episod}`).then(resolve => resolve.json())
}

export function planetsInfo(property) {
    return fetch(`https://www.swapi.tech/api/${property}`).then(resolve => resolve.json())
}
