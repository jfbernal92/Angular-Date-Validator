import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {DateValidator} from './validators/date.validator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'validator-test';
  form: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      dateDefault: new FormControl('', DateValidator.notHighThanToday()),
      dateWithCustomSeparator: new FormControl('', DateValidator.notHighThanToday('mm,-.yyyy,-.dd', ',-.')),
      dateFrom: new FormControl(''),
      dateTo: new FormControl('')
    }, DateValidator.dateNotGraterThan('dateFrom', 'dateTo', 'mm-dd-yyyy', '-'));
  }
}
