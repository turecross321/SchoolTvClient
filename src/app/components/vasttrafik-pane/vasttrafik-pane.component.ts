import {Component} from '@angular/core';
import {PaneComponent} from "../pane/pane.component";
import {faTrafficLight} from "@fortawesome/free-solid-svg-icons";
import {NgClass, NgForOf} from "@angular/common";
import {ApiClientService} from "../../services/api-client.service";
import {interval, switchMap} from "rxjs";
import {DateComponent} from "../date/date.component";
import {DateMomentComponent, DateMomentType} from "../date-moment/date-moment.component";
import {VasttrafikStopAreaResponse} from "../../types/vasttrafik/vasttrafik-stop-area.response";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {VasttrafikDepartureComponent} from "../vasttrafik-departure/vasttrafik-departure.component";
import {DividerComponent} from "../divider/divider.component";

@Component({
  selector: 'app-vasttrafik-pane',
  standalone: true,
  imports: [
    PaneComponent,
    NgForOf,
    DateComponent,
    DateMomentComponent,
    FaIconComponent,
    NgClass,
    VasttrafikDepartureComponent,
    DividerComponent
  ],
  templateUrl: './vasttrafik-pane.component.html'
})
export class VasttrafikPaneComponent {
  stopAreas: VasttrafikStopAreaResponse[] = [];
  protected readonly faTrafficLight = faTrafficLight;
  protected readonly DateMomentType = DateMomentType;
  protected readonly Math = Math;

  constructor(public api: ApiClientService) {
    interval(1000 * 60) // 1 minute
      .pipe(
        switchMap(() => this.api.getVasttrafikDepartures())
      )
      .subscribe(departures => {
        this.setDepartures(departures);
      });

    // Initial fetch when the service starts
    this.api.getVasttrafikDepartures().subscribe(departures => {
      this.setDepartures(departures);
    });
  }

  setDepartures(response: VasttrafikStopAreaResponse[]) {
    this.stopAreas = response.map(stop => {
      const seenLines = new Set<string>();
      const filteredDepartures = stop.departures.filter(departure => {
        const uniqueKey = `${departure.lineName}-${departure.platform}`;
        if (!seenLines.has(uniqueKey)) {
          seenLines.add(uniqueKey);
          return true;
        }
        return false;
      }).slice(0, 6);
      return {
        ...stop,
        departures: filteredDepartures
      };
    });
  }
}
