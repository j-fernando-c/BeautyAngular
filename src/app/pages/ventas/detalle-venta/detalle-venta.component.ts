import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Ventas } from 'src/app/interfaces/ventas.interfaces';
import { VentasService } from 'src/app/services/ventas.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detalle-venta',
  templateUrl: './detalle-venta.component.html',
  styleUrls: ['./detalle-venta.component.css']
})
export class DetalleVentaComponent implements OnInit {
  id!: string;
  sExiste: boolean = false;
  venta?: Ventas;
  constructor(private ventasService:VentasService ,
    private route: ActivatedRoute, 
    private router:Router){}
  ngOnInit(): void {
    this.id = this.route.snapshot.params['id']
    if (this.id) {
      this.sExiste = true
      this.ventasService.getOneVenta(this.id).subscribe((res: Ventas) => {
        this.venta = res;
      })
    }
  }


  eliminarVenta() {
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
        this.ventasService.EliminarVenta(this.id).subscribe(res => {
          this.router.navigateByUrl("/dashboard/venta/list")
        })
      }
    })

  }

}
