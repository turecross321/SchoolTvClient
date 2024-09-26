import {Component} from '@angular/core';
import {PaneComponent} from "../pane/pane.component";
import {faBullhorn} from "@fortawesome/free-solid-svg-icons";
import {ApiClientService} from "../../services/api-client.service";
import {ClassroomAnnouncementResponse} from "../../types/classroom-announcement.response";
import {DatePipe, NgOptimizedImage} from "@angular/common";

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [
    PaneComponent,
    NgOptimizedImage,
    DatePipe
  ],
  templateUrl: './classroom.component.html',
})
export class ClassroomComponent {

  announcement: ClassroomAnnouncementResponse | null = null;
  protected readonly faBullhorn = faBullhorn;

  constructor(private apiClient: ApiClientService) {
    this.apiClient.getLatestClassroomAnnouncement().subscribe((announcement) => {
      this.announcement = announcement;
    })
  }

  date(): Date | null {
    if (!this.announcement)
      return null;
    
    return new Date(this.announcement.creationDate);
  }
}
