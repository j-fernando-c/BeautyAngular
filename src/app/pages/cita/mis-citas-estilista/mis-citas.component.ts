import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, ViewChild } from '@angular/core';
import { CitaService } from 'src/app/services/cita.service';
import { Citas } from 'src/app/interfaces/cita.interfaces';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';

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


    // Agrega estas líneas para usar el MatTableDataSource, MatPaginator y MatSort
    dataSource = new MatTableDataSource<Citas>();
    displayedColumns: string[] = ['nombre', 'apellido', 'nombre_servicio', 'nombre_estilista', 'fechaCita', 'horaCita', 'estado'];
  
    @ViewChild(MatPaginator) paginator!: MatPaginator;
    @ViewChild(MatSort) sort!: MatSort;
  
  constructor(
    private citasService:CitaService,
    private router:ActivatedRoute){}
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

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.search= valor.trim().toLowerCase();
    this.dataSource.filter = valor;
  }

}
