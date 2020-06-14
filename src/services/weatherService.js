import axios from "axios";
import { getWeatherInfoUrl, getGeocodingUrl } from '../utility/url';

export const getWeather = (lat = '', lng = '', unitsSystem = '') => {
    const excludeArray = ['minutely', 'hourly'];
    const weatherUrl = getWeatherInfoUrl(lat, lng, excludeArray, unitsSystem);
    
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

export const getGeocodesForLocation = (locationString = '') => {
    const geocodeUrl = getGeocodingUrl(locationString);
    
    return new Promise((resolve, reject) => {
        try {
            const res = axios.get(geocodeUrl);
            resolve(res);
        }
        catch (err) {
            reject(err);
        }
    });
}