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


const routes: Routes = [
  {
    path: 'dashboard',
    component: PagesComponent,
    children: [
      {path: '', component: DashboardComponent},
      {path: 'progress', component: ProgressComponent},
      {path: 'grafica1', component: Grafica1Component},
      //Rutas para estilista
      {path: 'estilista/nuevo', component: CreateEstilistaComponent},
      {path: 'estilista/list', component: ListEstilistaComponent},
      {path: 'estilista/edit/:id', component: CreateEstilistaComponent},
      //Rutas para cliente
      {path:'cliente/nuevo', component: CreateClienteComponent},
      {path: 'cliente/list', component: ListClienteComponent},
      {path: 'cliente/edit/:id', component:CreateClienteComponent}
   
    ]
  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ]
})

export class PagesRoutingModule {}
