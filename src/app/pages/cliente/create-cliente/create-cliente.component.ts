import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { Role } from 'src/app/interfaces/role.interfaces';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import { RolesService } from 'src/app/services/roles.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private clienteServicio: ClienteService,
    private rolesService:RolesService,
    private route: ActivatedRoute,
    private router: Router,
    private usuarioService:UsuarioService
  ) {}

  id!: string;
  sExiste: boolean = false;
  roles:Role[]=[]
  myForm: FormGroup = this.fb.group({
    telefono: ['', [Validators.required,  Validators.pattern(/^[1-9]\d{6,9}$/
    )]],
    direccion: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, this.validarExtensionCom]],
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?: [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/),
    Validators.maxLength(20), Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?: [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/),
    Validators.maxLength(20), Validators.minLength(3)]],
    contrasena: ['', Validators.required],
    recontrasena: ['', Validators.required],
    roles: ['cliente', Validators.required]
  });


  ngOnInit(): void {
    this.rolesService.getRoles().subscribe(data => {
      this.roles = data.filter(role => role.nombre !== 'estilista' && role.nombre!=='admin');
    });
    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.sExiste = true;
      this.usuarioService.getOneUsuario(this.id).subscribe((res: Usuario | null) => {
        if (res) {
          this.myForm.patchValue({
            nombre: res.nombre,
            apellido: res.apellido,
            email: res.email,
            roles: res.roles.map(role => ({ _id: role._id, nombre: role.nombre })),
            contrasena: res.contrasena
          });
        }
      });
    }
  }

  onSave(usuario: Usuario) {
    console.log('Form Data:', usuario);
    if (typeof usuario.roles === 'string') {
      usuario.roles = [{ _id: usuario.roles, nombre: usuario.roles }];
    }
    const contrasena = this.myForm.get('contrasena')?.value;
    const recontrasena = this.myForm.get('recontrasena')?.value;

    if (contrasena && contrasena.length < 6) {
      Swal.fire('Error', 'La nueva contraseña debe tener al menos 6 caracteres', 'error');
      return;
    }

    // Actualizar usuario y/o contraseña
    const body = { ...usuario, roles: usuario.roles.map(role => role.nombre), contrasena: contrasena || contrasena };
    console.log('Body antes de enviar:', JSON.stringify(body));

    if (!this.myForm.valid) {
      Swal.fire('Error', 'Complete el formulario correctamente', 'error');
      return;
    } else if (contrasena.length < 6) {
      Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    } else if (contrasena !== recontrasena) {
      Swal.fire('Error', 'Las contraseñas no coinciden', 'error');
      return;
    } else {
      this.usuarioService.createUsuario(usuario).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            iconColor: '#745af2',
            title: '¡Guardado!',
            text: 'La información se ha guardado exitosamente.',
          });
          this.router.navigateByUrl("/dashboard/cliente/list");
        },
        error: (error) => {
          Swal.fire({
            icon: 'error',
            iconColor: '#f25252',
            title: 'Error en la recuperación',
            text: 'El correo ya existe',
          });
        }
      });
    }
  }



  // Función de validación personalizada para verificar la extensión .com en el correo electrónico
  validarExtensionCom(control:any) {
    const email = control.value;
    if (email && !email.endsWith('.com') && !email.endsWith('.org') && !email.endsWith('.co') && !email.endsWith('.edu')) {
      return { sinExtensionCom: true };
    }
    return null;
  }
}
