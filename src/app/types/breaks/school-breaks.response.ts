import {SchoolBreakResponse} from "./school-break.response";

export interface SchoolBreaksResponse {
  relevantBreaks: SchoolBreakResponse[];
  latestEndedBreakEndDate: string | null;
}
