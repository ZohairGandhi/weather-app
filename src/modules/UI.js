import DataFormatter from './DataFormatter';

export default class UI {
  static renderWeatherData({
    address,
    currConditions,
    todayForecast,
    hourlyForecast,
    weeklyForecast,
  }) {
    const main = document.querySelector('main');
    main.append(
      this.createAddressCard(address),
      this.createCurrCondCard(currConditions),
      // this.createTodayCard(todayForecast),
      // this.createHourlyCard(hourlyForecast),
      // this.createWeeklyCard(weeklyForecast),
    );
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

  static createListItem(textContent) {
    const item = document.createElement('li');
    item.textContent = textContent;
    return item;
  }
}
