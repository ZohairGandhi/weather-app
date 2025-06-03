/* eslint-disable prefer-destructuring */
export default class WeatherData {
  static async getWeatherJson(location) {
    const url = `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${location}?unitGroup=metric&key=H2SF9EA89GNLWLTLCVVXDJRQ7&contentType=json`;

    const response = await fetch(url, { mode: 'cors' });

    if (!response.ok) {
      throw new Error(
        'Could not fetch the weather data. Check the spelling of the location.',
      );
    }

    const dataJson = await response.json();

    return dataJson;
  }

  static getAddress(weatherData) {
    return weatherData.resolvedAddress;
  }

  static getCurrentConditions(weatherData) {
    const currConditions = weatherData.currentConditions;

    const temp = currConditions.temp;
    const feelsLike = currConditions.feelslike;
    const conditions = currConditions.conditions;
    const icon = currConditions.icon;
    const precip = currConditions.precip;
    const precipProb = currConditions.precipprob;
    const windDir = currConditions.winddir;
    const windSpeed = currConditions.windspeed;
    const windGust = currConditions.windgust;
    const humidity = currConditions.humidity;

    return {
      temp,
      feelsLike,
      conditions,
      icon,
      precip,
      precipProb,
      windDir,
      windSpeed,
      windGust,
      humidity,
    };
  }

  static getTodayForecast(weatherData) {
    const todayData = weatherData.days[0];

    const desc = todayData.description;
    const tempMax = todayData.tempmax;
    const tempMin = todayData.tempmin;
    const precip = todayData.precip;
    const precipProb = todayData.precipprob;
    const sunrise = todayData.sunrise;
    const sunset = todayData.sunset;
    const uvIndex = todayData.uvindex;

    return {
      desc,
      tempMax,
      tempMin,
      precip,
      precipProb,
      sunrise,
      sunset,
      uvIndex,
    };
  }

  static getTodayHourlyForecast(weatherData) {
    const hourlyForecast = [];
    const hourlyData = weatherData.days[0].hours;
    const currTimeEpoch = Date.now() / 1000;

    hourlyData.forEach((hour) => {
      if (currTimeEpoch < hour.datetimeEpoch) {
        const dateTime = hour.datetime;
        const icon = hour.icon;
        const temp = hour.temp;
        const feelsLike = hour.feelslike;
        const precip = hour.precip;

        hourlyForecast.push({ dateTime, icon, temp, feelsLike, precip });
      }
    });

    return hourlyForecast;
  }

  static getNextWeekForecast(weatherData) {
    const nextWeekForecast = [];
    const futureData = weatherData.days.slice(1, 8);

    futureData.forEach((day) => {
      const dateTime = day.datetime;
      const conditions = day.conditions;
      const icon = day.icon;
      const tempMin = day.tempmin;
      const tempMax = day.tempmax;
      const precip = day.precip;
      const precipProb = day.precipprob;

      nextWeekForecast.push({
        dateTime,
        conditions,
        icon,
        tempMin,
        tempMax,
        precip,
        precipProb,
      });
    });

    return nextWeekForecast;
  }
}
