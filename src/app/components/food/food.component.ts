import {Component} from '@angular/core';
import {DividerComponent} from "../divider/divider.component";
import {FoodService} from "../../services/food.service";
import {NgForOf} from "@angular/common";
import {MenuDayResponse} from "../../types/menu-day.response";
import {FaIconComponent} from "@fortawesome/angular-fontawesome";
import {faCutlery} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-food',
  standalone: true,
  imports: [
    DividerComponent,
    NgForOf,
    FaIconComponent
  ],
  templateUrl: './food.component.html',
})
export class FoodComponent {
  menuToday: MenuDayResponse | null = null;
  menuTomorrow: MenuDayResponse | null = null;
  protected readonly faCutlery = faCutlery;

  constructor(public foodService: FoodService) {
    foodService.menu$.subscribe((menu) => {
      if (!menu) {
        return;
      }

      let now = new Date();
      let day = (now.getDay() + 6) % 7; // adjust so that monday represents 0

      this.menuToday = menu!.weeks[0].days[day];

      if (day >= 4) // if its friday or later today, then next today should be next week on monday
      {
        this.menuTomorrow = menu!.weeks[1].days[0];
      } else {
        this.menuTomorrow = menu!.weeks[0].days[day + 1];
      }
    })
  }
}
