import { FormBuilder } from '@angular/forms';
import { Cliente } from './../../../interfaces/cliente.interfaces';
import { Component } from '@angular/core';
import { Subscription } from 'rxjs';

import { ClienteService } from 'src/app/services/cliente.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent {
  Cliente:Cliente[]=[]
  private formData!: Cliente;
  title: any;
  subcripcion!: Subscription;
  constructor(private servicioCliente:ClienteService, private fb:FormBuilder,private routes:Router){

  }
  ngOnInit(): void {
    this.servicioCliente.getCliente().subscribe(data=>{
      console.log(this.Cliente=data)
    });

    this.subcripcion=this.servicioCliente.refresh.subscribe(()=>{
      this.servicioCliente.getCliente().subscribe(data=>{
        console.log(this.Cliente=data)
      });
    })



}}
