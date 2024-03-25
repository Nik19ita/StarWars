export function render(data, planetsInfo) {

    // функция получения данных с сервера

    function getInfo(propertyName) {
        let propertyArray
        switch (propertyName) {
            case 'planets':
                propertyArray = data.properties.planets
                break;
            case 'species':
                propertyArray = data.properties.species
                break;
        }

        const lastTwoSegmentPath = -2 
        return Promise.all(
            propertyArray.map(src => planetsInfo(src.split('/').slice(lastTwoSegmentPath).join('/'))))
            .then(resolve => {
                return resolve.map(item => item.result.properties.name)
            })
    }

    // функция поиска номера эпизода

    function findEpisodID() {
        let episodNumber
        switch (data.properties.episode_id) {
            case 1:
                return episodNumber = 'I'
            case 2:
                return episodNumber = 'II'
            case 3:
                return episodNumber = 'III'
            case 4:
                return episodNumber = 'IV'
            case 5:
                return episodNumber = 'V'
            case 6:
                return episodNumber = 'VI'
        }
    }

    // функция цвета текста

    function colorText() {
        switch (data.properties.episode_id) {
            case 1:
                return 'episod-1'
            case 2:
                return 'episod-2'
            case 3:
                return 'episod-3'
            case 4:
                return 'episod-4'
            case 5:
                return 'episod-5'
            case 6:
                return 'episod-6'
        }
    }

    // рендеринг станицы
    const container = document.querySelector('.container')
    Promise.all([
        getInfo('planets'),
        getInfo('species')
    ]).then(([planets, species]) => {
        container.innerHTML = `
            <img class="episod-img" src="img/episod-${data.properties.episode_id}-vertical.webp">
            <h1 class="episod-name ${colorText()}">Episode ${findEpisodID()}: ${data.properties.title} </h1>
            <p class="episod-descr">${data.properties.opening_crawl}</p>
            <h2 class=${colorText()}>Planets:</h2>
            <p>${planets.join(', ')}</p>
            <h2 class=${colorText()}>Species:</h2>
            <p>${species.join(', ')}</p>
            <a href="index.html" class="on-index ${colorText()}" target="_self">
            На главную
            </a>
            `
    })
    
}












