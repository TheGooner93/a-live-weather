export const getWeatherInfoUrl = (lat, lon, excludeArray, unitsSystem) => {
    const excludeString = excludeArray.join(',');
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${excludeString}&units=${unitsSystem}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}`;
}

export const getGeocodingUrl = (locationString) => {
    return `https://us1.locationiq.com/v1/search.php?key=${process.env.VUE_APP_LOCATIONIQ_API_KEY}&q=${locationString}&format=json`;
}