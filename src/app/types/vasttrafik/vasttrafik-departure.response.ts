import {VasttrafikTransportMode} from "./vasttrafik-transport-mode";

export interface VasttrafikDepartureResponse {
  lineName: string;
  lineBorderColor: string;
  lineForegroundColor: string;
  lineDesignation: string;
  platform: string;
  transportMode: VasttrafikTransportMode;
  plannedTime: string;
  estimatedTime: string | null;
  isCancelled: boolean;
  shortDirection: string;
  fullDirection: string;
}
