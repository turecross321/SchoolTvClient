import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {SettingsResponse} from "../types/settings.response";
import {TemperatureResponse} from "../types/temperature.response";
import {MenuResponse} from "../types/food/menu.response";
import {ClassroomAnnouncementResponse} from "../types/classroom-announcement.response";
import {VasttrafikStopAreaResponse} from "../types/vasttrafik/vasttrafik-stop-area.response";
import {SchoolBreaksResponse} from "../types/breaks/school-breaks.response";
import {GraduationMoneyResponse} from "../types/graduation-money.response";
import {ThemeType} from "./theme.service";
import {SunPhasesResponse} from "../types/sun-phases.response";
import {catchError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {

  readonlyPassword: string | null = null;
  baseUrl: string | null = null;
  private readonlyPasswordKey = "readonlyPassword";
  private baseUrlKey = "baseUrl";

  constructor(private http: HttpClient) {
  }

  isConfigured() {
    return this.readonlyPassword != null && this.baseUrl != null;
  }

  configure(): void {
    const savedBaseUrl = localStorage.getItem(this.baseUrlKey);
    if (savedBaseUrl != null) {
      this.baseUrl = savedBaseUrl;
    } else {
      const baseUrlInput = window.prompt('Please enter the api base url', '');
      this.baseUrl = baseUrlInput;
      localStorage.setItem(this.baseUrlKey, baseUrlInput!);
    }

    const savedPassword = localStorage.getItem(this.readonlyPasswordKey);
    if (savedPassword != null) {
      this.readonlyPassword = savedPassword;
    } else {
      const passwordInput = window.prompt('Please enter the readonly password', '');
      this.readonlyPassword = passwordInput;
      localStorage.setItem(this.readonlyPasswordKey, passwordInput!);
    }
  }

  getSunPhases() {
    return this.get<SunPhasesResponse>('sunPhases');
  }

  getLogoUrl(theme: ThemeType) {
    return this.baseUrl + '/logo/' + theme.toString() + '?password=' + this.readonlyPassword;
  }

  getGraduationMoneyGoals() {
    return this.get<GraduationMoneyResponse[]>('graduationMoneyGoals');
  }

  getBreaks() {
    return this.get<SchoolBreaksResponse>('schoolBreaks');
  }

  getVasttrafikDepartures() {
    return this.get<VasttrafikStopAreaResponse[]>("vasttrafik/departures");
  }

  getMenu() {
    return this.get<MenuResponse>('food/menu');
  }

  getLatestClassroomAnnouncement() {
    return this.get<ClassroomAnnouncementResponse>('classroom/latestAnnouncement');
  }

  getLatestTemperature() {
    return this.get<TemperatureResponse>('temperature/latest');
  }

  getSettings() {
    return this.get<SettingsResponse>('settings');
  }

  get<TResponse>(path: string) {
    let options = {headers: {Password: this.readonlyPassword ?? ""}};

    return this.http.get<TResponse>(this.baseUrl + '/' + path, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401 || error.status === 0) {
          localStorage.removeItem(this.readonlyPasswordKey);
          this.readonlyPassword = null;

          localStorage.removeItem(this.baseUrlKey);
          this.baseUrl = null;

          this.configure();
        }
        throw error;
      })
    );
  }
}
