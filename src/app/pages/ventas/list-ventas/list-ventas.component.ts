import { Component, Inject, OnInit } from '@angular/core';
import { Subscription, from } from 'rxjs';
import { Ventas } from 'src/app/interfaces/ventas.interfaces';
import { MatDialog } from '@angular/material/dialog';
import { VentasService } from 'src/app/services/ventas.service';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-ventas',
  templateUrl: './list-ventas.component.html',
  styleUrls: ['./list-ventas.component.css']
})
export class ListVentasComponent implements OnInit {
  modalSwith: boolean = false;
  ventas: Ventas[] = []
  subcripcion!: Subscription;

  constructor(private ventasService: VentasService) { }


  ngOnInit(): void {
    this.ventasService.getVentas().subscribe(data => {
      this.ventas = data
    });
    //Metódo para refrescar
    this.subcripcion = this.ventasService.refresh.subscribe(() => {
      this.ventasService.getVentas().subscribe(data => {
        this.ventas = data
      });
    })
  }

  cambioEstado(id: string) {
    this.ventasService.actulizarEstado(id).subscribe(res => {
    })
  }

  eliminarVenta(id: string) {
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
        this.ventasService.EliminarVenta(id).subscribe(res => {

        })
      }
    })

  }

}




