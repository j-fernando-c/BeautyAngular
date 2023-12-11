import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { Ventas } from 'src/app/interfaces/ventas.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-list-ventas',
  templateUrl: './list-ventas.component.html',
  styleUrls: ['./list-ventas.component.css']
})
export class ListVentasComponent implements OnInit  {

  ventas:Ventas[]=[]
  subcripcion!: Subscription;
  constructor(private ventasService:VentasService){}
  ngOnInit(): void {
    this.ventasService.getVentas().subscribe(data => {
      this.ventas = data
      console.log(this.ventas)
    });
    //Metódo para refrescar
    this.subcripcion = this.ventasService.refresh.subscribe(() => {
      this.ventasService.getVentas().subscribe(data => {
        this.ventas = data
      });
    })
  }

  cambioEstado(id:string){
    this.ventasService.actulizarEstado(id).subscribe(res=>{
      
    })
  }



}
