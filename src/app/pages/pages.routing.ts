import { EditarClienteComponent } from './cliente/editar-cliente/editar-cliente.component';
import { MisCitasComponent } from './cita/mis-citas/mis-citas.component';
import { DetalleVentaComponent } from './ventas/detalle-venta/detalle-venta.component';
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
import { EditUsuarioComponent } from './usuario/edit-usuario/edit-usuario.component';

import { RolesComponent } from './roles/roles.component';
import { ConfigComponent } from './config/config.component';

import { AuthGuard } from '../auth.guard';
import { CreateServicioComponent } from './servicio/create-servicio/create-servicio.component';
import { CitaComponent } from './turno/cita/cita.component';
import { CalendarioComponent } from './cita/calendario/calendario.component';
import { AddCitaComponent } from './cita/add-cita/add-cita.component';
import { ListVentasComponent } from './ventas/list-ventas/list-ventas.component';
import { AddVentasComponent } from './ventas/add-ventas/add-ventas.component';
import { EditTurnoComponent } from './turno/edit-turno/edit-turno.component';
import { ListClienteActivoComponent } from './cliente/list-cliente-activo/list-cliente-activo.component';
import { EstilistaTurnoComponent } from './turno/estilista-turno/estilista-turno.component';
import { EstilistaTurnoEditComponent } from './turno/estilista-turno-edit/estilista-turno-edit.component';

import { CalendarioAgendaComponent } from './calendario/calendario-agenda/calendario-agenda.component';
import { DetalleCitaComponent } from './calendario/detalle-cita/detalle-cita.component';
import { AgregarCitaComponent } from './calendario/agregar-cita/agregar-cita.component';
import { MiPerfilComponent } from './mi-perfil/mi-perfil.component';
import { EditarPerfilComponent } from './editar-perfil/editar-perfil.component';
import { ChangePasswordComponent } from './change-password/change-password.component';
import { EditarCitaComponent } from './cita/editar-cita/editar-cita.component';
import { EditEstilistaComponent } from './estilista/edit-estilista/edit-estilista.component';

const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', component: DashboardComponent, },
      { path: 'progress', component: ProgressComponent },
      { path: 'dashboard', component: DashboardComponent, },
      { path: 'perfil', component: MiPerfilComponent, },
      { path: 'edit/perfil', component: EditarPerfilComponent, },
      { path: 'edit/contraseña', component: ChangePasswordComponent, },
      { path: 'grafica1', component: Grafica1Component, },
      //Rutas para estilista
      { path: 'estilista/nuevo', component: CreateEstilistaComponent, },
      { path: 'estilista/list', component: ListEstilistaComponent, },
      { path: 'estilista/edit/:id', component: EditEstilistaComponent, },
      //Rutas para cliente
      { path: 'cliente/nuevo', component: CreateClienteComponent },
      { path: 'cliente/list', component: ListClienteComponent, },
      { path: 'cliente/activo/list', component: ListClienteActivoComponent },
      { path: 'cliente/edit/:id', component: EditarClienteComponent, },
      //Rutas para Usuario
      { path: 'usuarios/list', component: ListUsuarioComponent, },
      { path: 'usuarios/nuevo', component: CreateUsuarioComponent, },
      { path: 'usuarios/edit/:id', component: EditUsuarioComponent, },
      //Rutas para Roles
      { path: 'roles/list', component: RolesComponent },
      { path: 'config', component: ConfigComponent },

      //Ruta servicios
      { path: 'servicio/list', component: ListServicioComponent },
      { path: 'servicio/nuevo', component: CreateServicioComponent },
      { path: 'servicio/edit/:id', component: CreateServicioComponent },

      //Ruta turno
      { path: 'turno/list', component: CitaComponent },
      { path: 'turno/estilista/:id', component: EstilistaTurnoComponent },
      { path: 'turno/estilista/edit/:id', component: EstilistaTurnoEditComponent },
      { path: 'turno/nuevo', component: AddTurnoComponent },
      { path: 'turno/edit/:id', component: EditTurnoComponent },


      //Ruta cita
      { path: 'cita/list', component: CalendarioComponent },
      { path: 'cita/nuevo', component: AddCitaComponent },
      { path: 'cita/edit/:id', component: EditarCitaComponent },
      {path:'cita/estilista/:id', component:MisCitasComponent},

      //Ruta cita
      // {path:'citas/list', component:CalendarioAgendaComponent},
      // {path:'cita/detalle', component:DetalleCitaComponent},
      // {path:'cita/agregar', component:AgregarCitaComponent},

      //Ruta ventas
      { path: 'venta/list', component: ListVentasComponent },
      { path: 'venta/nuevo', component: AddVentasComponent },
      { path: 'venta/detalle/:id', component: DetalleVentaComponent }







    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class PagesRoutingModule { }
