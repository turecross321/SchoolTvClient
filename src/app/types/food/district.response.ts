import {ProvinceResponse} from "./province.response";

export interface DistrictResponse {
  name: string;
  id: number;
  province: ProvinceResponse;
  urlName: string;
}
