import {FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';

const DatePatterns = {
  DD: 'dd',
  MM: 'mm',
  YY: 'yy',
  YYYY: 'yyyy'
};

export class DateValidator {

  /**
   * Validates that the date written in an form control is not high than today. If date is not in the format specified, the error will be
   * 'invalidDateFormat'. If date does not pass the validation the error will be 'dateHighThanToday'.
   *
   * @param format - Format of the date. Default: dd/mm/yy
   * @param separator - Default: /
   */
  static notHighThanToday(format = 'dd/mm/yy', separator = '/'): ValidatorFn {
    const validationError: ValidationErrors =  {['dateHighThanToday']: true};
    const invalidDateFormat: ValidationErrors =  {['invalidDateFormat']: true};

    return (control: FormControl): ValidationErrors | null => {
      const patterns = format.split(separator);
      if (patterns.length !== 3 && (format.length !== (8 + separator.length * 3) || format.length !== (6 + separator.length * 3))) {
        throw new Error('The format used to validate the date is invalid. Be sure that year is "yy" or "yyyy", month is "mm" and ' +
          'day is "dd". The format is case insensitive.');
      }
      const values = control.value.split(separator);

      if (values.length !== 3) {
        return invalidDateFormat;
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
        return invalidDateFormat;
      }

      inputDate.setFullYear(yearValue, monthValue - 1, dayValue);

      return inputDate.getTime() > new Date().getTime() ? validationError :  null;
    };
  }
}
