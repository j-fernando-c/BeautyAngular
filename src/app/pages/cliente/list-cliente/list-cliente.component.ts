import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/usuario.service';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {

  // Agrega estas líneas para usar el MatTableDataSource, MatPaginator y MatSort
  dataSource = new MatTableDataSource<Usuario>();
  displayedColumns: string[] = ['nombre', 'apellido', 'email', 'telefono', 'direccion', 'estado', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private clienteServicio: ClienteService, private fb: FormBuilder, private router: Router, private usuarioService: UsuarioService) { }

  pages: number = 0;
  subcripcion!: Subscription;
  serach: string = '';
  estado: boolean = true;
  textoEstado: string = 'Activo';


  ngOnInit(): void {
    // Método para listar
    this.usuarioService.getUsuarios().subscribe(data => {
      this.dataSource.data = data.filter(usuario => usuario.roles.some(rol => rol.nombre === 'cliente'));
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;

    });

    // Método para refrescar
    this.subcripcion = this.usuarioService.refresh.subscribe(() => {
      this.usuarioService.getUsuarios().subscribe(data => {
        this.dataSource.data = data.filter(usuario => usuario.roles.some(rol => rol.nombre === 'cliente'));
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  cambioEstado(id: string) {
    this.usuarioService.actulizarEstado(id).subscribe({
      next: (res) => {


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


  // Método para eliminar
  eliminarCliente(id: string) {
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
        this.usuarioService.EliminarUsuario(id).subscribe(res => {
          console.log('Se eliminó con éxito');
        });
      }
    });
  }

  nextPage() {
    this.pages += 7;
  }

  anteriorPage() {
    if (this.pages > 0) {
      this.pages -= 7;
    }
  }

  buscarCliente(nombre: string) {
    this.serach = nombre;
  }

  aplicarFiltro(event: Event): void {
    const valor = (event.target as HTMLInputElement).value;
    this.serach = valor.trim().toLowerCase();
    this.dataSource.filter = valor;
  }
}
