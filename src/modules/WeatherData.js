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
    const {
      temp,
      feelslike,
      conditions,
      icon,
      precip,
      precipprob,
      winddir,
      windspeed,
      windgust,
      humidity,
    } = weatherData.currentConditions;

    return {
      temp,
      feelslike,
      conditions,
      icon,
      precip,
      precipprob,
      winddir,
      windspeed,
      windgust,
      humidity,
    };
  }

  static getTodayForecast(weatherData) {
    const {
      description,
      tempmax,
      tempmin,
      precip,
      precipprob,
      sunrise,
      sunset,
      uvindex,
    } = weatherData.days[0];

    return {
      description,
      tempmax,
      tempmin,
      precip,
      precipprob,
      sunrise,
      sunset,
      uvindex,
    };
  }

  static getTodayHourlyForecast(weatherData) {
    const hourlyForecast = [];
    const hourlyData = weatherData.days[0].hours;
    const currTimeEpoch = Date.now() / 1000;

    hourlyData.forEach((hour) => {
      if (currTimeEpoch < hour.datetimeEpoch) {
        const { datetime, icon, temp, precipprob } = hour;

        hourlyForecast.push({ datetime, icon, temp, precipprob });
      }
    });

    return hourlyForecast;
  }

  static getNextWeekForecast(weatherData) {
    const nextWeekForecast = [];
    const futureData = weatherData.days.slice(1, 8);

    futureData.forEach((day) => {
      const { datetime, conditions, icon, tempmin, tempmax, precipprob } = day;

      nextWeekForecast.push({
        datetime,
        conditions,
        icon,
        tempmin,
        tempmax,
        precipprob,
      });
    });

    return nextWeekForecast;
  }
}
