import { AuthService } from 'src/app/services/auth.service';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent {
 constructor(private recuperar:AuthService, private fb:FormBuilder, private router:Router){}

 myForm: FormGroup = this.fb.group({

  email: ['', [Validators.required, Validators.email, this.validarExtensionCom]],

});

validarExtensionCom(control:any) {
  const email = control.value;
  if (email && !email.endsWith('.com')) {
    return { sinExtensionCom: true };
  }
  return null;
}

onSave(email: any) {
  if (this.myForm.valid) {
    this.recuperar.existeEmail(email).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          iconColor: '#745af2',
          title: 'Enlace enviado',
          text: 'Se ha enviado un enlace para cambiar tu contraseña. Por favor, verifica tu correo electrónico.',
        });
        this.router.navigateByUrl('/login');
      },
      error: (error) => {
        Swal.fire({
          icon: 'error',
          iconColor: '#f25252',
          title: 'Error en la recuperación',
          text: 'El usuario no se encuentra registrado',
        });
      }
    });
  }
  
}


}


