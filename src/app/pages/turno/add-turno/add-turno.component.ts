import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { EstilistaService } from 'src/app/services/estilista.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITurnos } from 'src/app/interfaces/turnos.interfaces';
import { TurnosService } from 'src/app/services/turnos.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-turno',
  templateUrl: './add-turno.component.html',
  styleUrls: ['./add-turno.component.css']
})
export class AddTurnoComponent implements OnInit {

  Estilista: Estilista[] = []
  myTime: Date = new Date();
  minDateM: Date = new Date();
  maxDateM: Date= new Date();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private turnoService: TurnosService,
    private serviceEtilista: EstilistaService) {
    this.minDateM.setHours(8, 0, 0, 0);
    this.maxDateM.setHours(12, 0, 0, 0);


  }
  ngOnInit(): void {
    this.serviceEtilista.getEstilistas().subscribe(res => {
      this.Estilista = res.filter(estilista => estilista.estado == true);
    })
  }



  myForm: FormGroup = this.fb.group({
    estilista: ['', Validators.required],
    dia: ['', Validators.required],
    inicioM: ['', Validators.required],
    finM: ['', Validators.required],
    inicioT: ['', Validators.required],
    finT: ['', Validators.required],

  })

  

  // En tu componente Angular
  onSave(body: ITurnos) {
    this.turnoService.createTurnos(body).subscribe({
        next: (res) => {
            Swal.fire({
                icon: 'success',
                iconColor: '#4caf50',
                title: '¡Guardado!',
                text: 'La información se ha guardado exitosamente.',
            });
            this.router.navigateByUrl('/dashboard/turno/list');
        },
        error: (error) => {
            console.log('HTTP Status Code:', error.status);
            
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