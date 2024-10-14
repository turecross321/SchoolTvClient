import {VasttrafikDepartureResponse} from "./vasttrafik-departure.response";

export interface VasttrafikStopAreaResponse {
  name: string,
  platform: string,
  gid: string,
  departures: VasttrafikDepartureResponse[]
}
