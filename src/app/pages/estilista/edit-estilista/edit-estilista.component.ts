import { EstilistaService } from 'src/app/services/estilista.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';

@Component({
  selector: 'app-edit-estilista',
  templateUrl: './edit-estilista.component.html',
  styleUrls: ['./edit-estilista.component.css']
})
export class EditEstilistaComponent implements OnInit{
  constructor(
    private servicioEstilista: EstilistaService,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router) {

  }
  id!: string;
  sExiste: boolean = false;
  myForm: FormGroup = this.fb.group({

    telefono: ['', [Validators.required,  Validators.pattern(/^\d{7,10}$/)]],
    nombre: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?: [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/),
    Validators.maxLength(20), Validators.minLength(3)]],
    apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+(?: [a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]+)*$/),
    Validators.maxLength(20), Validators.minLength(3)]],
    email: ['', [Validators.required, Validators.email, this.validarExtensionCom]],

  });

  get correo() {
    return this.myForm.get('nombre');
  }

  validarExtensionCom(control: any) {
    const email = control.value;
    if (email && !email.endsWith('.com') && !email.endsWith('.org') && !email.endsWith('.co') && !email.endsWith('.edu')) {
      return { sinExtensionCom: true };
    }
    return null;
  }
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    if (this.id) {
      this.sExiste = true
      this.servicioEstilista.getOneEstilista(this.id).subscribe((res: Estilista) => {
        this.myForm.patchValue({
          nombre: res.nombre,
          apellido: res.apellido,
          email: res.email,
          telefono: res.telefono,
          contrasena:res.contrasena

        })
      })
    }
  }

  onSave(estilista: Estilista) {



    // Actualizar usuario y/o contraseña
    const body = { ...estilista };

    if (!this.myForm.valid) {
      Swal.fire('Error', 'Complete el formulario correctamente', 'error');
      return;
    }else if (this.sExiste) {
      this.servicioEstilista.actualizarEstilista(this.id, estilista).subscribe((res: Estilista) => {
        Swal.fire({
          icon: 'success',
          iconColor: '#745af2',
          title: '¡Actualizado!',
          text: 'La información se ha actualizado exitosamente.',
        });
        this.router.navigateByUrl("/dashboard/estilista/list")
      })
    } else {
      this.servicioEstilista.createEstilista(estilista).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            iconColor: '#745af2',
            title: '¡Guardado!',
            text: 'La información se ha guardado exitosamente.',
          });
          this.router.navigateByUrl("/dashboard/estilista/list");
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
  }

