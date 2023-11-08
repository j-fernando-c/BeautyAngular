import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/interfaces/cliente.interfaces';
import { ClienteService } from 'src/app/services/cliente.service';

@Component({
  selector: 'app-list-cliente',
  templateUrl: './list-cliente.component.html',
  styleUrls: ['./list-cliente.component.css']
})
export class ListClienteComponent implements OnInit {

  constructor(private clienteServicio:ClienteService, private fb:FormBuilder,private routes:Router){}
  cliente:Cliente[]=[];
  subcripcion!: Subscription;
  ngOnInit(): void {
    this.clienteServicio.getCliente().subscribe(data=>{
      console.log(this.cliente=data)
    });

    this.subcripcion=this.clienteServicio.refresh.subscribe(()=>{
      this.clienteServicio.getCliente().subscribe(data=>{
        console.log(this.cliente=data)
      });
    })
  }



}
