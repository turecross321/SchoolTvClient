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
  @Input() current: number | null = 0;
  @Input() textCurrent: number | null = 0;
  @Input() max: number | null = 0;
  @Input() unitSingle: string = "kr";
  @Input() unitMultiple: string = "kr";
  @Input() name: string = "Da Goons"
  @Input() verb: string = "insamlat"

  constructor(private theme: ThemeService) {

  }

  getCurrentString(): string | null {
    if (!this.textCurrent)
      return null;

    if (this.textCurrent <= 1)
      return "< 1";

    return this.textCurrent.toLocaleString();
  }

  getColor(): string {
    if (this.theme.getThemeType() === ThemeType.Night)
      return "#00ff00"; // todo: refactor this so its at least KIND OF CLEAN

    return this.color;
  }

  getBackgroundColor(): string { // todo: refactor this so its at least KIND OF CLEAN
    if (this.theme.getThemeType() === ThemeType.Night)
      return "#001a00";

    return "#eaeaea";
  }
}
