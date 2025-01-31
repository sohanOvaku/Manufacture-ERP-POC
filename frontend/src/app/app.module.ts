import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SidebarComponent } from './ui-element/sidebar/sidebar.component';
import { HeaderComponent } from './ui-element/header/header.component';
import { FooterComponent } from './ui-element/footer/footer.component';
import { ToastrModule } from 'ngx-toastr';
import { HashLocationStrategy } from '@angular/common';
import { ApiInterceptor } from './services/api.interceptor';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BarChartComponent } from './dashboard/bar-chart/bar-chart.component';
import { LineChartComponent } from './dashboard/line-chart/line-chart.component';
import { LoginComponent } from './modules/auth/login/login.component';
import { LineChartNickelComponent } from './dashboard/line-chart-nickel/line-chart-nickel.component';

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    BarChartComponent,
    LineChartComponent,
    LineChartNickelComponent,
    // LoginComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
		ToastrModule.forRoot(),
    FormsModule,
		ReactiveFormsModule,
		HttpClientModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: ApiInterceptor, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
