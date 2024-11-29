import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-carrito',
  templateUrl: './carrito.component.html',
  styleUrls: ['./carrito.component.css']
})
export class CarritoComponent implements OnInit {
  products: any[] = [];
  total: number = 0;
  paymentData: { cardNumber: string; expirationDate: string; cvv: string } = {
    cardNumber: '',
    expirationDate: '',
    cvv: '',
  };
  estimatedArrival: Date | null = null;

  constructor(private router: Router) {}

  ngOnInit(): void {
    this.loadCartData();
    this.calculateEstimatedArrival();
  }

  // Cargar datos del carrito desde localStorage
  loadCartData() {
    const storedProducts = localStorage.getItem('cartProducts');
    const storedTotal = localStorage.getItem('cartTotal');
    this.products = storedProducts ? JSON.parse(storedProducts) : [];
    this.total = storedTotal ? JSON.parse(storedTotal) : 0;
  }

  // Guardar datos del carrito en localStorage
  saveCartData() {
    localStorage.setItem('cartProducts', JSON.stringify(this.products));
    localStorage.setItem('cartTotal', JSON.stringify(this.total));
  }

  calculateEstimatedArrival() {
    const now = new Date();
    this.estimatedArrival = new Date(now.getTime() + 2 * 60 * 60 * 1000); // 2 horas después
  }

  processPayment() {
    if (this.paymentData.cardNumber && this.paymentData.expirationDate && this.paymentData.cvv) {
      alert('Pago procesado exitosamente.');

      // Limpiar el carrito después del pago
      localStorage.removeItem('cartProducts');
      localStorage.removeItem('cartTotal');

      // Redirigir al 'main' después de procesar el pago
      this.router.navigate(['/main'], {
        state: {
          products: this.products,
          estimatedArrival: this.estimatedArrival,
        },
      });
    } else {
      alert('Por favor, complete todos los campos del formulario.');
    }
  }
}
