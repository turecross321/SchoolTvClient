import {Component} from '@angular/core';
import {PaneComponent} from "../pane/pane.component";
import {faClock} from "@fortawesome/free-solid-svg-icons";
import {RoundProgressbarComponent} from "../round-progressbar/round-progressbar.component";
import {ApiClientService} from "../../services/api-client.service";
import {NgForOf} from "@angular/common";
import {SchoolBreaksResponse} from "../../types/breaks/school-breaks.response";
import {SchoolBreakResponse} from "../../types/breaks/school-break.response";

@Component({
  selector: 'app-breaks-pane',
  standalone: true,
  imports: [
    PaneComponent,
    RoundProgressbarComponent,
    NgForOf
  ],
  templateUrl: './breaks-pane.component.html',
})
export class BreaksPane {
  breaks: SchoolBreaksResponse | null = null;
  protected readonly faClock = faClock;

  constructor(private apiClient: ApiClientService) {
    this.apiClient.getBreaks().subscribe((breaks) => {
      this.breaks = breaks;
    })
  }

  getBreakMax(b: SchoolBreakResponse) {
    if (!this.breaks?.latestTermBreakingBreakEndDate) {
      return 0;
    }

    const start = new Date(this.breaks.latestTermBreakingBreakEndDate);
    const end = new Date(b.startDate);
    const timeDifference = end.getTime() - start.getTime();
    const daysDifference = timeDifference / (1000 * 3600 * 24);

    return Math.ceil(Math.abs(daysDifference));
  }

  getDaysElapsed() {
    const start = this.breaks?.latestTermBreakingBreakEndDate ? new Date(this.breaks.latestTermBreakingBreakEndDate) : new Date();
    const now = new Date();
    const timeDifference = now.getTime() - start.getTime();
    const daysDifference = timeDifference / (1000 * 60 * 60 * 24);
    return Math.round(Math.abs(daysDifference));
  }

  getDaysLeft(b: SchoolBreakResponse) {
    return this.getBreakMax(b) - this.getDaysElapsed();
  }

}
