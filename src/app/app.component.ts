import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {DividerComponent} from "./components/divider/divider.component";
import {FoodPaneComponent} from "./components/food-pane/food-pane.component";
import {ClassroomPaneComponent} from "./components/classroom-pane/classroom-pane.component";
import {VasttrafikPaneComponent} from "./components/vasttrafik-pane/vasttrafik-pane.component";
import {GraduationMoneyPaneComponent} from "./components/graduation-money-pane/graduation-money-pane.component";
import {BreaksPane} from "./components/breaks-pane/breaks-pane.component";
import {ApiClientService} from "./services/api-client.service";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, HeaderComponent, DividerComponent, FoodPaneComponent, ClassroomPaneComponent, VasttrafikPaneComponent, GraduationMoneyPaneComponent, BreaksPane],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school-tv';

  constructor(public api: ApiClientService) {
    this.api.authenticate();
  }
}
