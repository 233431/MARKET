import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-form-add-product',
  templateUrl: './form-add-product.component.html',
  styleUrls: ['./form-add-product.component.css']
})
export class FormAddProductComponent {
  formProduct: FormGroup;

  // Array de categorías para el selector
  categories: string[] = ['Alimentos', 'Limpieza', 'Bebidas'];

  constructor(private formBuilder: FormBuilder, private router: Router) {
    this.formProduct = this.formBuilder.group({
      nameProduct: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', Validators.required],
      category: ['', Validators.required]  // Nuevo campo para la categoría
    });
  }

  onAddProduct() {
    if (this.formProduct.valid) {

      const existingProducts = localStorage.getItem('products');
      let productsArray = existingProducts ? JSON.parse(existingProducts) : [];

      productsArray.push(this.formProduct.value);

      localStorage.setItem('products', JSON.stringify(productsArray));

      alert("Producto agregado exitosamente");
      this.router.navigate(['/main']); 
    }
  }
}
