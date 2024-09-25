import {SchoolResponse} from "./school.response";
import {MenuWeekResponse} from "./menu-week.response";

export interface MenuResponse {
  weeks: MenuWeekResponse[];
  school: SchoolResponse;
  bulletIns: string[]
}
