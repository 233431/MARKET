import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListProductsComponent } from './list-products/list-products.component';
import { FormAddProductComponent } from './form-add-product/form-add-product.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CategoriesComponent } from './categories/categories.component';



@NgModule({
  declarations: [
    ListProductsComponent,
    FormAddProductComponent,
    CategoriesComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports:[
    ListProductsComponent,
    FormAddProductComponent,
    CategoriesComponent
  ]
})
export class ProductsModule { }
