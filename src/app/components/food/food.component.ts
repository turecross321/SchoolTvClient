import {Component} from '@angular/core';
import {DividerComponent} from "../divider/divider.component";
import {NgForOf} from "@angular/common";
import {MenuDayResponse} from "../../types/food/menu-day.response";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCutlery} from '@fortawesome/free-solid-svg-icons';
import {PaneComponent} from "../pane/pane.component";
import {ApiClientService} from "../../services/api-client.service";
import {interval, switchMap} from "rxjs";
import {MenuResponse} from "../../types/food/menu.response";

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    DividerComponent,
    NgForOf,
    FaIconComponent,
    PaneComponent
  ],
  templateUrl: './food.component.html',
})
export class FoodComponent {
  menuToday: MenuDayResponse | null = null;
  menuTomorrow: MenuDayResponse | null = null;
  protected readonly faCutlery = faCutlery;

  constructor(public api: ApiClientService) {
    interval(1000 * 60 * 60 * 24) // 24 hours
      .pipe(
        switchMap(() => this.api.getMenu())
      )
      .subscribe(menu => {
        this.setMenus(menu);
      });

    // Initial fetch when the service starts
    this.api.getMenu().subscribe(menu => {
      this.setMenus(menu);
    });
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
    } else {
      this.menuTomorrow = response.weeks[0].days[day + 1];
    }
  }
}
