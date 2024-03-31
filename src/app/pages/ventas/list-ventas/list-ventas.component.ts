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
  fechaInicial: string;
  fechaFinal: string;
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

    aplicarFiltroFecha(): void {
      // Asegurarse de que ambas fechas estén presentes antes de aplicar el filtro
      if (this.fechaInicial && this.fechaFinal) {
        const fechaInicial = new Date(this.fechaInicial);
        const fechaFinal = new Date(this.fechaFinal);

        // Filtra las citas basadas en el rango de fechas y el estado 'finalizado'
        const citasFiltradas = this.ventas.filter(cita => {
          const fechaCita = new Date(cita.fechaCita);
          return (
            fechaCita >= fechaInicial &&
            fechaCita <= fechaFinal &&
            cita.estado === 'finalizada'
          );
        });

        // Actualiza el origen de datos con las citas filtradas
        this.dataSource.data = citasFiltradas;

        // Si estás utilizando paginación, puedes volver a la primera página
        if (this.dataSource.paginator) {
          this.dataSource.paginator.firstPage();
        }
      } else {
        // Si falta alguna fecha, muestra un mensaje de advertencia o manejo adecuado
     
      }
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




