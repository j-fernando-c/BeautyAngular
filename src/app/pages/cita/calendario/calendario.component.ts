import interactionPlugin from '@fullcalendar/interaction';

import { Component} from '@angular/core';
import { CalendarOptions } from '@fullcalendar/core'; 
import  dayGridPlugin  from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent {

  public events:any[]=[];

calendarOptions: CalendarOptions = {
  plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin], // Agrega listPlugin a la lista de plugins
  initialView: 'dayGridWeek',
  initialDate:new Date(),
  headerToolbar: {
    left: 'prev,next today',
    center: 'title',
    right: 'dayGridMonth,dayGridWeek,dayGridDay, listWeek' // Agrega 'listDay' para la vista de lista diaria
  },
  // validRange: {
  //   start: new Date(), // Solo permite fechas desde la fecha actual
  // },

    events: [
      {
        title: 'Evento 1',
        start: '2023-11-20T10:00:00',
        end: '2023-11-20T12:00:00',
        color:'black',
        backgroundColor: 'black',
        editable:true,
        extendedProps:{
          servicio: 'peinado'
        }
      },
      {
        title: 'Evento 2',
        start: '2023-11-22',
        allDay: true,
        editable:true
      },
    ],
    dateClick: this.handleDateClick.bind(this),
    eventClick:this.handleDateClick2.bind(this),
  };

  
  handleDateClick(arg: any) {

    alert('Date clicked! ' );
  }

  handleDateClick2(arg: any) {

    alert('Date clicked! ' );
  }

    // Otras opciones...
  };

  

  


