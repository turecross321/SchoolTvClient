import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BrandingResponse} from "../types/branding.response";
import {TemperatureResponse} from "../types/temperature.response";
import {MenuResponse} from "../types/menu.response";

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  private readonly baseUrl: string;

  constructor(private http: HttpClient) {
    this.baseUrl = 'http://localhost:5000';
  }

  getMenu() {
    return this.get<MenuResponse>('food/menu');
  }

  getLatestTemperature() {
    return this.get<TemperatureResponse>('temperature/latest');
  }

  getBrand() {
    return this.get<BrandingResponse>('branding');
  }

  get<TResponse>(path: string) {
    return this.http.get<TResponse>(this.baseUrl + '/' + path);
  }
}
