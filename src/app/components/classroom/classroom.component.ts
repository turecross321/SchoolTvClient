import {Component} from '@angular/core';
import {PaneComponent} from "../pane/pane.component";
import {faBullhorn} from "@fortawesome/free-solid-svg-icons";
import {ApiClientService} from "../../services/api-client.service";

@Component({
  selector: 'app-classroom',
  standalone: true,
  imports: [
    PaneComponent
  ],
  templateUrl: './classroom.component.html',
})
export class ClassroomComponent {

  protected readonly faBullhorn = faBullhorn;

  constructor(private apiClient: ApiClientService) {

  }
}
