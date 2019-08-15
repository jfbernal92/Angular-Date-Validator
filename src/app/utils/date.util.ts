const DatePatterns = {
  DD: 'dd',
  MM: 'mm',
  YY: 'yy',
  YYYY: 'yyyy'
};

/**
 * Utility class to handle with dates and its different formats
 */
export class DateUtil {
  /**
   * Build a {@link Date} object from the given string.
   *
   * @param dateInString Date in string format
   * @param format Format that string date has
   * @param separator Separator used between its values
   */
  static buildDateFromString(dateInString: string, format: string, separator: string): Date | null {
    const patterns = format.split(separator);
    if (patterns.length !== 3 && (format.length !== (8 + separator.length * 3) || format.length !== (6 + separator.length * 3))) {
      throw new Error('The format used to validate the date is invalid. Be sure that year is "yy" or "yyyy", month is "mm" and ' +
        'day is "dd". The format is case insensitive.');
    }
    if (dateInString === null || undefined === typeof dateInString) {
      return null;
    }

    const values = dateInString.split(separator);
    if (values.length !== 3) {
      return null;
    }

    const inputDate = new Date();
    const dayValue = values[patterns.indexOf(DatePatterns.DD)];
    const monthValue = values[patterns.indexOf(DatePatterns.MM)];

    let yearValue;
    let yearPrefix: string;
    if (patterns.includes(DatePatterns.YY)) {
      yearPrefix = new Date().getFullYear()
        .toString().substr( 0, new Date().getFullYear().toString().length - DatePatterns.YY.length);
      yearValue = yearPrefix + values[patterns.indexOf(DatePatterns.YY)];
    } else {
      yearValue = values[patterns.indexOf(DatePatterns.YYYY)];
    }

    if (monthValue.length !== DatePatterns.MM.length || dayValue.length !== DatePatterns.DD.length
      || yearValue.length !== DatePatterns.YYYY.length) {
      return null;
    }

    inputDate.setFullYear(yearValue, Number(monthValue) - 1, Number(dayValue));
    return inputDate;
  }
}
