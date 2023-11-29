
import { Component } from '@angular/core';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import { EstilistaService } from 'src/app/services/estilista.service';
import { ServiciosService } from 'src/app/services/servicios.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls:['./dashboard.component.css']
  

})
export class DashboardComponent {

  single: any[]=[]
  cantidadEstilistas:number=0;
  cantidadClientes:number=0;
  cantidadServicios:number=0;
  cantidadDeClientesActivos:number=0;
  cantidadDeClientesInactivos:number=0;

  constructor(
    private estilistasService:EstilistaService, 
    private clienteService:ClienteService,
    private serviciosServices: ServiciosService,){}

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
  }


  view: [number, number] = [600, 400];

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


}
