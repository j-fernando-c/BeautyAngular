import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Role } from 'src/app/interfaces/role.interfaces';
import { RolesService } from 'src/app/services/roles.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-usuario',
  templateUrl: './create-usuario.component.html',
  styleUrls: ['./create-usuario.component.css']
})
export class CreateUsuarioComponent implements OnInit {

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
    nombre: ['', [Validators.required, Validators.pattern(/^[^\d]+$/)]],
    apellido: ['', [Validators.required, Validators.pattern(/^[^\d]+$/)]],
    email: ['', [Validators.required, Validators.email, this.validarExtensionCom]],
    contrasena: ['', Validators.required],
    roles: ['', Validators.required]
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

  ngOnInit(): void {
    this.rolesService.getRoles().subscribe(data => {
      this.roles = data;
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
            roles: res.roles.map(role => ({ _id: role._id, nombre: role.nombre }))
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
    if (!this.myForm.valid) {
      Swal.fire('Error', 'Complete el formulario correctamente', 'error');
      return;
    } else if (contrasena.length < 6) {
      Swal.fire('Error', 'La contraseña debe tener al menos 6 caracteres', 'error');
      return;
    } else if (this.sExiste) {
      this.usuarioService.actualizarUsuario(this.id, usuario).subscribe((res: Usuario) => {
        Swal.fire({
          icon: 'success',
          iconColor: '#745af2',
          title: '¡Actualizado!',
          text: 'La información se ha actualizado exitosamente.',
        });
        this.router.navigateByUrl("/dashboard/usuarios/list");
      });
    } else {
      this.usuarioService.createUsuario(usuario).subscribe((res: Usuario) => {
        Swal.fire({
          icon: 'success',
          iconColor: '#745af2',
          title: '¡Guardado!',
          text: 'La información se ha guardado exitosamente.',
        });
        this.router.navigateByUrl("/dashboard/usuarios/list");
      });
    }
  }
}
