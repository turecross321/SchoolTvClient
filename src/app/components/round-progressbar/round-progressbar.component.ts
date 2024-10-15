import {Component, Input} from '@angular/core';
import {RoundProgressComponent} from "angular-svg-round-progressbar";
import {ThemeService, ThemeType} from "../../services/theme.service";

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
  @Input() verb: string = "insamlat"

  constructor(private theme: ThemeService) {

  }

  getColor(): string {
    if (this.theme.getThemeType() === ThemeType.Dark)
      return "#00ff00"; // todo: refactor this so its at least KIND OF CLEAN

    return this.color;
  }

  getBackgroundColor(): string { // todo: refactor this so its at least KIND OF CLEAN
    if (this.theme.getThemeType() === ThemeType.Dark)
      return "#001a00";

    return "#eaeaea";
  }
}
