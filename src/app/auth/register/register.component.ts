import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormGroup,FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls:  [ './register.component.css'
  ]
})
export class RegisterComponent implements OnInit{



  constructor(
  private formBuilder:FormBuilder,
  private http:HttpClient,
  private router:Router
  ){}

  myForm: FormGroup = this.formBuilder.group({
    nombre: ['', [Validators.required, Validators.pattern(/^[^\d]+$/)]],
    apellido: ['', [Validators.required, Validators.pattern(/^[^\d]+$/)]],
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', Validators.required],
    recontrasena: ['', Validators.required],
  });



ngOnInit():void{

}


submit(): void {
  if (this.myForm.valid) {
    const userData = this.myForm.value;

    // Realizar la solicitud POST al backend
    this.http.post<any>('http://localhost:5000/register', userData)
      .subscribe(
        (response) => {
          // Manejar la respuesta del backend aquí, por ejemplo, redirigir al usuario a otra página
          console.log('Usuario registrado:', response);
          // Redirigir al usuario a otra página después del registro exitoso
          this.router.navigate(['/dashboard']);
        },
        (error) => {
          // Manejar errores aquí, mostrar un mensaje de error o realizar alguna acción adicional
          console.error('Error al registrar usuario:', error);
          Swal.fire('Error', 'Hubo un problema al registrar el usuario', 'error');
        }
      );
  } else {
    // Mostrar mensajes de validación si el formulario no es válido
    Swal.fire('Error', 'Por favor, complete el formulario correctamente', 'error');
  }
}



}
