import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { NoPageComponent } from './no-page/no-page.component';
import { SellerAuthComponent } from './seller-auth/seller-auth.component';

const routes: Routes = [
  { path:'', component:HomeComponent },
  { path:'seller-auth', component:SellerAuthComponent },
  { path:'**', component:NoPageComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
