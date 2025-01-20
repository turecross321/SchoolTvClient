import {Component} from '@angular/core';
import {PaneComponent} from "../pane/pane.component";
import {faBullhorn} from "@fortawesome/free-solid-svg-icons";
import {ApiClientService} from "../../services/api-client.service";
import {ClassroomAnnouncementResponse} from "../../types/classroom-announcement.response";
import {DatePipe, NgOptimizedImage} from "@angular/common";
import {DateComponent} from "../date/date.component";

@Component({
  selector: 'app-classroom-pane',
  standalone: true,
  imports: [
    PaneComponent,
    NgOptimizedImage,
    DatePipe,
    DateComponent
  ],
  templateUrl: './classroom-pane.component.html',
})
export class ClassroomPaneComponent {

  announcement: ClassroomAnnouncementResponse | null = null;
  protected readonly faBullhorn = faBullhorn;

  constructor(private apiClient: ApiClientService) {
    this.apiClient.getLatestClassroomAnnouncement().subscribe((announcement) => {
      this.announcement = announcement;
    })

    setInterval(() => {
      this.apiClient.getLatestClassroomAnnouncement().subscribe((announcement) => {
        this.announcement = announcement;
      })
    }, 1000 * 60 * 60); // 1 hour
  }
}
