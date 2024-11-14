import {Component} from '@angular/core';
import {PaneComponent} from "../pane/pane.component";
import {faMoneyBill, faPiggyBank} from "@fortawesome/free-solid-svg-icons";
import {RoundProgressComponent} from "angular-svg-round-progressbar";
import {RoundProgressbarComponent} from "../round-progressbar/round-progressbar.component";
import {ApiClientService} from "../../services/api-client.service";
import {interval, switchMap} from "rxjs";
import {GraduationMoneyResponse} from "../../types/graduation-money.response";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-graduation-money-pane',
  standalone: true,
  imports: [
    PaneComponent,
    RoundProgressComponent,
    RoundProgressbarComponent,
    NgForOf
  ],
  templateUrl: './graduation-money-pane.component.html',
})
export class GraduationMoneyPaneComponent {

  classes: GraduationMoneyResponse[] = [];

  progressColor = "#ff8f00";
  protected readonly faMoneyBill = faMoneyBill;
  protected readonly faPiggyBank = faPiggyBank;

  constructor(public api: ApiClientService) {
    interval(1000 * 60) // 1 minute
      .pipe(
        switchMap(() => this.api.getGraduationMoneyGoals())
      )
      .subscribe(goals => {
        this.classes = goals;
      });

    // Initial fetch when the service starts
    this.api.getGraduationMoneyGoals().subscribe(goals => {
      this.classes = goals;
    });
  }
}

