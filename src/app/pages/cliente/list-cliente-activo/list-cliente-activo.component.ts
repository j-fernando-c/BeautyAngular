import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { Usuario } from 'src/app/interfaces/usuario.interfaces';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-list-cliente-activo',
  templateUrl: './list-cliente-activo.component.html',
  styleUrls: ['./list-cliente-activo.component.css']
})
export class ListClienteActivoComponent implements OnInit {

  dataSource = new MatTableDataSource<Usuario>([]);
  displayedColumns: string[] = ['nombre', 'apellido', 'email',  'acciones'];
  clienteActivo: Usuario[] = [];

  search: string = '';

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private usuarioService: UsuarioService) { }

  ngOnInit(): void {
    this.usuarioService.getUsuarios().subscribe(res => {
      this.clienteActivo = res.filter(usuario => usuario.estado === true && usuario.roles.some(rol => rol.nombre === 'cliente'));
      this.dataSource.data = this.clienteActivo;
      this.dataSource.paginator = this.paginator;
      console.log("usuarios activos",this.clienteActivo);
      this.dataSource.sort = this.sort;
    });
  }

  aplicarFiltro(valor: string): void {
    this.search = valor.trim().toLowerCase();
    this.dataSource.filter = valor;
  }
}

