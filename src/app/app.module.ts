import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';
import {FormsModule} from '@angular/forms';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';

@NgModule({
  declarations: [
    AppComponent,
    ProductlistComponent,
    AddProductComponent,
    EditproductComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
