import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ActivatedRoute } from '@angular/router';
import { Citas } from 'src/app/interfaces/cita.interfaces';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { CitaService } from 'src/app/services/cita.service';
import { CitasService } from 'src/app/services/citas.service';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list-cliente-activo',
  templateUrl: './list-cliente-activo.component.html',
  styleUrls: ['./list-cliente-activo.component.css']
})
export class ListClienteActivoComponent implements OnInit {

  id!: string;
  sExiste:boolean;
  citas: Citas[] = []
  nombre?:string;
  citasConfirmadas:number;
  citasCanceladas:number;
  citasPendientes:number;

  // Agrega estas líneas para usar el MatTableDataSource, MatPaginator y MatSort
  dataSource = new MatTableDataSource<Citas>();
  displayedColumns: string[] = ['nombre_servicio', 'duracion', 'precio', 'nombre_estilista', 'fechaCita', 'horaCita', 'horaFinCita'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private citasService: CitaService,
    private usuarioService: UsuarioService,
    private route:ActivatedRoute) { }

  ngOnInit(): void {

    this.id = this.route.snapshot.params['id'];
    this.citasService.getByClienteId(this.id).subscribe(res=>{
      this.citasConfirmadas=res.filter(res=>res.estado==='confirmada').length
      this.citasCanceladas=res.filter(res=>res.estado==='cancelada').length
      this.citasPendientes=res.filter(res=>res.estado==='pendiente').length
    })

    if (this.id) {
      this.sExiste = true;
      this.citasService.getByClienteId(this.id).subscribe(data => {
        this.citas = data
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

      });
    }

    if(this.id){
      this.sExiste = true;
      this.usuarioService.getOneUsuario(this.id).subscribe((res: Usuario | null) => {
        this.nombre=`${res?.nombre} ${res?.apellido}`
      });
    }
  }


}

