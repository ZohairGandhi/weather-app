import DataFormatter from './DataFormatter';
import { format } from 'date-fns';

export default class UI {
  static renderWeatherData({
    address,
    currConditions,
    todayForecast,
    hourlyForecast,
    weeklyForecast,
  }) {
    const main = document.querySelector('main');
    main.innerHTML = '';
    main.append(
      this.createAddressCard(address),
      this.createCurrCondCard(currConditions),
      this.createTodayCard(todayForecast),
      this.createHourlyCard(hourlyForecast),
      this.createWeeklyCard(weeklyForecast),
    );
  }

  static renderErrorMsg() {
    const main = document.querySelector('main');
    main.innerHTML = '';
    const errorMsg = this.createHeading(
      'h2',
      'Could not fetch the weather data. Check the spelling of the location.',
    );
    errorMsg.id = 'error-msg';
    main.appendChild(errorMsg);
  }

  static createAddressCard(address) {
    const section = this.createSection({ idName: 'address-card' });
    const heading = this.createHeading('h2', address);
    section.append(heading);
    return section;
  }

  static createCurrCondCard(currConditions) {
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
    } = currConditions;

    const section = this.createSection({ idName: 'curr-cond-card' });
    const heading = this.createHeading('h2', 'Current Conditions');
    const subHeading = this.createHeading('h3', conditions);

    const currCondDiv = this.createDiv('curr-cond-sec');
    const currTempDiv = this.createDiv('curr-temp-sec');
    const img = this.createImage(icon);
    const tempPairDiv = this.createDiv('temp-pair');
    const currTemp = this.createParagraph(`${temp} &deg;C`);
    const feelsLike = this.createParagraph(`Feels like ${feelslike} &deg;C`);

    const condList = this.createList({ idName: 'cond-sec' });
    const precipItem = this.createListItem(
      `${precipprob}% chance of ${precip}mm rain`,
    );
    const windItem = this.createListItem(
      `${DataFormatter.formatWindDir(winddir)} ${windspeed} km/h wind`,
    );
    const gustItem = this.createListItem(`${windgust} km/h gust`);
    const humidityItem = this.createListItem(`${humidity}% humidity`);

    tempPairDiv.append(currTemp, feelsLike);
    currTempDiv.append(img, tempPairDiv);
    condList.append(precipItem, windItem, gustItem, humidityItem);
    currCondDiv.append(currTempDiv, condList);
    section.append(heading, subHeading, currCondDiv);

    return section;
  }

  static createTodayCard(todayForecast) {
    const {
      description,
      tempmax,
      tempmin,
      precip,
      precipprob,
      sunrise,
      sunset,
      uvindex,
    } = todayForecast;

    const section = this.createSection({ idName: 'today-card' });
    const heading = this.createHeading('h2', "Today's Weather");
    const subHeading = this.createHeading('h3', description);

    const condList = this.createList({ idName: 'today-cond' });
    const maxTempItem = this.createListItem(`Max Temp ${tempmax} &deg;C`);
    const minTempItem = this.createListItem(`Min Temp ${tempmin} &deg;C`);
    const precipItem = this.createListItem(
      `${precipprob}% chance of ${precip}mm rain`,
    );
    const sunriseItem = this.createListItem(
      `Sunrise ${DataFormatter.formatTime(sunrise)}`,
    );
    const sunsetItem = this.createListItem(
      `Sunset ${DataFormatter.formatTime(sunset)}`,
    );
    const uvItem = this.createListItem(`UV Index ${uvindex}`);

    condList.append(
      maxTempItem,
      minTempItem,
      precipItem,
      sunriseItem,
      sunsetItem,
      uvItem,
    );
    section.append(heading, subHeading, condList);
    return section;
  }

  static createHourlyCard(hourlyForecast) {
    const section = this.createSection({ idName: 'hourly-card' });
    const heading = this.createHeading('h2', 'Hourly Forecast');
    const carouselDiv = this.createDiv('hourly-carousel');

    hourlyForecast.forEach((hour) => {
      const { datetime, icon, temp, precipprob } = hour;

      const hourCard = this.createList({ className: 'hour-card' });
      const timeItem = this.createListItem(DataFormatter.formatTime(datetime));
      const iconItem = this.createListItem();
      const iconImg = this.createImage(icon);
      iconItem.appendChild(iconImg);
      const tempItem = this.createListItem(`${temp} &deg;C`);
      const precipItem = this.createListItem();
      const precipImg = this.createImage('water');
      const precipProbPara = this.createParagraph(`${precipprob}%`);
      precipItem.append(precipImg, precipProbPara);

      hourCard.append(timeItem, iconItem, tempItem, precipItem);
      carouselDiv.appendChild(hourCard);
    });

    section.append(heading, carouselDiv);
    return section;
  }

  static createWeeklyCard(weeklyForecast) {
    const section = this.createSection({ idName: 'weekly-card' });
    const heading = this.createHeading('h2', 'Next Week Forecast');
    const tableDiv = this.createDiv('table-container');
    const weekTable = this.createTable('weekly-data');
    const headRow = document.createElement('tr');

    [
      'Date',
      'Conditions',
      'Min Temp (&deg;C)',
      'Max Temp (&deg;C)',
      'Chance of rain',
    ].forEach((item) => {
      const data = this.createTableData({
        cellType: 'th',
        textContent: item,
      });
      headRow.appendChild(data);
    });

    weekTable.appendChild(headRow);

    weeklyForecast.forEach((day) => {
      const { datetime, conditions, icon, tempmin, tempmax, precipprob } = day;

      const row = document.createElement('tr');
      const date = this.createTableData({
        textContent: `${format(new Date(datetime), 'MMM dd')}`,
      });
      const cond = this.createTableData({ textContent: '' });
      const iconImg = this.createImage(icon);
      const condPara = this.createParagraph(conditions);
      cond.append(iconImg, condPara);
      const minTemp = this.createTableData({ textContent: tempmin });
      const maxTemp = this.createTableData({ textContent: tempmax });
      const precipProb = this.createTableData({
        textContent: `${precipprob}%`,
      });

      row.append(date, cond, minTemp, maxTemp, precipProb);
      weekTable.appendChild(row);
    });

    tableDiv.appendChild(weekTable);
    section.append(heading, tableDiv);
    return section;
  }

  static createSection({ className = 'card', idName }) {
    const section = document.createElement('section');
    section.className = className;
    section.id = idName;
    return section;
  }

  static createHeading(headingType, headingContent) {
    const heading = document.createElement(headingType);
    heading.textContent = headingContent;
    return heading;
  }

  static createDiv(idName) {
    const div = document.createElement('div');
    div.id = idName;
    return div;
  }

  static createImage(icon) {
    const image = document.createElement('img');

    import(`../icons/${icon}.svg`).then((module) => {
      image.src = module.default;
    });

    return image;
  }

  static createParagraph(textContent) {
    const para = document.createElement('p');
    para.innerHTML = textContent;
    return para;
  }

  static createList({ className = '', idName }) {
    const list = document.createElement('ul');
    list.className = className;
    list.id = idName;
    return list;
  }

  static createListItem(textContent = '') {
    const item = document.createElement('li');
    item.innerHTML = textContent;
    return item;
  }

  static createTable(idName) {
    const table = document.createElement('table');
    table.id = idName;
    return table;
  }

  static createTableData({ cellType = 'td', textContent = '' }) {
    const data = document.createElement(cellType);
    data.innerHTML = textContent;
    return data;
  }
}
