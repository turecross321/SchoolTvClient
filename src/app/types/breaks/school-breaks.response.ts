import {SchoolBreakResponse} from "./school-break.response";

export interface SchoolBreaksResponse {
  relevantBreaks: SchoolBreakResponse[];
  latestTermBreakingBreakEndDate: string | null;
}
