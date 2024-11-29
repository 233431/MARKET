import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  categories: { id: number, name: string }[] = [];
  newCategoryName: string = '';
  editingCategory: { id: number, name: string } | null = null;

  constructor() {
    this.loadCategories();
  }

  ngOnInit(): void {}

  // Cargar categorías desde el localStorage
  loadCategories() {
    const storedCategories = localStorage.getItem('categories');
    if (storedCategories) {
      this.categories = JSON.parse(storedCategories);
    }
  }

  // Guardar categorías en el localStorage
  saveCategories() {
    localStorage.setItem('categories', JSON.stringify(this.categories));
  }

  // Crear una nueva categoría
  addCategory() {
    if (this.newCategoryName.trim()) {
      const newCategory = { id: Date.now(), name: this.newCategoryName };
      this.categories.push(newCategory);
      this.newCategoryName = '';
      this.saveCategories();
    }
  }

  // Seleccionar una categoría para edición
  editCategory(category: { id: number, name: string }) {
    this.editingCategory = { ...category };
  }

  // Guardar cambios después de editar una categoría
  saveEditCategory() {
    if (this.editingCategory) {
      const index = this.categories.findIndex(c => c.id === this.editingCategory!.id);
      if (index !== -1) {
        this.categories[index] = this.editingCategory;
        this.editingCategory = null;
        this.saveCategories();
      }
    }
  }

  // Cancelar la edición de una categoría
  cancelEdit() {
    this.editingCategory = null;
  }

  // Eliminar una categoría
  deleteCategory(id: number) {
    this.categories = this.categories.filter(category => category.id !== id);
    this.saveCategories();
  }
}
