export default class DataFormatter {
  static formatWindDir(windDir) {
    if ((windDir >= 0 && windDir <= 22) || (windDir >= 338 && windDir <= 360)) {
      return 'N';
    } else if (windDir >= 23 && windDir <= 67) {
      return 'NE';
    } else if (windDir >= 68 && windDir <= 112) {
      return 'E';
    } else if (windDir >= 113 && windDir <= 157) {
      return 'SE';
    } else if (windDir >= 158 && windDir <= 202) {
      return 'S';
    } else if (windDir >= 203 && windDir <= 247) {
      return 'SW';
    } else if (windDir >= 248 && windDir <= 292) {
      return 'W';
    } else {
      return 'NW';
    }
  }
}
