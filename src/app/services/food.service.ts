import {Injectable} from '@angular/core';
import {ApiClientService} from "./api-client.service";
import {BehaviorSubject, interval, Observable, switchMap} from "rxjs";
import {MenuResponse} from "../types/menu.response";

@Injectable({
  providedIn: 'root'
})
export class FoodService {
  private menuSubject = new BehaviorSubject<MenuResponse | null>(null);
  public menu$: Observable<MenuResponse | null> = this.menuSubject.asObservable();

  constructor(private api: ApiClientService) {
    interval(1000 * 60 * 60 * 24) // 24 hours
      .pipe(
        switchMap(() => this.api.getMenu())
      )
      .subscribe(menu => {
        this.menuSubject.next(menu);
      });

    // Initial fetch when the service starts
    this.api.getMenu().subscribe(menu => {
      this.menuSubject.next(menu);
    });
  }
}
