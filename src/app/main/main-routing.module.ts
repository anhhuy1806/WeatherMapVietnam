import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './detail/detail.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { MenuComponent } from './menu/menu.component';
import { MainComponent } from './main.component';




const routes: Routes = [
    {path:'',
        component: MainComponent,
children:[  
    {path : 'dashboard',component: DashboardComponent},
    {path : 'detail:/id',component: DetailComponent},
    {path : 'menu',component: MenuComponent}
]}

  
 
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }