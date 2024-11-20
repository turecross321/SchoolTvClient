import {Component} from '@angular/core';
import {DividerComponent} from "../divider/divider.component";
import {NgForOf} from "@angular/common";
import {MenuDayResponse} from "../../types/food/menu-day.response";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCutlery} from '@fortawesome/free-solid-svg-icons';
import {PaneComponent} from "../pane/pane.component";
import {ApiClientService} from "../../services/api-client.service";
import {MenuResponse} from "../../types/food/menu.response";
import {ThemeService, ThemeType} from "../../services/theme.service";

@Component({
  selector: 'app-food-pane',
  standalone: true,
  imports: [
    DividerComponent,
    NgForOf,
    FaIconComponent,
    PaneComponent
  ],
  templateUrl: './food-pane.component.html',
})
export class FoodPaneComponent {
  menuToday: MenuDayResponse | null = null;
  menuTomorrow: MenuDayResponse | null = null;
  nextDayText: string = ""
  protected readonly faCutlery = faCutlery;
  protected readonly ThemeType = ThemeType;

  constructor(public api: ApiClientService, public theme: ThemeService) {
// Initial fetch when the service starts
    this.api.getMenu().subscribe(menu => {
      this.setMenus(menu);
    });

// Set up the interval to fetch data every hour
    setInterval(() => {
      this.api.getMenu().subscribe(menu => {
        this.setMenus(menu);
      });
    }, 1000 * 60 * 60); // 1 hour

  }

  setMenus(response: MenuResponse | null) {
    if (!response) {
      return;
    }

    let now = new Date();
    let day = (now.getDay() + 6) % 7; // adjust so that monday represents 0

    this.menuToday = response.weeks[0].days[day];

    if (day >= 4) // if its friday or later today, then next today should be next week on monday
    {
      this.menuTomorrow = response.weeks[1].days[0];
      this.nextDayText = "Nästa vecka";
    } else {
      this.menuTomorrow = response.weeks[0].days[day + 1];
      this.nextDayText = "Imorgon";
    }
  }
}
