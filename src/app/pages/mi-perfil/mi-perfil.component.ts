import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { RolesService } from 'src/app/services/roles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';
import { EstilistaService } from 'src/app/services/estilista.service';


@Component({
  selector: 'app-mi-perfil',
  templateUrl: './mi-perfil.component.html',
  styleUrls: ['./mi-perfil.component.css']
})
export class MiPerfilComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private servicioEstilista: EstilistaService,
    private rolesService: RolesService,
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
    telefono:['', Validators.required],
    direccion:['', Validators.required],
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?: [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/),
    Validators.maxLength(20), Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?: [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/),
    Validators.maxLength(20), Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email, this.validarExtensionCom]],
    contrasena: ['', Validators.required],
    recontrasena: ['', Validators.required],
    rol: [''],
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

  validarExtensionCom(control: any) {
    const email = control.value;
    if (email && !email.endsWith('.com') && !email.endsWith('.org') && !email.endsWith('.co') && !email.endsWith('.edu')) {
      return { sinExtensionCom: true };
    }
    return null;
  }


  mostrarInfo(): void {

    const userInfo = this.authService.getUserInfo();

    // Ejemplo: Mostrar información específica según el rol de estilista
    if (this.userRoles.includes('estilista')) {

      const idEstilista = this.userId;
      // const idEstilista
    if (idEstilista) {
      this.sExiste = true
      this.servicioEstilista.getOneEstilista(idEstilista).subscribe((res: Estilista | null) => {
        if(res){
        const roleId = res.roles.length > 0 ? res.roles[0]._id : null;
        this.selectedRole = roleId;
        this.myForm.patchValue({
          nombre: res.nombre,
          apellido: res.apellido,
          email: res.email,
          telefono:res.telefono,
          rol: this.userRoles.join(', ')
        });
      }
      });
    }
    console.log("informacion del Estilista",userInfo);
    }

    // Ejemplo: Mostrar información específica según el rol de cliente
    if (this.userRoles.includes('cliente') || this.userRoles.includes('admin') ) {

      const idUsuario = this.userId
      if (idUsuario) {
        this.sExiste = true;
        this.usuarioService.getOneUsuario(idUsuario).subscribe((res: Usuario | null) => {
          if (res) {
            const roleId = res.roles.length > 0 ? res.roles[0] : null;
            this.myForm.patchValue({
              nombre: res.nombre,
              apellido: res.apellido,
              email: res.email,
              telefono:res.telefono,
              direccion:res.direccion,
              rol: this.userRoles.join(', ')
            });
          }
        });
      }
      console.log("informacion del usuario",userInfo,"rol del usuario",this.myForm.get('rol')?.value);
    }
  }
}
