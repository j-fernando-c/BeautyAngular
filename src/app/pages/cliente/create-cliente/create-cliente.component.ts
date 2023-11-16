import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-cliente',
  templateUrl: './create-cliente.component.html',
  styleUrls: ['./create-cliente.component.css']
})
export class CreateClienteComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private clienteServicio: ClienteService,
    private routes: ActivatedRoute,
    private router: Router
  ) {}

  id!: number;
  sExiste: boolean = false;
  myForm: FormGroup = this.fb.group({
    telefono: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
    direccion: ['', Validators.required],
    email: ['', [Validators.required, Validators.email, this.validateEmail]],
    nombre: ['', [Validators.required, Validators.pattern(/^[^\d\s]+$/)]], // expresion regular que No permite dígitos ni espacios
    apellido: ['', [Validators.required, Validators.pattern(/^[^\d\s]+$/)]], // No permite dígitos ni espacios
  });

  ngOnInit(): void {
    this.id = this.routes.snapshot.params['id']
    if (this.id) {
      this.sExiste = true
      this.clienteServicio.getOneCliente(this.id).subscribe((res: Cliente) => {
        this.myForm.patchValue({
          nombre: res.nombre,
          apellido: res.apellido,
          email: res.email,
          direccion: res.direccion,
          telefono: res.telefono
        })
      })
    }
  }

  onSave(cliente: Cliente) {
    if (this.sExiste) {
      this.clienteServicio.actualizarCliente(this.id, cliente).subscribe((res: Cliente) => {
        Swal.fire({
          icon: 'success',
          title: '¡Guardado!',
          text: 'La información se ha actualizado exitosamente.',
        });
        this.router.navigateByUrl("/dashboard/cliente/list")
      })
    } else {
      this.clienteServicio.createCliente(cliente).subscribe(res => {
        Swal.fire({
          icon: 'success',
          title: '¡Guardado!',
          text: 'El Usuario se ha guardado exitosamente.',
        });

        this.router.navigateByUrl("/dashboard/cliente/list")
      })
      this.myForm.markAllAsTouched()
    }
  }

  // Función de validación personalizada para verificar la extensión .com en el correo electrónico
  validateEmail(control: any) {
    const email = control.value.toLowerCase();
    if (!email.endsWith('.com')) {
      return { invalidEmail: true };
    }
    return null;
  }
}
