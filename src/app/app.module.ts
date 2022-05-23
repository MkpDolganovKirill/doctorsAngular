import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormHelperService } from './services/form-helper.service';
import { MaterialModule } from './material/material/material.module';
import { HttpService } from './services/http.service';
import { HttpClientModule } from '@angular/common/http';
import { CreateOrderComponent } from './pages/main/create-order/create-order.component';
import { SortOrdersComponent } from './pages/main/sort-orders/sort-orders.component';
import { ShowOrdersComponent } from './pages/main/show-orders/show-orders.component';
import { NotExistOrdersComponent } from './pages/main/not-exist-orders/not-exist-orders.component';
import { MainComponent } from './pages/main/main.component';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    CreateOrderComponent,
    MainComponent,
    AppComponent,
    HeaderComponent,
    SortOrdersComponent,
    ShowOrdersComponent,
    NotExistOrdersComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule,
  ],
  providers: [FormHelperService, HttpService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
