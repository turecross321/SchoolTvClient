import {Injectable} from '@angular/core';
import {ApiClientService} from "./api-client.service";
import {SettingsResponse} from "../types/settings.response";

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  settings: SettingsResponse | null = null;

  constructor(private api: ApiClientService) {
    this.api.getSettings().subscribe((settings) => {
      this.settings = settings;
    })
  }
}
