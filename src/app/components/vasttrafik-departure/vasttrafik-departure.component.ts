import {Component, Input} from '@angular/core';
import {DateMomentComponent, DateMomentType} from "../date-moment/date-moment.component";
import {VasttrafikDepartureResponse} from "../../types/vasttrafik/vasttrafik-departure.response";
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {VasttrafikTransportMode} from "../../types/vasttrafik/vasttrafik-transport-mode";
import {
  faBicycle,
  faBus,
  faCar,
  faFerry,
  faQuestionCircle,
  faTaxi,
  faTrain,
  faTram,
  faWalking
} from "@fortawesome/free-solid-svg-icons";
import {NgClass} from "@angular/common";
import {ThemeService, ThemeType} from "../../services/theme.service";

@Component({
  selector: 'app-vasttrafik-departure',
  standalone: true,
  imports: [
    DateMomentComponent,
    NgClass,
    FaIconComponent
  ],
  templateUrl: './vasttrafik-departure.component.html',
})
export class VasttrafikDepartureComponent {
  @Input() departure: VasttrafikDepartureResponse = null!;
  protected readonly DateMomentType = DateMomentType;
  protected readonly ThemeType = ThemeType;

  constructor(public theme: ThemeService) {
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
      case VasttrafikTransportMode.Teletaxi:
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
