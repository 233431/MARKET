import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css']
})
export class ListProductsComponent {
  products: any[] = [];
  filteredProducts: any[] = [];
  completedProducts: Set<string> = new Set();
  budget: number = 0;
  total: number = 0;
  budgetExceeded: boolean = false;
  selectedCategory: string = 'Todos';
  categories: string[] = ['Todos', 'Alimentos', 'Limpieza', 'Bebidas'];

  // Historial de listas
  listHistory: { date: Date, products: any[], total: number }[] = [];
  totalHistory: number = 0;

  constructor(private router: Router) {
    this.loadProducts();
    this.loadListHistory();
    this.calculateTotal();
    this.calculateTotalHistory();
  }

  loadProducts() {
    const storedProducts = localStorage.getItem('products');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
    this.filterByCategory();
    this.calculateTotal();
  }

  loadListHistory() {
    const storedHistory = localStorage.getItem('listHistory');
    this.listHistory = storedHistory ? JSON.parse(storedHistory) : [];
    this.calculateTotalHistory();
  }

  saveListToHistory() {
    // Guardar la lista en el historial
    this.listHistory.push({
      date: new Date(),
      products: [...this.products],
      total: this.total,
    });
    localStorage.setItem('listHistory', JSON.stringify(this.listHistory));
    this.calculateTotalHistory();
  
    // Guardar productos y total en localStorage para el carrito
    localStorage.setItem('cartProducts', JSON.stringify(this.products));
    localStorage.setItem('cartTotal', JSON.stringify(this.total));
  
    // Redirigir a la vista del carrito
    this.router.navigate(['/carrito']);
  }
  

  clearCurrentList() {
    this.products = [];
    this.filteredProducts = [];
    this.completedProducts.clear();
    this.total = 0;
    this.budgetExceeded = false;
    localStorage.removeItem('products');
  }

  toggleComplete(productName: string) {
    if (this.completedProducts.has(productName)) {
      this.completedProducts.delete(productName);
    } else {
      this.completedProducts.add(productName);
    }
  }

  isCompleted(productName: string): boolean {
    return this.completedProducts.has(productName);
  }

  addProduct() {
    this.router.navigate(['/add-products']);
  }

  removeProduct(productName: string) {
    this.products = this.products.filter(product => product.nameProduct !== productName);
    localStorage.setItem('products', JSON.stringify(this.products));
    this.filterByCategory();
    this.calculateTotal();
  }

  setBudget(budget: number) {
    this.budget = budget;
    this.checkBudgetExceeded();
  }

  calculateTotal() {
    this.total = this.products.reduce((acc, product) => acc + product.price, 0);
    this.checkBudgetExceeded();
  }

  checkBudgetExceeded() {
    this.budgetExceeded = this.total > this.budget;
  }

  filterByCategory() {
    this.filteredProducts = this.selectedCategory === 'Todos'
      ? this.products
      : this.products.filter(product => product.category === this.selectedCategory);
    this.calculateTotal();
  }

  chunkedProducts(arr: any[]) {
    const chunkSize = 1;
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  }

  calculateTotalHistory() {
    this.totalHistory = this.listHistory.reduce((acc, list) => acc + list.total, 0);
  }

  // Nueva función para eliminar una lista del historial
  removeListFromHistory(index: number) {
    this.listHistory.splice(index, 1);
    localStorage.setItem('listHistory', JSON.stringify(this.listHistory));
    this.calculateTotalHistory();
  }

  // Nueva función para cargar una lista del historial
  loadListFromHistory(list: { date: Date, products: any[], total: number }) {
    this.products = [...list.products];
    this.total = list.total;
    this.calculateTotal();
    this.completedProducts.clear(); // Reiniciar productos completados
    localStorage.setItem('products', JSON.stringify(this.products));
    this.filterByCategory();
  }
}
