import { Component, OnInit } from '@angular/core';
import { Citas } from 'src/app/interfaces/cita.interfaces';
import { CitaService } from 'src/app/services/cita.service';

import { CalendarOptions } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';


@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioCitasComponent implements OnInit {
  citas: Citas[] = [];

  calendarOptions: CalendarOptions = {
    initialView: 'dayGridMonth',
    plugins: [dayGridPlugin], // Agrega el plugin necesario
    events: [], // Los eventos se llenarán dinámicamente después de cargar las citas
  };

  constructor(private citaService: CitaService) {}

  ngOnInit(): void {
    this.cargarCitas();
  }



  cargarCitas() {
    this.citaService.getCita().subscribe((citas) => {
      this.citas = citas;
   // Imprimir por consola los datos de cada cita con formato de fecha legible
   this.citas.forEach(cita => {
    console.log('Datos de la cita:', {
      cliente: cita.cliente.nombre,
      fechaCita: new Date(cita.fechaCita).toLocaleDateString(),
      horaInicio: new Date(cita.fechaCita).toLocaleTimeString(),
      horaFin: new Date(cita.horaFinCita).toLocaleTimeString(),
      // Otros datos que desees mostrar
    });
  });


      // Actualizar eventos en el calendario
      this.calendarOptions.events = this.citas.map((cita) => {
        return {
          title: cita.cliente.nombre,
          start: cita.fechaCita,
          end: cita.horaFinCita,
        };
      });
    });
  }
}
