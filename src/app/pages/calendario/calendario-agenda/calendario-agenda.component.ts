import { CitasService } from '../../../services/citas.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CalendarOptions, EventApi } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';
import esLocale from '@fullcalendar/core/locales/es';
import interactionPlugin from '@fullcalendar/interaction';
import { Citas } from 'src/app/interfaces/citas';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FullCalendarComponent } from '@fullcalendar/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-calendario-agenda',
  templateUrl: './calendario-agenda.component.html',
  styleUrls: ['./calendario-agenda.component.css']
})
export class CalendarioAgendaComponent implements OnInit{


  @ViewChild('calendar') calendarComponent: FullCalendarComponent;

  constructor(private fb: FormBuilder, private citasService: CitasService, private router:Router) { }

  turnos: Citas[] = []




  ngOnInit(): void {
    this.citasService.getCitas().subscribe(data => {
      const eventos = data.map((evento: Citas) => {
        return {

          title: evento.servicio,
          date: evento.fecha,
          extendedProps: { cita: evento },

        }
      });
      this.calendarOptions.events = eventos;
    })
  };


  calendarOptions: CalendarOptions = {
    plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin], // Agrega listPlugin a la lista de plugins
    initialView: 'timeGridWeek',
    locale: esLocale,
    headerToolbar: {
      left: 'prev,next',
      center: 'title',
      right: 'timeGridWeek,timeGridDay, dayGridMonth, listWeek' // user can switch between the two
    },

    dayMaxEvents: 3,
    events: [],
    eventBackgroundColor:'#dbcbf7',
    eventClick: this.handleEventClick.bind(this),



  }

  handleEventClick(clickInfo: { event: EventApi }) {
    const event = clickInfo.event;
    const citaId = event.extendedProps['cita']['_id'];

    this.router.navigate(['/dashboard/detalle-cita', citaId]);
  }

  abrirFormulario() {
    // Puedes abrir un formulario o modal aquí
    // Por ejemplo, puedes navegar a una nueva ruta para mostrar el formulario
    this.router.navigate(['/dashboard/cita/agregar']);
  }


}
