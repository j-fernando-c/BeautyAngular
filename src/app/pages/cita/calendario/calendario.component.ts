
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Citas } from 'src/app/interfaces/cita.interfaces';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {


  cita: Citas[] = [];
  search: string = '';


  // Agrega estas líneas para usar el MatTableDataSource, MatPaginator y MatSort
  dataSource = new MatTableDataSource<Citas>();
  displayedColumns: string[] = ['nombre', 'apellido', 'nombre_servicio', 'nombre_estilista', 'fechaCita', 'horaCita', 'estado', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subcripcion!: Subscription;

  constructor(private citaService: CitaService,private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.citaService.getCita().subscribe(data => {
      this.cita = data
      this.dataSource.data = data;
      console.log(this.cita)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

        // Método para refrescar
        this.subcripcion = this.citaService.refresh.subscribe(() => {
          this.citaService.getCita().subscribe(data => {
            this.cita = data;
            this.dataSource.data = data;
            this.dataSource.paginator = this.paginator;
            this.dataSource.sort = this.sort;
          });
        });
  };

  toggleEstadoCita(cita: Citas): void {
    let nuevoEstado = '';

    switch (cita.estado) {
      case 'confirmada':
          nuevoEstado = 'cancelada';
          break;
      case 'cancelada':
          nuevoEstado = 'pendiente';
          break;
      case 'pendiente':
          nuevoEstado = 'confirmada';
          break;
  }

  console.log('Estado anterior:', cita.estado);
  console.log('Nuevo estado:', nuevoEstado);

    this.citaService.actualizarEstado(cita._id, nuevoEstado).subscribe(
      () => {
        // Realiza acciones adicionales después de la actualización si es necesario
        console.log('Estado actualizado correctamente');
        this.cdr.detectChanges();
      },
      (error) => {
        console.error('Error al cambiar el estado de la cita:', error);
      }
    );
  }




  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.search= valor.trim().toLowerCase();
    this.dataSource.filter = valor;
  }


}







