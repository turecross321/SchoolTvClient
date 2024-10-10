import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-date',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './date.component.html',
})
export class DateComponent {
  _date: Date = null!;
  @Input() set date(value: string) {
    this._date = new Date(value);
  }
}
