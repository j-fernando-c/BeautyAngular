import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { ITurnos } from 'src/app/interfaces/turnos.interfaces';
import { EstilistaService } from 'src/app/services/estilista.service';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-turno',
  templateUrl: './edit-turno.component.html',
  styleUrls: ['./edit-turno.component.css']
})
export class EditTurnoComponent implements OnInit {

  Estilista: Estilista[] = []
  sExiste: boolean;
  id!: string;
  disable:boolean=true;

  constructor(private fb: FormBuilder,
    private route: Router,
    private turnoService: TurnosService,
    private serviceEtilista: EstilistaService,
    private router: ActivatedRoute) { }


  myForm: FormGroup = this.fb.group({
    estilista: [''],
    dia: ['', Validators.required],
    inicioM: ['', Validators.required],
    finM: ['', Validators.required],
    inicioT: ['', Validators.required],
    finT: ['', Validators.required],

  })
  ngOnInit(): void {

    this.serviceEtilista.getEstilistas().subscribe(res => {
      this.Estilista = res.filter(estilista => estilista.estado == true);
    })

    //Me permite recuperar el id
    this.id = this.router.snapshot.params['id']
    if (this.id) {
      this.sExiste = true
      this.turnoService.getOneTurno(this.id).subscribe((turno: ITurnos) => {
        this.myForm.patchValue({
          estilista:turno.estilista._id,
          dia: turno.dia,
          inicioM: turno.inicioM,
          finM: turno.finM,
          inicioT: turno.inicioT,
          finT: turno.finT,
        })
      })
    }
  }

  onSave(body: ITurnos) {
    this.turnoService.actualizarTurno(this.id, body).subscribe({
      next: (res) => {

        Swal.fire({
          icon: 'success',
          iconColor: '#4caf50',
          title: '¡Actualizado',
          text: 'La información se ha actualizado exitosamente',
        });
        this.route.navigateByUrl('/dashboard/turno/list');
      },
      error: (error) => {
        // Muestra mensajes de error específicos usando SweetAlert
        if (error.status === 400 && error.error && error.error.error) {
          Swal.fire({
            icon: 'error',
            iconColor: '#f44336',
            title: 'Error de validación',
            text: error.error.error,
          });
        } else {
          Swal.fire({
            icon: 'error',
            iconColor: '#f44336',
            title: 'Error',
            text: 'Error al procesar la solicitud',
          });
        }
      }

    });
  }

}
