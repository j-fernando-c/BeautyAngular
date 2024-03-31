import { ActivatedRoute, Route, Router } from '@angular/router';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { Citas } from 'src/app/interfaces/cita.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Subscription } from 'rxjs';



@Component({
  selector: 'app-mis-citas',
  templateUrl: './mis-citas.component.html',
  styleUrls: ['./mis-citas.component.css']
})
export class MisCitasComponent implements OnInit {
  id!:string;
  sExiste:boolean;
  search:string;
  citas:Citas[]=[]
  fechaInicial: string;
  fechaFinal: string;

  selectedEstado: string = 'Todos'; // Valor inicial, 'Todos' significa sin filtrar
  estados: string[] = ['Todos', 'Confirmada', 'Cancelada', 'Pendiente', 'finalizada'];



    // Agrega estas líneas para usar el MatTableDataSource, MatPaginator y MatSort
    dataSource = new MatTableDataSource<Citas>();
    displayedColumns: string[] = ['nombre', 'apellido', 'nombre_servicio', 'duracion', 'fechaCita', 'horaCita', 'horaFinCita', 'estado'];

    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
    private refreshSubscription: Subscription;

  constructor(
    private citasService:CitaService,
    private router:ActivatedRoute,
    private cdr: ChangeDetectorRef,
    private route:Router){}

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];

    if (this.id) {
      this.sExiste = true;
      this.citasService.getByEstilistaId(this.id).subscribe(data => {

         this.citas = data
         this.dataSource.data = data;
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      });
    }

  }

  aplicarFiltro(): void {
    this.dataSource.filter = this.search.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  aplicarFiltroFecha(): void {
    // Asegurarse de que ambas fechas estén presentes antes de aplicar el filtro
    if (this.fechaInicial && this.fechaFinal) {
      const fechaInicial = new Date(this.fechaInicial);
      const fechaFinal = new Date(this.fechaFinal);

      // Filtra las citas basadas en el rango de fechas
      const citasFiltradas = this.citas.filter(cita => {
        const fechaCita = new Date(cita.fechaCita);
        return fechaCita >= fechaInicial && fechaCita <= fechaFinal;
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

  aplicarFiltroEstado(): void {
    if (this.selectedEstado === 'Todos') {
      this.dataSource.filter = ''; // Sin filtro si se elige 'Todos'
    } else {
      this.dataSource.filter = this.selectedEstado.toLowerCase();
    }
  }

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



    this.citasService.actualizarEstado(cita._id, nuevoEstado).subscribe(
      () => {
        // Realiza acciones adicionales después de la actualización si es necesario
    
        this.cdr.detectChanges();
        window.location.reload()

      },
      (error) => {
      }
    );

}}
