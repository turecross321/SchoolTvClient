import {Component} from '@angular/core';
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {SettingsService} from "../../services/settings.service";
import {faTemperature0} from "@fortawesome/free-solid-svg-icons";
import {ApiClientService} from "../../services/api-client.service";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {ThemeService} from "../../services/theme.service";

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
  protected readonly Math = Math;

  constructor(public api: ApiClientService, public settings: SettingsService, public theme: ThemeService) {
    setInterval(() => {
      this.time = new Date();
    }, 1000);

// Initial fetch when the service starts
    //this.api.getLatestTemperature().subscribe(temp => {
    //  this.temperature = temp.celsius;
    //});

// Set up the interval to fetch data every minute
    //setInterval(() => {
    //  this.api.getLatestTemperature().subscribe(temp => {
    //    this.temperature = temp.celsius;
    //  });
    //}, 60 * 1000); // every minute

  }
}
