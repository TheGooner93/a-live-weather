export const getWeatherInfoUrl = (lat, lon, excludeArray) => {
    const excludeString = excludeArray.join(',');
    return `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=${excludeString}&appid=${process.env.VUE_APP_OPENWEATHER_API_KEY}`;
}