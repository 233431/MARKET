import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainComponent } from './users/user-dashboard/main.component';
import { FormUsersComponent } from './users/form-users/form-users.component';
import { FormCreateUsersComponent } from './users/form-create-users/form-create-users.component';
import { FormAddProductComponent } from './products/form-add-product/form-add-product.component';
import { CarritoComponent } from './products/carrito/carrito.component';

const routes: Routes = [
  {path:'main',component:MainComponent},
  {path:'form',component:FormUsersComponent},
  {path:'add-products',component:FormAddProductComponent},
  { path: 'carrito', component: CarritoComponent },
  {path:'',component:FormCreateUsersComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
