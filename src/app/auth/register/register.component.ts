import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router
  ) {}

  myForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern(/^[^\d]+$/)]],
    apellido: ['', [Validators.required, Validators.pattern(/^[^\d]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', Validators.required],
    recontrasena: ['', [Validators.required]],
  });

  ngOnInit(): void {}

  submit(): void {
    const contrasena = this.myForm.get('contrasena')?.value;
    const recontrasena = this.myForm.get('recontrasena')?.value;

    if (contrasena.length < 6) {
      Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    if (contrasena !== recontrasena) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    if (this.myForm.valid) {
      const userData = this.myForm.value;

      this.http.post<any>('http://localhost:5000/register', userData).subscribe(
        (response) => {
          console.log('Usuario registrado:', response);
          Swal.fire('Éxito', 'Usuario registrado correctamente', 'success');
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          console.error('Error al registrar usuario:', error);

          if (error.status === 400 && error.error && error.error.error === 'Este correo electronico ya existe') {
            Swal.fire('Error', 'Este correo electrónico ya está registrado', 'error');
          } else if (error.status === 400 && error.error && error.error.error) {
            // Manejar errores de validación específicos de la API
            Swal.fire('Error de validación', error.error.error, 'error');
          } else {
            Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
          }
        }
      );
    } else {
      // Recorrer los controles del formulario para encontrar errores específicos
      Object.keys(this.myForm.controls).forEach((key) => {
        const control = this.myForm.get(key);
        if (control?.invalid) {
          const errors = control.errors;
          // Muestra un mensaje específico para cada tipo de error
          if (errors?.['required']) {
            Swal.fire('Error', `El campo ${key} es obligatorio`, 'error');
          } else if (errors?.['email']) {
            Swal.fire('Error', `El correo electrónico en el campo ${key} no es válido`, 'error');
          } else if (errors?.['pattern']) {
            Swal.fire('Error', `El formato del campo ${key} es inválido`, 'error');
          }
          // Puedes agregar más lógica para manejar otros tipos de errores según sea necesario
        }
      });
    }
  }
}

