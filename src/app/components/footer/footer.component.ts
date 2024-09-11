import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faTemperature0} from "@fortawesome/free-solid-svg-icons";
import {TemperatureService} from "../../services/temperature.service";

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [
    DatePipe,
    FaIconComponent,
  ],
  templateUrl: './footer.component.html',
})
export class FooterComponent {
  time: Date = new Date();
  weatherIcon = faTemperature0;
  temperature: number = 0;

  constructor(public temp: TemperatureService) {
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    temp.temperature$.subscribe((temperature) => {
      this.temperature = temperature ?? 0;
    });
  }
}
