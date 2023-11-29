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


const routes: Routes = [
  {
    path: 'dashboard'  ,
    component: PagesComponent,
    children: [
      {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
      {path: 'progress', component: ProgressComponent},
      {path: 'dashboard', component: DashboardComponent,canActivate: [AuthGuard]},
      {path: 'grafica1', component: Grafica1Component,canActivate: [AuthGuard]},
      //Rutas para estilista
      {path: 'estilista/nuevo', component: CreateEstilistaComponent, canActivate: [AuthGuard]},
      {path: 'estilista/list', component: ListEstilistaComponent, canActivate: [AuthGuard]},
      {path: 'estilista/edit/:id', component: CreateEstilistaComponent, canActivate: [AuthGuard]},
      //Rutas para cliente
      {path:'cliente/nuevo', component: CreateClienteComponent},
      {path: 'cliente/list', component: ListClienteComponent,canActivate: [AuthGuard]},
      {path: 'cliente/edit/:id', component:CreateClienteComponent, canActivate: [AuthGuard]}, 
      //Rutas para Usuario
      {path: 'usuarios/list', component:ListUsuarioComponent, canActivate: [AuthGuard]},
      {path: 'usuarios/nuevo', component:CreateUsuarioComponent, canActivate: [AuthGuard]},
      //Rutas para Roles
      {path: 'roles/list', component:RolesComponent, canActivate: [AuthGuard]},
      {path: 'config', component:ConfigComponent, canActivate: [AuthGuard]},

      //Ruta servicios
      {path:'servicio/list', component:ListServicioComponent, canActivate: [AuthGuard]},
      {path:'servicio/nuevo', component:CreateServicioComponent, canActivate: [AuthGuard]},
      {path:'servicio/edit/:id', component:CreateServicioComponent, canActivate: [AuthGuard]}

    





    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class PagesRoutingModule {}
