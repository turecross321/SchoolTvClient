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
  @Input() max: number | null = 0;
  @Input() unitSingle: string = "kr";
  @Input() unitMultiple: string = "kr";
  @Input() name: string = "Da Goons"
  @Input() remaining: boolean = false;
  @Input() verb: string = "insamlat"

  constructor(private theme: ThemeService) {

  }

  getCurrentValue(): number | null {
    let value;

    if (this.current == null)
      value = null;
    else if (this.remaining) {
      if (this.max == null) {
        value = null;
      }

      value = this.max! - this.current!;
    } else {
      value = this.current;
    }

    return value;
  }

  getCurrentString(): string | null {
    const value = this.getCurrentValue();

    if (!value)
      return null;

    if (value <= 1)
      return "< 1";

    return value.toLocaleString();
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
