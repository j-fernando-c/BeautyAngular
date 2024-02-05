import { Component,OnInit  } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CitasService } from 'src/app/services/citas.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Citas } from 'src/app/interfaces/citas';

@Component({
  selector: 'app-detalle-cita',
  templateUrl: './detalle-cita.component.html',
  styleUrls: ['./detalle-cita.component.css']
})
export class DetalleCitaComponent implements OnInit{
  citaId: string;
  cita: Citas;
  citaForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private citasService: CitasService,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    // Obtener el ID de la cita de la URL
    this.citaId = this.route.snapshot.params['id'];

    // Obtener la cita
    this.citasService.getCitaById(this.citaId).subscribe((cita) => {
      this.cita = cita;

      // Inicializar el formulario con los datos de la cita
      this.citaForm = this.fb.group({
        fecha: [cita.fecha, Validators.required],
        estilista: [cita.estilista, Validators.required],
        servicio: [cita.servicio, Validators.required],
      });
    });
  }

  // Método para actualizar la cita
  editarCita() {
    const updatedCita: Citas = {
      ...this.cita,
      ...this.citaForm.value,
    };

    this.citasService.updateCita(this.citaId, updatedCita).subscribe(() => {
      // Redirigir a la lista de citas después de editar
      this.router.navigate(['/dashboard/calendario-agenda']);
    });
  }

  // Método para eliminar la cita
  eliminarCita() {
    this.citasService.eliminarCita(this.citaId).subscribe(() => {
      // Redirigir a la lista de citas después de eliminar
      this.router.navigate(['/dashboard/cita/agregar']);
    });
  }
}
