import {Component, Input} from '@angular/core';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-date-moment',
  standalone: true,
  imports: [
    DatePipe
  ],
  templateUrl: './date-moment.component.html',
})
export class DateMomentComponent {
  @Input() type: DateMomentType = DateMomentType.Time;
  protected readonly DateMomentType = DateMomentType;

  _date: Date = null!;

  @Input() set date(value: string) {
    this._date = new Date(value);
  }

  time(date: Date): string {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');

    return `${hours}:${minutes}`;
  }

  minutesRemainingText(date: Date): string {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const minutes = Math.round(diff / 1000 / 60);

    if (minutes < 1) {
      return "< 1 min";
    }

    return minutes.toLocaleString() + " min";
  }
}

export enum DateMomentType {
  Time = 0,
  MinutesRemaining = 1
}
