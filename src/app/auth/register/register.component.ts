import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, AbstractControl } from '@angular/forms';
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
    private authService: AuthService
  ) {}

  myForm: FormGroup = this.formBuilder.group({
    nombre: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?: [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/),
        this.atSize
      ],
    ],
    apellido: [
      '',
      [
        Validators.required,
        Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?: [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/),
        this.atSize
      ],
    ],
    email: [
      '',
      [Validators.required, Validators.email, this.validarExtensionCom],
    ],
    contrasena: [
      '',
      [Validators.required, this.atLeastOneUppercase],
      Validators.maxLength(8),
      Validators.minLength(15),
    ],
    recontrasena: ['', [Validators.required, this.atLeastOneUppercase],
    Validators.maxLength(8),
    Validators.minLength(15),],
  });

  validarExtensionCom(control: any) {
    const email = control.value;
    if (
      email &&
      !email.endsWith('.com') &&
      !email.endsWith('.org') &&
      !email.endsWith('.co') &&
      !email.endsWith('.edu')
    ) {
      return { sinExtensionCom: true };
    }
    return null;
  }

  atLeastOneUppercase(control: AbstractControl): { [key: string]: boolean } | null {
    const value: string = control.value || '';

    // Verificar si la cadena tiene al menos un carácter y si contiene al menos una letra mayúscula
    if (value.length > 0 && !/[A-Z]/.test(value)) {
      return { noUppercase: true };
    }

      // Verificar la longitud de la contraseña
    if (value.length < 8 || value.length > 15) {
    return { invalidLength: true };
    }


    return null;
  }

  atSize(control: AbstractControl): { [key: string]: boolean } | null {
    const value: string = control.value || '';


      // Verificar la longitud de los caracteres
      if (value.length < 3 || value.length > 20) {
        return { invalidSize: true };
        }

    return null;
  }

  ngOnInit(): void {}

  onSave(): void {
    const contrasena = this.myForm.get('contrasena')?.value;
    const recontrasena = this.myForm.get('recontrasena')?.value;

    if (!this.myForm.valid) {
      Swal.fire('Error', 'Complete el formulario correctamente', 'error');
      return;
    } else if (contrasena.length < 8) {
      Swal.fire('Error', 'La contraseña debe tener al menos 8 caracteres', 'error');
      return;
    }
      else if (contrasena.length > 15) {
        Swal.fire('Error', 'La contraseña debe tener maximo 15 caracteres', 'error');
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

        if (
          error.status === 400 &&
          error.error &&
          error.error.error === 'Este correo electronico ya existe'
        ) {
          Swal.fire('Error', 'Este correo electrónico ya está registrado', 'error');
        } else {
          Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
        }
      }
    );
  }
}
