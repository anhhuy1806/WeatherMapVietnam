import { Component } from '@angular/core';
import { DashboardComponent } from '../dashboard/dashboard.component';
import { DetailComponent } from '../detail/detail.component';
import { AuthService } from 'src/app/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'angular-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent {

  constructor(private authService: AuthService, private router: Router) {
    
  }
  logOut() {
    this.authService.signOut();
    this.router.navigate(["login"])
  }
}
