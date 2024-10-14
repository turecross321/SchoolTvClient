import {Injectable} from '@angular/core';
import {ApiClientService} from "./api-client.service";
import {ConfigurationResponse} from "../types/configuration.response";

@Injectable({
  providedIn: 'root'
})
export class ConfigurationService {
  branding?: ConfigurationResponse;

  constructor(private api: ApiClientService) {
    this.api.getConfiguration().subscribe((branding) => {
      this.branding = branding;
    })
  }
}
