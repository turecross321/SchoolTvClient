import {VasttrafikTransportMode} from "./vasttrafik-transport-mode";

export interface VasttrafikDepartureResponse {
  lineName: string,
  lineBorderColor: string,
  lineForegroundColor: string,
  lineDesignation: string,
  transportMode: VasttrafikTransportMode,
  plannedTime: string,
  estimatedTime: string | null,
  isCancelled: boolean,
  fromStopName: string,
  fromStopPlatform: string,
  shortDirection: string,
  fullDirection: string
}
