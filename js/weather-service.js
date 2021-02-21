import requestService from './request-service.js';
import API_KEY from './openweathermap-api-key.js';

class WeatherService {
    constructor(requestService) {
        this.requestService = requestService;

        this.baseUrl = 'https://api.openweathermap.org/data/2.5';
    }

    getCurrentWeather(cityName) {
        return this.requestService.get(`${this.baseUrl}/weather?q=${cityName}&appid=${API_KEY}&units=metric`);
    }

    getForecast(cityName) {
        return this.requestService.get(`${this.baseUrl}/forecast/daily?q=${cityName}&appid=${API_KEY}&units=metric&cnt=7`);
    }
}

const weatherService = new WeatherService(requestService);

export default weatherService;