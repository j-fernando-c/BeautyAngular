import { Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import Swal from 'sweetalert2';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: [ './login.component.css'
  ]
})
export class LoginComponent implements OnInit {


  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService,
  ) {}

  private jwtHelper = new JwtHelperService();
  private rolesSubscription: Subscription;
  userRoles: string[] = [];
  id!: string;
  userId: string | null = null;



  myForm: FormGroup = this.formBuilder.group({
    email: ['', [Validators.required, Validators.email]],
    contrasena: ['', Validators.required],
  });

    ngOnInit(): void {
      this.loadUserRoles();
      this.rolesSubscription = this.authService.getRolesObservable().subscribe((roles) => {
        this.userRoles = roles;
      });
      this.getUserId();
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


  loading: boolean = false;

  onSave(): void {
    if (!this.myForm.valid) {
      Swal.fire('Error', 'Complete el formulario', 'error');
      return;
    }

    const { email, contrasena } = this.myForm.value;
    this.loading = true;

    this.authService.login(email, contrasena).subscribe(
      (response: any) => {
        // console.log('Usuario logeado:', response);
        const token = response.token;
        localStorage.setItem('token', token);

        // Obtener roles del usuario
        const roles = this.authService.getUserRoles();
        // console.log('Token JWT:', token);
        const userInfo = this.authService.getUserInfo();

        // Redirigir según el rol
        if (userInfo && userInfo.roles && userInfo.roles.includes('cliente')) {
          this.router.navigate([`/dashboard/cita/nuevo/cliente/${userInfo._id}`]);
        }else if(userInfo && userInfo.roles && userInfo.roles.includes('estilista')){
          this.router.navigate([`/dashboard/turno/estilista/${userInfo._id}`]);

        } else {
          this.router.navigate(['/dashboard']);
        }
        Swal.fire('Éxito', 'Inicio de sesión exitoso', 'success');

      },
      (error) => {
        if (error.status === 403) {
          Swal.fire('Error', 'Credenciales invalidas', 'error');
        } else if (error.status === 401) {
          Swal.fire('Error', 'Contraseña incorrecta', 'error');
        } else if (error.status === 400) {
          Swal.fire('Error', 'El usuario está inactivo', 'error');
        } else {
          Swal.fire('Error', 'Error en la autenticación', 'error');
        }
      }
    ).add(() => this.loading = false);
  }
}
