import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { DetailComponent } from './main/detail/detail.component';
import { LoginComponent } from './login/login.component';
import { MainComponent } from './main/main.component';
import { MenuComponent } from './main/menu/menu.component';
import { AbcComponent } from './main/abc/abc.component';
import { InfoComponent } from './info/info.component';
import { AgmCoreModule } from '@agm/core';
const routes: Routes = [
  // { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  // {path:'menu',component:MenuComponent},
  // { path: 'dashboard', component: DashboardComponent },
  // {path : 'detail/:id',component: DetailComponent},
  { path: '', component: AbcComponent },
  { path: 'login', component: LoginComponent },
  { path: 'info', component: InfoComponent },
  // {
  //   path: '',
  //   component: MainComponent,
  //   children: [
  //     { path: 'dashboard', component: DashboardComponent },
  //     { path: 'detail/:id', component: DetailComponent },
  //     { path: 'menu', component: MenuComponent }

  //   ]
  // },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), AgmCoreModule.forRoot({
    apiKey: 'GOOGLE MAPS API KEY'
  }),],
  exports: [RouterModule],
})
export class AppRoutingModule { }
