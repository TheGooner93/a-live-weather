import axios from "axios";
import { getWeatherInfoUrl } from '../utility/url';

export const getWeather = (lat = '', lng = '') => {
    const excludeArray = ['minutely', 'hourly'];
    const weatherUrl = getWeatherInfoUrl(lat, lng, excludeArray);
    
    return new Promise((resolve, reject) => {
        try {
            const res = axios.get(weatherUrl);
            resolve(res);
        }
        catch (err) {
            reject(err);
        }
    });
}