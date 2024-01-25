import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Role } from 'src/app/interfaces/role.interfaces';
import { RolesService } from 'src/app/services/roles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-usuario',
  templateUrl: './edit-usuario.component.html',
  styleUrls: ['./edit-usuario.component.css']
})
export class EditUsuarioComponent implements OnInit {

  constructor(
    private usuarioService: UsuarioService,
    private rolesService: RolesService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router
  ) { }


  roles: Role[] = [];
  id!: string;
  sExiste: boolean = false;
  myForm: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?: [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/),
    Validators.maxLength(20), Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?: [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/),
    Validators.maxLength(20), Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email, this.validarExtensionCom]],
    roles: [[], Validators.required]
  });


  get correo() {
    return this.myForm.get('nombre');
  }

  validarExtensionCom(control: any) {
    const email = control.value;
    if (email && !email.endsWith('.com') && !email.endsWith('.co')) {
      return { sinExtensionCom: true };
    }
    return null;
  }

  selectedRole: string | null = null;

  ngOnInit(): void {
    this.rolesService.getRoles().subscribe(data => {
      this.roles = data.filter(role => role.nombre !== 'estilista');
      console.log('Roles:', this.roles);
    });

    this.id = this.route.snapshot.params['id'];
    if (this.id) {
      this.sExiste = true;
      this.usuarioService.getOneUsuario(this.id).subscribe((res: Usuario | null) => {
        if (res) {
          const roleId = res.roles.length > 0 ? res.roles[0]._id : null;
          this.selectedRole = roleId;
          this.myForm.patchValue({
            nombre: res.nombre,
            apellido: res.apellido,
            email: res.email,
            roles: roleId,
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


    // Actualizar usuario y/o contraseña
    const body = { ...usuario };

    if (!this.myForm.valid) {
      Swal.fire('Error', 'Complete el formulario correctamente', 'error');
      return;
    } else if (this.sExiste) {

      this.usuarioService.actualizarUsuario(this.id, body).subscribe((res: Usuario) => {
        Swal.fire({
          icon: 'success',
          iconColor: '#745af2',
          title: '¡Actualizado!',
          text: 'La información se ha actualizado exitosamente.',
        });
        this.router.navigateByUrl("/dashboard/usuarios/list");
      });
    }
  }
}
