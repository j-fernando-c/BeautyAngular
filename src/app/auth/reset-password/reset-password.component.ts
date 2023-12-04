import { AuthService } from 'src/app/services/auth.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { id } from '@swimlane/ngx-charts';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  id: string;
  token: string;
  constructor(private route: ActivatedRoute, 
    private auth: AuthService, 
    private fb: FormBuilder, 
    private router:Router) {


  }
  ngOnInit(): void {
    //Para obtener parametros de ruta
    this.route.params.subscribe(valor => {
      this.id = valor['id'];
      this.token = valor['token']
    })
  }


  myForm: FormGroup = this.fb.group({
    contrasena: ['', [Validators.required, Validators.minLength(6)]]
  })


  onSave(body: any) {
    this.auth.enviarNuevaContrasena(this.id, this.token, body).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          iconColor: '#4caf50',
          title: 'Contraseña actualizada',
          text: 'Tu contraseña se ha actualizado con éxito. Ahora puedes iniciar sesión con tu nueva contraseña.',
        });
        this.router.navigateByUrl('/login');
      },
    })
  }
}



