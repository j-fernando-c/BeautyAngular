import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-usuario',
  templateUrl: './list-usuario.component.html',
  styleUrls: ['./list-usuario.component.css']
})
export class ListUsuarioComponent implements OnInit {
  // Para la paginación
  pages: number = 0;

  // Contiene los usuarios
  usuarios: Usuario[] = [];
  dataSource = new MatTableDataSource<Usuario>();
  displayedColumns: string[] = [ 'nombre', 'apellido', 'email', 'rol', 'estado', 'acciones'];

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // Variable para buscar
  search: string = '';

  subcripcion!: Subscription;

  estado: boolean = true;
  textoEstado: string = 'Activo';

  constructor(private usuarioService: UsuarioService, private fb: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    // Método para listar
    this.usuarioService.getUsuarios().subscribe(data => {
      this.usuarios = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // Método para refrescar
    this.subcripcion = this.usuarioService.refresh.subscribe(() => {
      this.usuarioService.getUsuarios().subscribe(data => {
        this.usuarios = data;
        this.dataSource.data = data;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
    });
  }

  cambioEstado(id: string) {
    this.usuarioService.actulizarEstado(id).subscribe(res => {
      console.log(res);
    });
  }

  // Método para eliminar
  eliminarUsuario(id: string) {
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

  // Métodos para la paginación
  nextPage() {
    this.pages += 7;
  }

  // Métodos para la paginación
  anteriorPage() {
    if (this.pages > 0) {
      this.pages -= 7;
    }
  }

  aplicarFiltro(valor: string): void {
    this.search = valor.trim().toLowerCase();
    this.dataSource.filter = valor;
  }

}
