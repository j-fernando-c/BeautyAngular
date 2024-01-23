import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { EstilistaService } from 'src/app/services/estilista.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ITurnos } from 'src/app/interfaces/turnos.interfaces';
import { TurnosService } from 'src/app/services/turnos.service';

import { BsLocaleService } from 'ngx-bootstrap/datepicker';
import { defineLocale } from 'ngx-bootstrap/chronos';
import { esLocale } from 'ngx-bootstrap/locale';
import { TimepickerConfig } from 'ngx-bootstrap/timepicker';
import { UntypedFormControl, UntypedFormGroup } from '@angular/forms';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-turno',
  templateUrl: './add-turno.component.html',
  styleUrls: ['./add-turno.component.css']
})
export class AddTurnoComponent implements OnInit {
  Estilista: Estilista[] = [];

  time: Date = new Date();



  constructor(private fb: FormBuilder, private router: Router,
    private turnoService: TurnosService,
    private serviceEstilista: EstilistaService,
    private localeService: BsLocaleService
  ) {
    defineLocale('es', esLocale);
    this.localeService.use('es');
  }

  ngOnInit(): void {
    this.serviceEstilista.getEstilistas().subscribe(res => {
      this.Estilista = res.filter(estilista => estilista.estado == true);
    });
  }



  myForm: FormGroup = this.fb.group({
    estilista: ['', [Validators.required]],
    dia: ['', [Validators.required]],
    inicioM: [this.time, [Validators.required]],
    finM: [this.time, [Validators.required]],
    inicioT: [this.time, [Validators.required]],
    finT: [this.time, [Validators.required]],
  }, {
    validators: [
      // Validación personalizada para comparar horas de inicio y fin
      (formGroup: FormGroup) => {
        const inicioM = formGroup.get('inicioM')?.value;
        const finM = formGroup.get('finM')?.value;
        const inicioT = formGroup.get('inicioT')?.value;
        const finT = formGroup.get('finT')?.value;

        if (inicioM >= finM || inicioT >= finT) {
          return { horasInvalidas: true };
        }
        return null;
      }
    ]
  });

  onSave(body: ITurnos) {
    this.turnoService.createTurnos(body).subscribe({
      next: (res) => {
        Swal.fire({
          icon: 'success',
          iconColor: '#4caf50',
          title: '¡Guardado',
          text: 'La información se ha guardado exitosamente',
        });
        this.router.navigateByUrl('/dashboard/turno/list');
      },
      error: (error) => {

      }
    });
  }
}
