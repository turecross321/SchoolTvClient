import {Inject, Injectable, PLATFORM_ID} from '@angular/core';
import {isPlatformBrowser} from "@angular/common";
import {interval} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // todo: refactor this so its at least KIND OF CLEAN

  private theme: Theme = null!;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    if (isPlatformBrowser(platformId)) {
      this.setTheme();

      interval(1000 * 60) // every minute
        .subscribe(() => {
          this.setTheme();
        })
    }
  }

  public setTheme(): void {
    const now = new Date();
    if (this.isAprilFirst(now)) {
      this.theme = themes[ThemeType.AprilFools];
    } else if (now.getHours() >= 16 || now.getHours() < 8) {
      this.theme = themes[ThemeType.Dark];
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
  Dark = "dark",
  AprilFools = "aprilFools"
}

interface Theme {
  type: ThemeType;
  font: string;
  wordPrefixes: string[];
}

export const themes: { [key: string]: Theme } = {
  default: {type: ThemeType.Default, font: "Inter, sans-serif", wordPrefixes: []},
  dark: {type: ThemeType.Dark, font: "Inter, sans-serif", wordPrefixes: []},
  aprilFools: {
    type: ThemeType.AprilFools,
    font: "Comic Sans MS, sans-serif",
    wordPrefixes: ["LURIG", "SKOJIG", "ROLIG", "VÄLSMAKANDE", "FESTLIG", "SPÄNNANDE", "HÄFTIG", "GALANT", "OND"]
  },
};
