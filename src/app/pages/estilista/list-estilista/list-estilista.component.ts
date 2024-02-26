import { Component, OnInit, ViewChild} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Estilista } from 'src/app/interfaces/estilista.interfaces';
import { EstilistaService } from 'src/app/services/estilista.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-list-estilista',
  templateUrl: './list-estilista.component.html',
  styleUrls: ['./list-estilista.component.css']
})
export class ListEstilistaComponent implements OnInit {

  //Para la paginación
  pages: number = 0;
  //Contiene los estilistas
  estilista: Estilista[] = []
  dataSource = new MatTableDataSource<Estilista>();
  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'telefono', 'estado', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  //Variable para buscar
  search: string = ''

  subcripcion!: Subscription;



  constructor(private servicioEstilista: EstilistaService, private fb: FormBuilder, private routes: Router) {

  }

  ngOnInit(): void {
    //Metódo para listar
    this.servicioEstilista.getEstilistas().subscribe(data => {
      this.estilista = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    //Metódo para refrescar
    this.subcripcion = this.servicioEstilista.refresh.subscribe(() => {
      this.servicioEstilista.getEstilistas().subscribe(data => {
        this.estilista = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    })


  }
  cambioEstado(id: string) {
    this.servicioEstilista.actulizarEstado(id).subscribe({
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


  //Metodo para eliminar
  eliminarEstilista(id: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      iconColor: '#745af2',
      showCancelButton: true,
      confirmButtonColor: '#745af2',
      cancelButtonColor: '#745af2',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.servicioEstilista.EliminarEstilista(id).subscribe(res => {
          console.log("Se eliminó con exito")
        })
      }
    })

  }
  //Metodos para la páginacion
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
