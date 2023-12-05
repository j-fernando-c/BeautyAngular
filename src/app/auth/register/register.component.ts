import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
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
    private router: Router,
    private authService:AuthService
  ) {}

  myForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern(/^[^\d]+$/)]],
    apellido: ['', [Validators.required, Validators.pattern(/^[^\d]+$/)]],
    email: ['', [Validators.required, Validators.email, this.validarExtensionCom]],
    contrasena: ['', Validators.required],
    recontrasena: ['', [Validators.required,]],
  });

  validarExtensionCom(control:any) {
    const email = control.value;
    if (email && !email.endsWith('.com')) {
      return { sinExtensionCom: true };
    }
    return null;
  }

  ngOnInit(): void {}

  onSave(): void {
    const contrasena = this.myForm.get('contrasena')?.value;
    const recontrasena = this.myForm.get('recontrasena')?.value;

    if (!this.myForm.valid) {
      Swal.fire('Error', 'Complete el formulario', 'error');
      return;
    } else if (contrasena.length < 6) {
      Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    } else if (contrasena !== recontrasena) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    }

    const userData = this.myForm.value;
    this.authService.register(userData).subscribe(
      (response) => {
        // console.log('Usuario registrado:', response);
        localStorage.setItem('token', response.token);
        Swal.fire('Éxito', 'Usuario registrado correctamente', 'success');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error al registrar usuario:', error);

        if (error.status === 400 && error.error && error.error.error === 'Este correo electronico ya existe') {
          Swal.fire('Error', 'Este correo electrónico ya está registrado', 'error');
        } else {
          Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
        }
      }
    );
  }
}
