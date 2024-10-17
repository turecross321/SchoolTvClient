import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {interval} from "rxjs";
import {ApiClientService} from "./api-client.service";
import {SunPhasesResponse} from "../types/sun-phases.response";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // todo: refactor this so its at least KIND OF CLEAN

  private theme: Theme = null!;
  private sunPhases: SunPhasesResponse | null = null;

  constructor(@Inject(PLATFORM_ID) platformId: Object, private api: ApiClientService) {
    if (isPlatformBrowser(platformId)) {
      api.getSunPhases().subscribe(response => {
        this.sunPhases = response;
        this.applyTheme();
      });

      interval(1000 * 60) // every minute
        .subscribe(() => {
          this.applyTheme();
        });

      interval(1000 * 60 * 60) // every hour
        .subscribe(() => {
          api.getSunPhases().subscribe(response => {
            this.sunPhases = response;
          });
        });
    }
  }

  public applyTheme(): void {
    const now = new Date();
    if (this.isAprilFirst(now)) {
      this.theme = themes[ThemeType.AprilFools];
    } else if (this.sunPhases && this.sunPhases.dawn && this.sunPhases.dusk &&
      (now > new Date(this.sunPhases.dusk) || now < new Date(this.sunPhases.dawn))) {
      this.theme = themes[ThemeType.Night];
    } else {
      this.theme = themes[ThemeType.Default];
    }

    // @ts-ignore
    document.getRootNode().children[0].className = this.theme.type;
    document.body.style.fontFamily = this.theme.font;
  }

  public getThemeType(): ThemeType {
    return this.theme.type;
  }

  public getRandomWordPrefix(): string {
    const theme = this.theme;
    return theme.wordPrefixes[Math.floor(Math.random() * theme.wordPrefixes.length)];
  }

  private isAprilFirst(date: Date): boolean {
    return date.getMonth() === 3 && date.getDate() === 1;
  }
}


export enum ThemeType {
  Default = "default",
  Night = "night",
  AprilFools = "aprilFools"
}

interface Theme {
  type: ThemeType;
  font: string;
  wordPrefixes: string[];
}

export const themes: { [key: string]: Theme } = {
  default: {type: ThemeType.Default, font: "Inter, sans-serif", wordPrefixes: []},
  night: {type: ThemeType.Night, font: "Inter, sans-serif", wordPrefixes: []},
  aprilFools: {
    type: ThemeType.AprilFools,
    font: "Comic Sans MS, sans-serif",
    wordPrefixes: ["LURIG", "SKOJIG", "ROLIG", "VÄLSMAKANDE", "FESTLIG", "SPÄNNANDE", "HÄFTIG", "GALANT", "OND"]
  },
};
