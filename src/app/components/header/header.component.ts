import {Component} from '@angular/core';
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {SettingsService} from "../../services/settings.service";
import {faTemperature0} from "@fortawesome/free-solid-svg-icons";
import {ApiClientService} from "../../services/api-client.service";
import {interval, switchMap} from "rxjs";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage,
    FaIconComponent,
    DatePipe
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  time: Date = new Date();
  weatherIcon = faTemperature0;
  temperature: number = 0;

  constructor(private api: ApiClientService, public brandingService: SettingsService) {
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
