import './style.css';
import WeatherData from './modules/WeatherData';
import UI from './modules/UI';

const form = document.querySelector('#search-bar');
const searchBar = document.querySelector('#search-bar input');

form.addEventListener('submit', () => {
  WeatherData.getWeatherJson(searchBar.value)
    .then((dataJson) => {
      UI.renderWeatherData({
        address: WeatherData.getAddress(dataJson),
        currConditions: WeatherData.getCurrentConditions(dataJson),
        todayForecast: WeatherData.getTodayForecast(dataJson),
        hourlyForecast: WeatherData.getTodayHourlyForecast(dataJson),
        weeklyForecast: WeatherData.getNextWeekForecast(dataJson),
      });
    })
    .catch(() => UI.renderErrorMsg());
});
