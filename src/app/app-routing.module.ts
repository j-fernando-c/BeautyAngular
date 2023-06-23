import { NgModule } from '@angular/core';
import { RouterModule,Routes} from '@angular/router'

//modulos
import { PagesModule } from './pages/pages.module';



import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { PagesRoutingModule } from './pages/pages.routing';
import { AuthRoutingModule } from './auth/auth.routing';


const routes:Routes = [

  // path: '/dashboard' PagesRouting
  // path: '/auth' AuthRouting
  // path:

  {path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  {path: '**', component: NopagefoundComponent},


];


@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    PagesRoutingModule,
    AuthRoutingModule,
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
