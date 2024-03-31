import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { Servicio } from 'src/app/interfaces/servicios.interfaces';
import { EstilistaService } from 'src/app/services/estilista.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-servicio',
  templateUrl: './create-servicio.component.html',
  styleUrls: ['./create-servicio.component.css']
})
export class CreateServicioComponent implements OnInit {
  //Me trae estilistas
  estilista: Estilista[] = []
  //Variable del id que recupero
  id!: string;
  sExiste: boolean = false;
  constructor(
    private fb: FormBuilder,
    private estilistaService: EstilistaService,
    private servicioService: ServiciosService,
    private route: ActivatedRoute,
    private router: Router) { }

  //Validación formulario
  myForm: FormGroup = this.fb.group({
    nombre_servicio: ['', [Validators.required, Validators.pattern(/^[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ][a-zA-Z0-9áéíóúüñÁÉÍÓÚÜÑ\s\-_]*[a-zA-ZáéíóúüñÁÉÍÓÚÜÑ]$/
    ), Validators.maxLength(30), Validators.minLength(3)]],
    duracion: ['', [Validators.required, Validators.pattern(/^[1-9]\d{0,2}$/)]],
    precio: ['', [Validators.required, Validators.min(1)]],
    estilista: [, Validators.required]
  })
  ngOnInit(): void {
    this.estilistaService.getEstilistas().subscribe(data => {
      this.estilista = data.filter(estilista => estilista.estado == true);

    });

    //Me permite recuperar el id
    this.id = this.route.snapshot.params['id']
    if (this.id) {
      this.sExiste = true
      this.servicioService.getOneServicio(this.id).subscribe((servicio: Servicio | null) => {
        this.myForm.patchValue({
          nombre_servicio: servicio?.nombre_servicio,
          duracion: servicio?.duracion,
          precio: servicio?.precio,
          // estilista: servicio.estilista.map(servicio => ({ _id: this.estilista._id }))
          estilista: servicio?.estilista.map(estilista => estilista._id)
        })
      })
    }
  }


  private manejoError(error: any): any {
    if (error.status === 400 && error.error && error.error.error) {
      return {
        icon: 'error',
        iconColor: '#f44336',
        title: 'Error de validación',
        text: error.error.error,
      };
    } else {
      return {
        icon: 'error',
        iconColor: '#f44336',
        title: 'Error',
        text: 'Error al procesar la solicitud',
      };
    }
  }

  onSave(servicio: Servicio) {
    if (this.sExiste) {
      const objetoServicio: Servicio = {
        _id: servicio._id,
        nombre_servicio: servicio.nombre_servicio.toLowerCase(),
        duracion: servicio.duracion,
        precio: servicio.precio,
        estilista: servicio.estilista,
        estado: servicio.estado
      }
      this.servicioService.actualizarServicio(this.id, objetoServicio).subscribe({
        next: (res: Servicio) => {
          Swal.fire({
            icon: 'success',
            iconColor: 'success',
            title: '¡Actualizado!',
            text: 'La información se ha actualizado exitosamente.',
          });
          this.router.navigateByUrl("/dashboard/servicio/list");
        },
        error: (error) => {
          console.log(error)
          const errorConfig = this.manejoError(error);
          Swal.fire(errorConfig);
        }
      });
    } else {
      const objetoServicio: Servicio = {
        _id: servicio._id,
        nombre_servicio: servicio.nombre_servicio.toLowerCase(),
        duracion: servicio.duracion,
        precio: servicio.precio,
        estilista: servicio.estilista,
        estado: servicio.estado
      }
      this.servicioService.createServicio(objetoServicio).subscribe({
        next: (res) => {
          Swal.fire({
            icon: 'success',
            iconColor: 'success',
            title: '¡Guardado!',
            text: 'La información se ha guardado exitosamente.',
          });
          this.router.navigateByUrl("/dashboard/servicio/list");
          this.myForm.markAllAsTouched();
        },
        error: (error) => {
          const errorConfig = this.manejoError(error);
          Swal.fire(errorConfig);
        }
      });
    }
  }


}
