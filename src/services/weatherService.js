import axios from "axios";
import { getWeatherInfoUrl, getGeocodingUrl, getLocationInfoUrl } from '../utility/url';

const getWeather = (lat = '', lng = '', unitsSystem = '') => {
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

const getLocationInfo = (lat = '', lng = '') => {
    const locationInfoUrl = getLocationInfoUrl(lat,lng);
    
    return new Promise((resolve, reject) => {
        try {
            const res = axios.get(locationInfoUrl);
            resolve(res);
        }
        catch (err) {
            reject(err);
        }
    });
}

export const getWeatherAndLocationDetails = async (lat = '', lng = '', unitsSystem = '') => {
    const weatherPromise = getWeather(lat, lng, unitsSystem);
    const locationPromise = getLocationInfo(lat, lng);

    return Promise.all([weatherPromise, locationPromise]);
}