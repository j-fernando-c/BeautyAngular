
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ClienteService } from 'src/app/services/cliente.service';
import { EstilistaService } from 'src/app/services/estilista.service';
import { ServiciosService } from 'src/app/services/servicios.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:['./dashboard.component.css']
  

})
export class DashboardComponent {

  single: any[]=[]
  citasPorDias:any[]=[]
  singleUusario:any[]=[];
  cantidadUsuario:number;
  cantidadEstilistas:number=0;
  cantidadClientes:number=0;
  cantidadServicios:number=0;
  cantidadDeClientesActivos:number=0;
  cantidadDeUsuariosActivos:number=0;
  cantidadDeUsuariosInactivos:number=0;
  cantidadDeClientesInactivos:number=0;

  constructor(
    private estilistasService:EstilistaService, 
    private clienteService:ClienteService,
    private serviciosServices: ServiciosService,
    private usuarioService:UsuarioService,
    private fb: FormBuilder){}

    myForm: FormGroup = this.fb.group({
      startDate: ['', Validators.required],
      endDate: ['', Validators.required]
    });
    ngOnInit() {
      this.estilistasService.getEstilistas().subscribe(estilistas => {
      this.cantidadEstilistas = estilistas.length;
      
    });
    this.usuarioService.getUsuarios().subscribe(clientes=>{

      this.cantidadClientes=clientes.filter(cliente=>cliente.roles.some(rol => rol.nombre === 'cliente')).length 
      this.cantidadUsuario=clientes.filter(cliente=>cliente.roles.some(rol => rol.nombre === 'admin')).length 
        
    })

    this.serviciosServices.getServicios().subscribe(servicios=>{
      this.cantidadServicios=servicios.length;
    })




  }






}
