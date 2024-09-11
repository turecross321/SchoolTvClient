import {Component} from '@angular/core';
import {NgOptimizedImage} from "@angular/common";
import {BrandingService} from "../../services/branding.service";

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    NgOptimizedImage
  ],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  constructor(public brandingService: BrandingService) {
  }
}
