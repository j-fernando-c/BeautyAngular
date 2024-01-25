import { CalendarModule } from 'primeng/calendar';

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import {MatSelectModule} from '@angular/material/select';
import { FullCalendarModule } from '@fullcalendar/angular';

import { NgChartsModule } from 'ng2-charts';

//modulos
import { RouterModule } from '@angular/router'
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { CdkAccordionItem } from '@angular/cdk/accordion';

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ListEstilistaComponent } from './estilista/list-estilista/list-estilista.component';
import { CreateEstilistaComponent } from './estilista/create-estilista/create-estilista.component';
import { CreateClienteComponent } from './cliente/create-cliente/create-cliente.component';
import { ListClienteComponent } from './cliente/list-cliente/list-cliente.component';
import { ListServicioComponent } from './servicio/list-servicio/list-servicio.component';
import { CreateServicioComponent } from './servicio/create-servicio/create-servicio.component';
import { CalendarioComponent } from './cita/calendario/calendario.component';

//Me permite filtrar
import { FiltroPipe2 } from './cliente/pipe/filtro2.pipe';
import { FiltroPipe } from './estilista/pipe/filtro.pipe';
import { FiltroPipeServicio } from './servicio/pipe/filtro3.pipe';


import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import { RolesComponent } from './roles/roles.component';
import { ListUsuarioComponent } from './usuario/list-usuario/list-usuario.component';
import { CreateUsuarioComponent } from './usuario/create-usuario/create-usuario.component';
import { ConfigComponent } from './config/config.component';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { AddCitaComponent } from './cita/add-cita/add-cita.component';
import { CitaComponent } from './turno/cita/cita.component';
import { AddTurnoComponent } from './turno/add-turno/add-turno.component';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FiltroPipeUsuario } from './usuario/pipe/filtro.pipe.usuario';
import { Grafica3Component } from './dashboard/grafica3/grafica3.component';
import { ListVentasComponent } from './ventas/list-ventas/list-ventas.component';
import { AddVentasComponent } from './ventas/add-ventas/add-ventas.component';
import { DetalleVentaComponent } from './ventas/detalle-venta/detalle-venta.component';
import { EditUsuarioComponent } from './usuario/edit-usuario/edit-usuario.component';
import { NgxMaterialTimepickerModule, NgxTimepickerFieldComponent } from 'ngx-material-timepicker';
import { EditTurnoComponent } from './turno/edit-turno/edit-turno.component';
import { ListClienteActivoComponent } from './cliente/list-cliente-activo/list-cliente-activo.component';
import { EstilistaTurnoComponent } from './turno/estilista-turno/estilista-turno.component';
import { EstilistaTurnoEditComponent } from './turno/estilista-turno-edit/estilista-turno-edit.component';







@NgModule({
  declarations: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
    ListEstilistaComponent,
    CreateEstilistaComponent,
    FiltroPipe,
    FiltroPipe2,
    FiltroPipeServicio,
    FiltroPipeUsuario,
    CreateClienteComponent,
    ListClienteComponent,
    ListServicioComponent,
    CreateServicioComponent,
    CreateClienteComponent,
    ListClienteComponent,
    RolesComponent,
                ListUsuarioComponent,
                CreateUsuarioComponent,
                ConfigComponent,
    CalendarioComponent,
    AddCitaComponent,
    CitaComponent,
    AddTurnoComponent,
    Grafica3Component,
    ListVentasComponent,
    AddVentasComponent,
    DetalleVentaComponent,
    EditUsuarioComponent,
    EditTurnoComponent,
    ListClienteActivoComponent,
    EstilistaTurnoComponent,
    EstilistaTurnoEditComponent,



  ],
  exports: [
    DashboardComponent,
    ProgressComponent,
    Grafica1Component,
    PagesComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ComponentsModule,
    NgChartsModule,
    ReactiveFormsModule,
    MatPaginatorModule,
    MatInputModule,
    MatFormFieldModule,
    MatSortModule,
    MatTableModule,
    MatSlideToggleModule,
    FullCalendarModule,
    MatDatepickerModule,
    CalendarModule,
    MatSelectModule,
    CdkAccordionModule,
    NgxChartsModule,
    NgxMaterialTimepickerModule,
    TimepickerModule.forRoot(),
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule
    
    
  
    

  ]
})
export class PagesModule { }
