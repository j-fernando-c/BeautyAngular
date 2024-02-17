import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Ventas } from 'src/app/interfaces/ventas.interfaces';
import { VentasService } from 'src/app/services/ventas.service';

@Component({
  selector: 'app-list-ventas-inactivas',
  templateUrl: './list-ventas-inactivas.component.html',
  styleUrls: ['./list-ventas-inactivas.component.css']
})
export class ListVentasInactivasComponent implements OnInit {

  
  pages: number = 0;

  // Contiene los usuarios
  dataSource = new MatTableDataSource<Ventas>();
  displayedColumns: string[] = [ 'clientes', 'servicios', 'precio', 'medio-pago', 'estado'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

    // Variable para buscar
  search: string = '';
  modalSwith: boolean = false;
  ventas: Ventas[] = []
  subcripcion!: Subscription;
  constructor(private ventasService: VentasService) { }
  ngOnInit(): void {

    this.ventasService.getVentas().subscribe(data => {
      this.ventas = data;
      this.dataSource.data = data.filter(venta=>venta.estado==false);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    //Metódo para refrescar
    this.subcripcion = this.ventasService.refresh.subscribe(() => {
      this.ventasService.getVentas().subscribe(data => {
      this.ventas = data;
      this.dataSource.data = data.filter(venta=>venta.estado==false);;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
    })
    
  }


    //Metódo que me permite cambiar de estado
    cambioEstado(id:string){
      this.ventasService.actualizarEstado(id).subscribe(res=>{
  
      })
  
  
    }
      aplicarFiltro(valor: string): void {
        this.search = valor.trim().toLowerCase();
        this.dataSource.filter = valor;
      }
  

}
