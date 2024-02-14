
import { ChangeDetectorRef } from '@angular/core';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Subscription } from 'rxjs';
import { Citas } from 'src/app/interfaces/cita.interfaces';
import { CitaService } from 'src/app/services/cita.service';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { EstilistaService } from 'src/app/services/estilista.service';
import { DatePipe } from '@angular/common'; // libreria de fechas
import Swal from 'sweetalert2';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.css']
})
export class CalendarioComponent implements OnInit {


  cita: Citas[] = [];
  search: string = '';
  id: string;
  estilistas: Estilista[] = [];
  estilistaSeleccionado: string = '';


  // Agrega estas líneas para usar el MatTableDataSource, MatPaginator y MatSort
  dataSource = new MatTableDataSource<Citas>();
  displayedColumns: string[] = ['nombre', 'apellido', 'nombre_servicio', 'nombre_estilista', 'fechaCita', 'horaCita', 'estado', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  subcripcion!: Subscription;

  constructor(private citaService: CitaService,
              private cdr: ChangeDetectorRef,
              private estilistaService: EstilistaService
              ) { }

  ngOnInit(): void {
    this.cargarEstilistas();
    this.cargarCitas();

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

  onEstilistaChange(): void {
    console.log('Estilista seleccionado:', this.estilistaSeleccionado);
    // Llama a la función para cargar citas
    this.cargarCitas();
  }

cargarCitas(): void {
  console.log("id desde cargar citas:",this.estilistaSeleccionado)
  if (this.estilistaSeleccionado) {
    // Obtener citas para el estilista seleccionado
    // Puedes ajustar esto según tu API
    console.log("id desde cargar citas estilista:",this.estilistaSeleccionado)
    this.citaService.getCitaPorEstilista(this.estilistaSeleccionado).subscribe(
        (data) => {
          this.cita = data;
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
          console.log('Citas cargadas por estilista:', data)
        },
        (error) => {
          console.error('Error al obtener las citas:', error);
        }
      );
    } else {
      // Obtener todas las citas
      this.citaService.getCita().subscribe(
        (data) => {
          this.cita = data;
          this.dataSource.data = data;
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        },
        (error) => {
          console.error('Error al obtener las citas:', error);
        }
      );
    }
  }

  cargarEstilistas(): void {
    this.estilistaService.getEstilistas().subscribe(
      (res) => {
        this.estilistas= res.filter(estilista => estilista.estado == true);
      },
      (error) => {
        console.error('Error al obtener la lista de estilistas:', error);
      }
    );
  }

    // Método para cambiar el estilista seleccionado
    cambiarEstilistaSeleccionado(estilista: Estilista): void {
      this.citaService.getCitaPorEstilista(this.estilistaSeleccionado).subscribe((res)=> {
        this.cita = res
      })
      this.cargarCitas();
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




  aplicarFiltro(valor: string): void {
    this.search = valor.trim().toLowerCase();
    this.dataSource.filter = this.search;
  }

    // Método para eliminar
    eliminarCita(id: string) {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        iconColor: '#745af2',
        showCancelButton: true,
        confirmButtonColor: '#745af2',
        cancelButtonColor: '#745af2',
        confirmButtonText: 'Sí, eliminarlo'
      }).then(result => {
        if (result.isConfirmed) {
          this.citaService.EliminarCita(id).subscribe(res => {
            console.log('Se eliminó con éxito');
          });
        }
      });
    }


}
