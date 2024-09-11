import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {NgOptimizedImage} from "@angular/common";
import {HeaderComponent} from "./components/header/header.component";
import {FooterComponent} from "./components/footer/footer.component";
import {DividerComponent} from "./components/divider/divider.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NgOptimizedImage, HeaderComponent, FooterComponent, DividerComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'school-tv';
}
