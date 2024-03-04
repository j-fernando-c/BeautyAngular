import { ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { Subscription, from, window } from 'rxjs';
import { VentasService } from 'src/app/services/ventas.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Citas } from 'src/app/interfaces/cita.interfaces';
import { CitasService } from 'src/app/services/citas.service';
import { CitaService } from 'src/app/services/cita.service';
import * as XLSX from 'xlsx';


@Component({
  selector: 'app-list-ventas',
  templateUrl: './list-ventas.component.html',
  styleUrls: ['./list-ventas.component.css']
})
export class ListVentasComponent implements OnInit {

  pages: number = 0;

  
  // Agrega estas líneas para usar el MatTableDataSource, MatPaginator y MatSort
  dataSource = new MatTableDataSource<Citas>();
  displayedColumns: string[] = ['nombre', 'apellido', 'nombre_servicio','precio', 'duracion', 'nombre_estilista', 'fechaCita', 'horaCita', 'estado'];


  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

    // Variable para buscar
  search: string = '';
  modalSwith: boolean = false;
  fecha:Date;
  ventas: Citas[] = []
  subcripcion!: Subscription;

  constructor(private ventasService: VentasService, private citasService:CitasService, private cita:CitaService, private cdr: ChangeDetectorRef,private router:ActivatedRoute,) { }


  ngOnInit(): void {
    console.log();
    
    this.citasService.getCitas().subscribe(data => {
      this.ventas = data;
      this.dataSource.data = data.filter(venta=>venta.estado==='finalizada');
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
    //Metódo para refrescar
    this.subcripcion = this.ventasService.refresh.subscribe(() => {
      this.citasService.getCitas().subscribe(data => {
      this.ventas = data;
      this.dataSource.data = data.filter(venta=>venta.estado==='finalizada');
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      });
    })
  }

  

    aplicarFiltro(valor: string): void {
      this.search = valor.trim().toLowerCase();
      this.dataSource.filter = valor;
    }

    exportarExcel(): void {
      
      const datosInforme = this.dataSource.filteredData.map((cita:Citas) => (
        {
        
        'Nombre Cliente': cita.cliente.nombre,
        'Apellido Cliente': cita.cliente.apellido,
        'Nombre Servicio': cita.servicio.nombre_servicio,
        'Precio': cita.servicio.precio,
        'Duracion (min)': cita.servicio.duracion,
        'Nombre Estilista': `${cita.estilista.nombre} ${cita.estilista.apellido}`,
        'Fecha Cita': cita.fechaCita,
        'Hora Cita': cita.horaCita,
        'Estado': cita.estado,
      }));
    
      const ws: XLSX.WorkSheet = XLSX.utils.json_to_sheet(datosInforme);
      const wb: XLSX.WorkBook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(wb, ws, 'InformeCitas');
    
   
      XLSX.writeFile(wb, 'informe_ventas.xlsx');
    }
}




