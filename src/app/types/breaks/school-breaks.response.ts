import {SchoolBreakResponse} from "./school-break.response";

export interface SchoolBreaksResponse {
  relevantBreaks: SchoolBreakResponse[];
  latestStartedSummerBreakEndDate: string | null;
}
