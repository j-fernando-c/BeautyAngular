import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CitasService } from 'src/app/services/citas.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agregar-cita',
  templateUrl: './agregar-cita.component.html',
  styleUrls: ['./agregar-cita.component.css']
})
export class AgregarCitaComponent implements OnInit {
  citaForm: FormGroup;

  constructor(private fb: FormBuilder, private citasServices:CitasService, private router:Router) {}

  ngOnInit(): void {
    this.citaForm = this.fb.group({
      fecha: ['', Validators.required],
      estilista: ['', Validators.required],
      servicio: ['', Validators.required],
    });
  }

  agregarCita() {
    if (this.citaForm.valid) {
      // Obtener los valores del formulario
      const nuevaCita = this.citaForm.value;

      // Llamar al servicio para agregar la nueva cita
      this.citasServices.createCita(nuevaCita).subscribe(() => {
        // Cerrar el formulario o realizar otras acciones
        // Por ejemplo, puedes navegar de nuevo al calendario
        this.router.navigate(['/dashboard/cita/agregar']);
      });
    }
  }
}

