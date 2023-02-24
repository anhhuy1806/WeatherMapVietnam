import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AgmCoreModule } from '@agm/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './main/dashboard/dashboard.component';
import { DetailComponent } from './main/detail/detail.component';
import { IonicModule } from '@ionic/angular';
import { MenuComponent } from './main/menu/menu.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MainComponent } from './main/main.component';
import { LoginComponent } from './login/login.component';
import { AbcComponent } from './main/abc/abc.component';
import { InfoComponent } from './info/info.component';
// import { MessageService } from './message.service';
import { HttpClientModule } from '@angular/common/http';
import { NgApexchartsModule } from 'ng-apexcharts';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    DetailComponent,
    MenuComponent,
    MainComponent,
    LoginComponent,
    AbcComponent,
    InfoComponent,

  ],
  imports: [
    NgApexchartsModule,
    HttpClientModule,
    FormsModule,    //added here too
    ReactiveFormsModule,
    AppRoutingModule, //added here too
    BrowserModule,
    AppRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBwWnU6khJ-oCKZnLMPyfjb_cwzBi3q2Cs",
      libraries: ["places", "geometry"]
    }),
    IonicModule.forRoot()
  ],
  exports: [
    FormsModule,
    //added here too
    ReactiveFormsModule,
    AppRoutingModule, //added here too
    BrowserModule,
    AppRoutingModule,
    // AbcComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})

export class AppModule { }
