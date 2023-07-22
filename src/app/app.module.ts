import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';
import { NoPageComponent } from './no-page/no-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SellerHomeComponent } from './seller-home/seller-home.component';
import { SellerAddProductComponent } from './seller-add-product/seller-add-product.component';
import {AccordionModule} from 'primeng/accordion';
import {MenuItem} from 'primeng/api';  
import {TableModule} from 'primeng/table';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SellerUpdateProductComponent } from './seller-update-product/seller-update-product.component';
import { ToastrModule } from 'ngx-toastr';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SearchComponent } from './search/search.component';
import {DataViewModule} from 'primeng/dataview';
import {DropdownModule} from 'primeng/dropdown';
import {PanelModule} from 'primeng/panel';
import { RatingModule } from 'primeng/rating';
import { ButtonModule } from 'primeng/button';
import { TabViewModule } from 'primeng/tabview';
import { InputTextModule } from 'primeng/inputtext';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { UserAuthComponent } from './user-auth/user-auth.component';
import { CartPageComponent } from './cart-page/cart-page.component';
import { CheckoutComponent } from './checkout/checkout.component'
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    SellerAuthComponent,
    NoPageComponent,
    SellerHomeComponent,
    SellerAddProductComponent,
    SellerUpdateProductComponent,
    SearchComponent,
    ProductDetailsComponent,
    UserAuthComponent,
    CartPageComponent,
    CheckoutComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    TableModule,
    ToastrModule.forRoot(),
    FontAwesomeModule,
    NgbModule,
    DataViewModule,
    DropdownModule,
    PanelModule,
    RatingModule,
    ButtonModule,
    TabViewModule,
    InputTextModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
