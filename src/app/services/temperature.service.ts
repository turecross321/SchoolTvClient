import {Injectable} from '@angular/core';
import {BehaviorSubject, interval, Observable, switchMap} from "rxjs";
import {ApiClientService} from "./api-client.service";

@Injectable({
  providedIn: 'root'
})
export class TemperatureService {
  private temperatureSubject = new BehaviorSubject<number | null>(null);
  public temperature$: Observable<number | null> = this.temperatureSubject.asObservable();

  constructor(private api: ApiClientService) {
    interval(60000)
      .pipe(
        switchMap(() => this.api.getLatestTemperature())
      )
      .subscribe(temp => {
        this.temperatureSubject.next(temp.celsius);
      });

    // Initial fetch when the service starts
    this.api.getLatestTemperature().subscribe(temp => {
      this.temperatureSubject.next(temp.celsius);
    });
  }
}
