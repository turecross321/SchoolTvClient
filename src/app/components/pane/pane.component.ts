import {Component, Input} from '@angular/core';
import {FaIconComponent, IconDefinition} from "@fortawesome/angular-fontawesome";
import {DividerComponent} from "../divider/divider.component";
import {NgForOf} from "@angular/common";
import {faPoo} from "@fortawesome/free-solid-svg-icons";

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
