import { Component, OnInit,ViewChild } from '@angular/core';
import { Subscription } from 'rxjs';
import { Servicio } from 'src/app/interfaces/servicios.interfaces';
import { ServiciosService } from 'src/app/services/servicios.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-servicio',
  templateUrl: './list-servicio.component.html',
  styleUrls: ['./list-servicio.component.css']
})
export class ListServicioComponent implements OnInit {
    //Variable para buscar
    search: string = ''
  pages: number = 0;
  servicio:Servicio[]=[];

  dataSource = new MatTableDataSource<Servicio>();
  displayedColumns: string[] = [ 'nombre-servicio', 'duracion', 'precio', 'estilista-nombre', 'estado', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  subcripcion!: Subscription;

  estado:boolean=true;
  textoEstado:string='Activo';

  constructor(private servicioServices:ServiciosService){}
  ngOnInit(): void {
    this.servicioServices.getServicios().subscribe(data=>{
      this.servicio=data;
      this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

    })
//Metódo que me permite refrescar
    this.subcripcion = this.servicioServices.refresh.subscribe(() => {
      this.servicioServices.getServicios().subscribe(data => {
        this.servicio = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    })
  }
//Metódo que me permite cambiar de estado
cambioEstado(id: string) {
  this.servicioServices.actualizarEstado(id).subscribe({
   next: (res)=> {
      
    },
    error: (error) => {
      
      if (error.status === 400 && error.error.message) {
        // Mostrar mensaje de error usando SweetAlert2
        Swal.fire({
          icon: 'error',
          title: 'Error al cambiar el estado',
          text: error.error.message,
          confirmButtonColor: '#745af2',
        });
      } 
    }
  },
  );
}
//Metodo que me permite eliminar
  eliminarServicio(id:string){
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      iconColor:'#745af2',
      showCancelButton: true,
      confirmButtonColor: '#745af2',
      cancelButtonColor: '#745af2',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result)=>{
      if(result.isConfirmed){
        this.servicioServices.eliminarServicio(id).subscribe(res=>{
          console.log("Se eliminó con exito")
        })
      }
    })
  }

  nextPage() {
    this.pages += 7
  }
  //Metodos para la paginacion
  anteriorPage() {
    if (this.pages > 0) {
      this.pages -= 7

    }
  }

  aplicarFiltro(valor: string): void {
    this.search = valor.trim().toLowerCase();
    this.dataSource.filter = valor;
  }
}
