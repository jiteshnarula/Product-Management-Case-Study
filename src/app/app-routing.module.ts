import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductlistComponent } from './components/productlist/productlist.component';
import { AddProductComponent } from './components/add-product/add-product.component';
import { EditproductComponent } from './components/editproduct/editproduct.component';

const routes: Routes = [
  {path:"",redirectTo:"product-list",pathMatch:"full"},
  {path:"product-list",component:ProductlistComponent},
  {path:"add-product",component:AddProductComponent},
  {path:"edit-product/:id",component:EditproductComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
