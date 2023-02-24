import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'angular-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  // title = 'AnhHuy6';
  title = 'My first AGM project';
  lat = 44.34;
  lng = 10.99;
  mapType = "satelite"
  googleMapType = 'satellite';
  markerlat = -28.68352;
  markerlng = -147.20785;
  zoom = 5
  constructor(private authService: AuthService) { }

  isLogined(): boolean {
    return this.authService.isLogin();
  }
}
