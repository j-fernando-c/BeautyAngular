import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { EstilistaService } from 'src/app/services/estilista.service';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private estilistaService: EstilistaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
  ) { }

  userRoles: string[] = [];
  id!: string;
  sExiste: boolean = false;
  userId: string | null = null;
  private jwtHelper = new JwtHelperService();
  private rolesSubscription: Subscription;
  selectedRole: string | null = null;


  myForm: FormGroup = this.fb.group({
    oldcontrasena: ['',Validators.required],
    newcontrasena: ['', Validators.required],
    recontrasena: ['', Validators.required],
  });




  ngOnInit(): void {
    this.loadUserRoles();
    this.rolesSubscription = this.authService.getRolesObservable().subscribe((roles) => {
      this.userRoles = roles;
    });
    this.getUserId();
    this.mostrarInfo();

  }

  getUserInfo(): { _id: string, roles: string[] } | null {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken = this.jwtHelper.decodeToken(token);
      return decodedToken;
    }
    return null;
  }

  private loadUserRoles(): void {
    const userInfo = this.authService.getUserInfo();
    if (userInfo) {
      this.userRoles = userInfo.roles;
    }
  }

  getUserId(): void {
    const userInfo = this.authService.getUserInfo();
    this.userId = userInfo ? userInfo._id : null;
  }

  mostrarInfo(): void {

    const userInfo = this.authService.getUserInfo();

    if (this.userRoles.includes('estilista')) {
      // Obtener información del estilista
      this.estilistaService.getOneEstilista(this.userId!).subscribe((res: any) => {
        this.sExiste = !!res;
        if (this.sExiste) {
          this.myForm.patchValue({
            contrasena: res.contrasena
          });
        }
      });
    }
    // Ejemplo: Mostrar información específica según el rol de cliente
    if (this.userRoles.includes('cliente') || this.userRoles.includes('admin') ) {

      const idUsuario = this.userId
      if (idUsuario) {
        this.sExiste = true;
        this.usuarioService.getOneUsuario(idUsuario).subscribe((res: Usuario | null) => {
          if (res) {
            this.myForm.patchValue({
              contrasena: res.contrasena
            });
          }
        });
      }
    }
  }



  onSave() {
    const oldcontrasena = this.myForm.get('oldcontrasena')?.value;
    const newcontrasena = this.myForm.get('newcontrasena')?.value;
    const recontrasena = this.myForm.get('recontrasena')?.value;

    if (!this.userId) {
      console.error("ID del usuario no disponible.");
      return;
    }

    if (!this.myForm.valid) {
      Swal.fire('Error', 'Complete el formulario correctamente', 'error');
      return;
    }else if (newcontrasena.length < 6) {
      Swal.fire('Error', 'La nueva contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }else if (recontrasena.length < 6) {
      Swal.fire('Error', 'La nueva contraseña debe tener al menos 6 caracteres', 'error');
      return;
    } else if (newcontrasena !== recontrasena) {
    Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
    return;
    }else if (this.sExiste &&  this.userRoles.includes('cliente') || this.userRoles.includes('admin')) {
      console.log("BUCLE USUARIO")
      this.usuarioService.actualizarContraseña(this.userId, oldcontrasena, newcontrasena).subscribe((res: Usuario) => {
        Swal.fire({
          icon: 'success',
          iconColor: '#745af2',
          title: '¡Actualizado!',
          text: 'La información se ha actualizado exitosamente.',
        });
        this.router.navigateByUrl("/dashboard/perfil");
      },
      (error) => {
        if (error.status === 401) {
          Swal.fire('Error', 'La contraseña antigua no coincide', 'error');
        }
        if (error.status === 500) {
          Swal.fire('Error', 'Error en el servidor', 'error');
        }
      }
      );
    }
    else if(this.sExiste &&  this.userRoles.includes('estilista')){
      console.log("BUCLE ESTILISTA")
      const service = this.userRoles.includes('estilista') ? this.estilistaService : this.usuarioService;
      service.actualizarContraseña(this.userId, oldcontrasena, newcontrasena).subscribe(
        (res: any) => {
          Swal.fire({
            icon: 'success',
            iconColor: '#745af2',
            title: '¡Actualizado!',
            text: 'La información se ha actualizado exitosamente.',
          });
        },
        (error) => {
          if (error.status === 401) {
            Swal.fire('Error', 'La contraseña antigua no coincide', 'error');
          }
          if (error.status === 500) {
            Swal.fire('Error', 'Error en el servidor', 'error');
          }
        }
      )
    }
  }
}



