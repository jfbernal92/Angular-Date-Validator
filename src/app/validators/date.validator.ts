import {AbstractControl, FormControl, ValidationErrors, ValidatorFn} from '@angular/forms';
import {DateUtil} from '../utils/date.util';

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
      const dateValue = DateUtil.buildDateFromString(control.value, format, separator);
      if (dateValue === null) {
        return invalidDateFormat;
      }
      return dateValue.getTime() > new Date().getTime() ? validationError :  null;
    };
  }

  /**
   * Compares two dates to validate that the first one is minor than the second one.
   * The error name will be 'minorDateControlName-dateNotGraterThan'.
   *
   * @param minorDateControlName - Name of the minor date form control
   * @param majorDateControlName - Name of the major date form control
   * @param format - Format of the date. Default: dd/mm/yy
   * @param separator - Default: /
   */
  static dateNotGraterThan(minorDateControlName: string, majorDateControlName: string, format = 'dd/mm/yy', separator = '/'): ValidatorFn {
    const validatorError: ValidationErrors = {[`${minorDateControlName}-dateNotGraterThan`]: true};
    const invalidDateFormat: ValidationErrors =  {['invalidDateFormat']: true};
    return (control: AbstractControl): ValidationErrors | null => {
      const minorDateValue: Date = DateUtil.buildDateFromString(control.get(minorDateControlName).value, format, separator);
      const majorDateValue: Date = DateUtil.buildDateFromString(control.get(majorDateControlName).value, format, separator);
      if (minorDateValue === null || majorDateValue === null) {
        return invalidDateFormat;
      }
      return  minorDateValue.getTime() > majorDateValue.getTime() ? validatorError : null;
    };
  }
}
