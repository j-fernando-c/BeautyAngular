import { ListServicioComponent } from './servicio/list-servicio/list-servicio.component';
import { AddTurnoComponent } from './turno/add-turno/add-turno.component';
import { CreateEstilistaComponent } from './estilista/create-estilista/create-estilista.component';
import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesComponent } from './pages.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ProgressComponent } from './progress/progress.component';
import { LoginComponent } from '../auth/login/login.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { ListEstilistaComponent } from './estilista/list-estilista/list-estilista.component';
import { CreateClienteComponent } from './cliente/create-cliente/create-cliente.component';
import { ListClienteComponent } from './cliente/list-cliente/list-cliente.component';

import { ListUsuarioComponent } from './usuario/list-usuario/list-usuario.component';
import { CreateUsuarioComponent } from './usuario/create-usuario/create-usuario.component';
import { RolesComponent } from './roles/roles.component';
import { ConfigComponent } from './config/config.component';

import { AuthGuard } from '../auth.guard';
import { CreateServicioComponent } from './servicio/create-servicio/create-servicio.component';
import { CitaComponent } from './turno/cita/cita.component';
import { CalendarioComponent } from './cita/calendario/calendario.component';
import { AddCitaComponent } from './cita/add-cita/add-cita.component';


const routes: Routes = [
  {
    path: 'dashboard'  ,
    component: PagesComponent,
    canActivate:[AuthGuard],
    children: [
      {path: '', component: DashboardComponent, },
      {path: 'progress', component: ProgressComponent},
      {path: 'dashboard', component: DashboardComponent,},
      {path: 'grafica1', component: Grafica1Component,},
      //Rutas para estilista
      {path: 'estilista/nuevo', component: CreateEstilistaComponent, },
      {path: 'estilista/list', component: ListEstilistaComponent, },
      {path: 'estilista/edit/:id', component: CreateEstilistaComponent, },
      //Rutas para cliente
      {path:'cliente/nuevo', component: CreateClienteComponent},
      {path: 'cliente/list', component: ListClienteComponent,},
      {path: 'cliente/edit/:id', component:CreateClienteComponent, }, 
      //Rutas para Usuario
      {path: 'usuarios/list', component:ListUsuarioComponent, },
      {path: 'usuarios/nuevo', component:CreateUsuarioComponent, },
      //Rutas para Roles
      {path: 'roles/list', component:RolesComponent},
      {path: 'config', component:ConfigComponent},

      //Ruta servicios
      {path:'servicio/list', component:ListServicioComponent},
      {path:'servicio/nuevo', component:CreateServicioComponent},
      {path:'servicio/edit/:id', component:CreateServicioComponent},

      //Ruta turno
      {path:'turno/list', component:CitaComponent},
      {path:'turno/nuevo', component:AddTurnoComponent},

      //Ruta cita
      {path:'cita/list', component:CalendarioComponent},
      {path:'cita/nuevo', component:AddCitaComponent}






    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class PagesRoutingModule {}
