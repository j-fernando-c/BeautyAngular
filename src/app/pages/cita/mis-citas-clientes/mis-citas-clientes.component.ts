import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Citas } from 'src/app/interfaces/cita.interfaces';
import { CitaService } from 'src/app/services/cita.service';

@Component({
  selector: 'app-mis-citas-clientes',
  templateUrl: './mis-citas-clientes.component.html',
  styleUrls: ['./mis-citas-clientes.component.css']
})
export class MisCitasClientesComponent implements OnInit {
  constructor(
    private citasService: CitaService,
    private router: ActivatedRoute) { }


  id!: string;
  sExiste: boolean;
  search: string;
  citas: Citas[] = []
  estilistaSeleccionado: string = '';

  selectedEstado: string = 'Todos'; // Valor inicial, 'Todos' significa sin filtrar
  estados: string[] = ['Todos', 'Confirmada', 'Cancelada', 'Pendiente', 'finalizada'];

  aplicarFiltroEstado(): void {
    if (this.selectedEstado === 'Todos') {
      this.dataSource.filter = ''; // Sin filtro si se elige 'Todos'
    } else {
      this.dataSource.filter = this.selectedEstado.toLowerCase();
    }
  }

  // Agrega estas líneas para usar el MatTableDataSource, MatPaginator y MatSort
  dataSource = new MatTableDataSource<Citas>();
  displayedColumns: string[] = ['nombre_servicio', 'duracion', 'precio', 'nombre_estilista', 'fechaCita', 'horaCita', 'horaFinCita', 'estado'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit(): void {
    this.id = this.router.snapshot.params['id'];

    if (this.id) {
      this.sExiste = true;
      this.citasService.getByClienteId(this.id).subscribe(data => {

        this.citas = data
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });
    }
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.search = valor.trim().toLowerCase();
    this.dataSource.filter = valor;
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
}


}
