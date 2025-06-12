export default class DataFormatter {
  static formatWindDir(windDir) {
    if ((windDir >= 0 && windDir <= 22) || (windDir >= 338 && windDir <= 360)) {
      return 'N';
    }
    if (windDir >= 23 && windDir <= 67) {
      return 'NE';
    }
    if (windDir >= 68 && windDir <= 112) {
      return 'E';
    }
    if (windDir >= 113 && windDir <= 157) {
      return 'SE';
    }
    if (windDir >= 158 && windDir <= 202) {
      return 'S';
    }
    if (windDir >= 203 && windDir <= 247) {
      return 'SW';
    }
    if (windDir >= 248 && windDir <= 292) {
      return 'W';
    }
    return 'NW';
  }

  static formatTime(time) {
    return time.slice(0, 5);
  }
}
