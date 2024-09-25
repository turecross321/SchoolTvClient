import {MenuDayResponse} from "./menu-day.response";

export interface MenuWeekResponse {
  year: number;
  weekNumber: number;
  days: MenuDayResponse[];
}
