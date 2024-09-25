import {Component, Input} from '@angular/core';
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {faPoo} from "@fortawesome/free-solid-svg-icons";
import {DividerComponent} from "../divider/divider.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'app-pane',
  standalone: true,
  imports: [
    DividerComponent,
    FaIconComponent,
    NgForOf
  ],
  templateUrl: './pane.component.html',
})
export class PaneComponent {
  @Input() name: string = "Name"
  @Input() icon: IconDefinition = faPoo;
}
