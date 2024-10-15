import {VasttrafikDepartureResponse} from "./vasttrafik-departure.response";

export interface VasttrafikStopAreaResponse {
  name: string,
  departures: VasttrafikDepartureResponse[]
  distanceInMeters: number;
}
