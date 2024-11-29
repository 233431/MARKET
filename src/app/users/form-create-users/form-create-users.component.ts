import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-create-users',
  templateUrl: './form-create-users.component.html',
  styleUrls: ['./form-create-users.component.css']  // Cambiado styleUrl por styleUrls
})
export class FormCreateUsersComponent {
  loginForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private router: Router) {
    // Inicializar el formulario
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  // Método que se ejecuta cuando se envía el formulario
  onLogin() {
    const savedUserData = localStorage.getItem('userData');

    if (savedUserData) {
      const userData = JSON.parse(savedUserData);

      // Verificar si las credenciales son correctas
      if (userData.email === this.loginForm.value.email && userData.password === this.loginForm.value.password) {
        console.log('Inicio de sesión exitoso');
        this.router.navigate(['/main']); 
      } else {
        console.log('Credenciales incorrectas');
      }
    } else {
      console.log('No hay un usuario registrado');
    }
  }
}
