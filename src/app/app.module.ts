import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule, DatePipe } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material/material/material.module';

import { FormHelperService } from './services/form-helper.service';
import { ApiService } from './services/api.service';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { CreateOrderComponent } from './pages/main/create-order/create-order.component';
import { SortOrdersComponent } from './pages/main/sort-orders/sort-orders.component';
import { ShowOrdersComponent } from './pages/main/show-orders/show-orders.component';
import { MainComponent } from './pages/main/main.component';
import { EditDialogComponent } from './components/edit-dialog/edit-dialog.component';
import { DeleteDialogComponent } from './components/delete-dialog/delete-dialog.component';

@NgModule({
  declarations: [
    CreateOrderComponent,
    MainComponent,
    AppComponent,
    HeaderComponent,
    SortOrdersComponent,
    ShowOrdersComponent,
    EditDialogComponent,
    DeleteDialogComponent,
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
  providers: [FormHelperService, ApiService, DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
