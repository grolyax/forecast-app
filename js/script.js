/* 
async function getData() {

    const response = await fetch(
        'https://api.openweathermap.org/data/2.5/weather?q=Hrodna&appid=21dd05c287865c7697cac5cb20b51fcf',
        {
            metod: 'GET'
        }
    );
    return await response.json();
}

getData().then((data) => {
    console.log(data);
}); 
*/

import citiesService from './cities-service.js';
import weatherService from './weather-service.js';

const form = document.getElementById('search');
const container = document.querySelector('.container');
const searchInput = document.querySelector('#search input');

form.addEventListener('submit', async (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const cityName = formData.get('city-name');

    const data = await weatherService.getForecast(cityName);

   const currentWeather = await weatherService.getCurrentWeather(cityName);

    const div = document.createElement('div');
    div.innerHTML = `<span>Current temp: ${currentWeather.main.temp}<span>`;

    const ul = document.createElement('ul');

    const listItems = data.list.map((day) => {
       const date = new Date(day.dt * 1000);
       return `<li>Day: ${date.toLocaleDateString()} Temp: ${day.temp.day}</li>`;
   });

   ul.innerHTML = listItems.join('');

   container.appendChild(ul);
   container.appendChild(div);
});
 //теперь сделаем подсказку по поиску города
searchInput.addEventListener('input', async (event) => {
    const {value} = event.target;

    const cities = await citiesService.getCities();

    const match = cities.filter((city) => {
        if (city.name.toUpperCase().includes(value.toUpperCase())) {
            return true;
        }

        return false;
    });

    console.log(match);
});