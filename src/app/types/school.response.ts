import {DistrictResponse} from "./district.response";

export interface SchoolResponse {
  id: number;
  name: string;
  district: DistrictResponse
  userDistance: number | null;
  urlName: string;
}
