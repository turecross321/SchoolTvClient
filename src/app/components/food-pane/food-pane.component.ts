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
import {MenuWeekResponse} from "../../types/food/menu-week.response";

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
  response: MenuResponse | null = null;
  protected readonly faCutlery = faCutlery;
  protected readonly ThemeType = ThemeType;

  constructor(public api: ApiClientService, public theme: ThemeService) {
    // Initial fetch when the service starts
    this.fetchMenu();

    // Set up the interval to fetch data every hour
    setInterval(() => this.fetchMenu(), 1000 * 60 * 60); // 1 hour
  }

  getWeekNumber(date: Date): number {
    const startOfYear = new Date(date.getFullYear(), 0, 1);
    const oneDayInMs = 1000 * 60 * 60 * 24;

    const dayOfWeek = startOfYear.getDay();
    const adjustedStartOfYear = new Date(
      date.getFullYear(),
      0,
      1 + ((dayOfWeek <= 4 ? dayOfWeek : dayOfWeek - 7) * -1)
    );

    const adjustedDiff = date.getTime() - adjustedStartOfYear.getTime();
    return Math.ceil(adjustedDiff / (oneDayInMs * 7));
  }

  getMenuWeekIndexByWeekNumber(
    weeks: MenuWeekResponse[],
    weekNumber: number
  ): number {
    return weeks.findIndex(week => week.weekNumber === weekNumber)!;
  }

  menuToday(): MenuDayResponse | null {
    const current = this.getCurrentDayAndWeek();
    if (!current || !this.response) return null;

    const {day, weekIndex} = current;
    return day < this.response.weeks[weekIndex].days.length
      ? this.response.weeks[weekIndex].days[day]
      : null;
  }

  nextMenu(): MenuDayResponse | null {
    const current = this.getCurrentDayAndWeek();
    if (!current || !this.response) return null;

    const {day, weekIndex} = current;

    if (day >= 4) {
      // If it's Friday or later, next menu is next week's Monday
      return this.response.weeks[weekIndex + 1]?.days[0] || null;
    } else {
      // Otherwise, it's the next day
      return this.response.weeks[weekIndex]?.days[day + 1] || null;
    }
  }

  nextMenuTitle(): string | null {
    const current = this.getCurrentDayAndWeek();
    if (!current) return null;

    const {day} = current;
    return day >= 4 ? "Nästa vecka" : "Imorgon";
  }

  private fetchMenu(): void {
    this.api.getMenu().subscribe(menu => {
      this.response = menu;
    });
  }

  private getCurrentDayAndWeek(): { day: number; weekIndex: number } | null {
    if (!this.response) return null;

    const now = new Date();
    const day = (now.getDay() + 6) % 7; // Adjust so that Monday = 0
    const weekIndex = this.getMenuWeekIndexByWeekNumber(this.response.weeks, this.getWeekNumber(now));
    return {day, weekIndex};
  }
}
