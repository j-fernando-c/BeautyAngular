
import { Component } from '@angular/core';
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
    private usuarioService:UsuarioService){}

    
    ngOnInit() {
      this.estilistasService.getEstilistas().subscribe(estilistas => {
      this.cantidadEstilistas = estilistas.length;
      
    });
    this.clienteService.getCliente().subscribe(clientes=>{

      this.cantidadClientes=clientes.length;
      this.cantidadDeClientesActivos=clientes.filter(cliente=>cliente.estado==true).length;
      this.cantidadDeClientesInactivos=clientes.filter(cliente=>!cliente.estado==true).length;

      this.single = [
        {
          "name": "Activo",
          "value": this.cantidadDeClientesActivos
        },
        {
          "name": "Inactivo",
          "value": this.cantidadDeClientesInactivos
        },
    
      ];
    })

    this.serviciosServices.getServicios().subscribe(servicios=>{
      this.cantidadServicios=servicios.length;
    })

    this.usuarioService.getUsuarios().subscribe(usuarios=>{
      this.cantidadDeUsuariosActivos=usuarios.filter(usuario=>usuario.estado==true).length;
      this.cantidadDeUsuariosInactivos=usuarios.filter(usuario=>!usuario.estado==true).length;
      this.singleUusario = [
        {
          "name": "Activo",
          "value": this.cantidadDeUsuariosActivos
        },
        {
          "name": "Inactivo",
          "value": this.cantidadDeUsuariosInactivos
        },
    
      ];
    })
  }


  view: [number, number] = [500, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showGridLines=false;
  showXAxisLabel = true;
  xAxisLabel = 'Estados de los clientes';
  showYAxisLabel = true;
  yAxisLabel = 'Cantidad';

  colorScheme = {
    domain: ['#ffd9e1', '#ffd9e1', '#ffd9e1', '#ffd9e1']
  };

   // options

   xAxisLabel1 = 'Estados de los usuarios';



}
