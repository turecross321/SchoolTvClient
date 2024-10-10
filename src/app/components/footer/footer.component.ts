import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faTemperature0} from "@fortawesome/free-solid-svg-icons";
import {interval, switchMap} from "rxjs";
import {ApiClientService} from "../../services/api-client.service";

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

  constructor(private api: ApiClientService) {
    setInterval(() => {
      this.time = new Date();
    }, 1000);

    interval(60 * 1000) // every minute
      .pipe(
        switchMap(() => this.api.getLatestTemperature())
      )
      .subscribe(temp => {
        this.temperature = temp.celsius;
      });

    // Initial fetch when the service starts
    this.api.getLatestTemperature().subscribe(temp => {
      this.temperature = temp.celsius;
    });
  }
}
