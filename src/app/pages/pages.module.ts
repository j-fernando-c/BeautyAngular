import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule} from '@angular/forms'


import { NgChartsModule } from 'ng2-charts';

//modulos
import {RouterModule} from '@angular/router'

import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { ComponentsModule } from '../components/components.module';
import { ListEstilistaComponent } from './estilista/list-estilista/list-estilista.component';
import { CreateEstilistaComponent } from './estilista/create-estilista/create-estilista.component';
import { FiltroPipe } from './estilista/pipe/filtro.pipe';
import { CreateClienteComponent } from './cliente/create-cliente/create-cliente.component';
import { ListClienteComponent } from './cliente/list-cliente/list-cliente.component';
import { ListServicioComponent } from './servicio/list-servicio/list-servicio.component';
import { CreateServicioComponent } from './servicio/create-servicio/create-servicio.component';
import { FiltroPipe2 } from './cliente/pipe/filtro2.pipe';



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
                CreateClienteComponent,
                ListClienteComponent,
                ListServicioComponent,
                CreateServicioComponent,
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
    ReactiveFormsModule
  ]
})
export class PagesModule { }
