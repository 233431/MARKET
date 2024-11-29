import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form-users',
  templateUrl: './form-users.component.html',
  styleUrl: './form-users.component.css'
})
export class FormUsersComponent {

  registerForm: FormGroup;

  constructor (private formBuilder: FormBuilder,private router:Router){
    this.registerForm=this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    })
  } 

  onSubmit() {
    if (this.registerForm.valid) {
      localStorage.setItem('userData', JSON.stringify(this.registerForm.value));
      console.log('Usuario registrado y guardado en localStorage');
      this.router.navigate(['/main'])
    }
  }

  onRegister() {
    const savedUserData = localStorage.getItem('userData');
    if (savedUserData) {
      console.log('El usuario ya está registrado');
    } else {
      // Si no está registrado, registrar al usuario y guardar los datos
      localStorage.setItem('userData', JSON.stringify(this.registerForm.value));
      console.log('Usuario registrado exitosamente');
    }
  }


}
