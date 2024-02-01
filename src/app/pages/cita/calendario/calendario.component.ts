

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
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
  constructor(private citaService: CitaService) { }

  ngOnInit(): void {
    this.citaService.getCita().subscribe(data => {
      this.cita = data
      this.dataSource.data = data;
      console.log(this.cita)
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

  };


  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.search= valor.trim().toLowerCase();
    this.dataSource.filter = valor;
  }



}



