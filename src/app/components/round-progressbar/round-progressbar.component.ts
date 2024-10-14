import {Component, Input} from '@angular/core';
import {RoundProgressComponent} from "angular-svg-round-progressbar";

@Component({
  selector: 'app-round-progressbar',
  standalone: true,
  imports: [
    RoundProgressComponent
  ],
  templateUrl: './round-progressbar.component.html',
})
export class RoundProgressbarComponent {
  @Input() color: string = "#000000";
  @Input() current: number = 0;
  @Input() max: number = 0;
  @Input() unit: string = "kr";
  @Input() name: string = "Da Goons"
  @Input() remaining: boolean = false;
  @Input() verb: string = "insamlat";
}
