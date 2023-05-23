
const WEATHER_API_URL = 'https://weather.tsukumijima.net/api/forecast/city/';

/**
    fncFetchForecast("400040", function update(obj) {
        const weather = {
            "weather": obj.forecasts[0].detail.weather,
            "image": obj.forecasts[0].image.url,
            "temperature": {
                "min": obj.forecasts[0].temperature.min.celsius,
                "max": obj.forecasts[0].temperature.max.celsius
            },
        };
        console.log(weather);
    });
 * @param {*} city 
 * @param {*} fncSuccess 
 * @param {*} fncError 
 * @returns 
 */
function fncFetchForecast(city, idForecast, fncSuccess, fncError) {
    //GET電文を作成
    var url = WEATHER_API_URL + city;
    // 要求をサーバーに送信する
    return fetch(url, {method: 'GET'})
        .then(response => response.json())
        .then(obj => {
            let result = {
                "title": obj.error ? "" : obj.title,
                "weather": obj.error ? "" : obj.forecasts[0].detail.weather,
                "image": obj.error ? "" : obj.forecasts[0].image.url,
                "temperature": {
                    "min": obj.error ? null : obj.forecasts[0].temperature.min.celsius,
                    "max": obj.error ? null : obj.forecasts[0].temperature.max.celsius
                },
                "chanceOfRain": "--%"
            };
            if (obj.error === undefined) {
                for (i in obj.forecasts) {
                    const chanceOfRains = Object.values(obj.forecasts[i].chanceOfRain);
                    for (cor in chanceOfRains) {
                        if (result.chanceOfRain ==="--%" && chanceOfRains[cor] !== "--%") {
                            result.chanceOfRain = chanceOfRains[cor];
                            break;
                        }
                    }
                    if (result.temperature.min === null && result.temperature.max === null) {
                        result.temperature.min = obj.forecasts[i].temperature.min.celsius;
                        result.temperature.max = obj.forecasts[i].temperature.max.celsius;
                    }
                }
            }
            
            fncSuccess(idForecast, result);
        })
        .catch(error => {
            console.error('Except:', url, error);
            if (fncError) fncError(error);
        });
}