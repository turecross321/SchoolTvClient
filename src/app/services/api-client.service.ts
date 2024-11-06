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
import {ActivatedRoute, Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class ApiClientService {
  readOnlyPassword: string | null = null;
  baseUrl: string | null = null;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    this.route.queryParams.subscribe((params) => {
      this.baseUrl = params["baseUrl"];
      this.readOnlyPassword = params["readOnlyPassword"];
    });
  }

  isConfigured() {
    return this.readOnlyPassword != null && this.baseUrl != null;
  }

  getSunPhases() {
    return this.get<SunPhasesResponse>('sunPhases');
  }

  getLogoUrl(theme: ThemeType) {
    return this.baseUrl + '/logo/' + theme.toString() + '?password=' + this.readOnlyPassword;
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
    let options = {headers: {Password: this.readOnlyPassword ?? ""}};

    return this.http.get<TResponse>(this.baseUrl + '/' + path, options).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          console.error("Invalid password. Please update readonly password parameter.");
        } else if (error.status === 0) {
          console.error("Failed to reach server. Please update base url or try again later.")
        }
        throw error;
      })
    );
  }
}
