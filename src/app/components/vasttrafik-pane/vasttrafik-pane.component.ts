import {Component} from '@angular/core';
import {PaneComponent} from "../pane/pane.component";
import {
  faBicycle,
  faBus,
  faCar,
  faFerry,
  faQuestionCircle,
  faTaxi,
  faTrafficLight,
  faTrain,
  faTram,
  faWalking
} from "@fortawesome/free-solid-svg-icons";
import {NgClass, NgForOf} from "@angular/common";
import {ApiClientService} from "../../services/api-client.service";
import {interval, switchMap} from "rxjs";
import {DateComponent} from "../date/date.component";
import {DateMomentComponent, DateMomentType} from "../date-moment/date-moment.component";
import {VasttrafikStopAreaResponse} from "../../types/vasttrafik/vasttrafik-stop-area.response";
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {VasttrafikDepartureResponse} from "../../types/vasttrafik/vasttrafik-departure.response";
import {VasttrafikTransportMode} from "../../types/vasttrafik/vasttrafik-transport-mode";

@Component({
  selector: 'app-vasttrafik-pane',
  standalone: true,
  imports: [
    PaneComponent,
    NgForOf,
    DateComponent,
    DateMomentComponent,
    FaIconComponent,
    NgClass
  ],
  templateUrl: './vasttrafik-pane.component.html'
})
export class VasttrafikPaneComponent {
  stopAreas: VasttrafikStopAreaResponse[] = [];
  protected readonly faTrafficLight = faTrafficLight;
  protected readonly DateMomentType = DateMomentType;

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
    // Filter out duplicate lines (eg. busses)
    this.stopAreas = response.map(stop => {
      const seenLines = new Set<string>();
      const filteredDepartures = stop.departures.filter(departure => {
        if (!seenLines.has(departure.lineName)) {
          seenLines.add(departure.lineName);
          return true;
        }
        return false;
      });
      return {
        ...stop,
        departures: filteredDepartures
      };
    });
  }

  sortedAreas() {
    return this.stopAreas.sort((a, b) => {
      if (a.name === b.name) {
        // If they have the same name, then sort by platform
        return a.platform.localeCompare(b.platform);
      }
      // Otherwise, sort by name
      return a.name.localeCompare(b.name);
    });
  }

  getLineIcon(departure: VasttrafikDepartureResponse): IconDefinition {
    switch (departure.transportMode) {
      case VasttrafikTransportMode.Bus:
        return faBus;
      case VasttrafikTransportMode.Tram:
        return faTram;
      case VasttrafikTransportMode.Ferry:
        return faFerry;
      case VasttrafikTransportMode.Train:
        return faTrain;
      case VasttrafikTransportMode.Taxi:
      case VasttrafikTransportMode.Teletaxi:  // Assuming both taxi types use the same icon
        return faTaxi;
      case VasttrafikTransportMode.Walk:
        return faWalking;
      case VasttrafikTransportMode.Bike:
        return faBicycle;
      case VasttrafikTransportMode.Car:
        return faCar;
      case VasttrafikTransportMode.None:
      case VasttrafikTransportMode.Unknown:
      default:
        return faQuestionCircle;
    }
  }
}
