import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
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
    this.applyTheme(themes[ThemeType.Default]);

    if (isPlatformBrowser(platformId)) {
      api.getSunPhases().subscribe(response => {
        this.sunPhases = response;
        this.applyAppropriateTheme();
      });

// Set up the interval to apply the appropriate theme every minute (1000 * 60 ms)
      setInterval(() => {
        this.applyAppropriateTheme();
      }, 1000 * 60); // every minute

// Set up the interval to fetch sun phases every hour (1000 * 60 * 60 ms)
      setInterval(() => {
        this.api.getSunPhases().subscribe(response => {
          this.sunPhases = response;
        });
      }, 1000 * 60 * 60); // every hour

    }
  }

  public applyAppropriateTheme(): void {
    const now = new Date();
    const dusk = new Date(this.sunPhases!.dusk!);
    const dawn = new Date(this.sunPhases!.dawn!);
    let theme;
    if (this.isAprilFirst(now)) {
      theme = themes[ThemeType.AprilFools];
    } else if (now >= dusk || now < dawn) {
      theme = themes[ThemeType.Night];
    } else {
      theme = themes[ThemeType.Default];
    }

    this.applyTheme(theme);
  }

  public getThemeType(): ThemeType {
    return this.theme.type;
  }

  public getRandomWordPrefix(): string {
    const theme = this.theme;
    return theme.wordPrefixes[Math.floor(Math.random() * theme.wordPrefixes.length)];
  }

  private applyTheme(theme: Theme) {
    this.theme = theme;

    // @ts-ignore
    document.getRootNode().children[0].className = this.theme.type;
    document.body.style.fontFamily = this.theme.font;
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
