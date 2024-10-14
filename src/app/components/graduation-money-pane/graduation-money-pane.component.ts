import {Component} from '@angular/core';
import {PaneComponent} from "../pane/pane.component";
import {faMoneyBill, faPiggyBank} from "@fortawesome/free-solid-svg-icons";
import {RoundProgressComponent} from "angular-svg-round-progressbar";
import {RoundProgressbarComponent} from "../round-progressbar/round-progressbar.component";

@Component({
  selector: 'app-graduation-money-pane',
  standalone: true,
  imports: [
    PaneComponent,
    RoundProgressComponent,
    RoundProgressbarComponent
  ],
  templateUrl: './graduation-money-pane.component.html',
})
export class GraduationMoneyPaneComponent {

  progressColor = "#ffcc00";
  protected readonly faMoneyBill = faMoneyBill;
  protected readonly faPiggyBank = faPiggyBank;
}
