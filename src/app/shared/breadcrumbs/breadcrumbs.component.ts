import { Component, OnInit } from '@angular/core';
import { Router, Routes } from '@angular/router';

@Component({
  selector: 'app-breadcrumbs',
  templateUrl: './breadcrumbs.component.html',
  styles: [
  ]
})
export class BreadcrumbsComponent implements OnInit {
  public url:string=''
  protected  nombreSeccion:string = ""
  constructor(private routes:Router){}
  ngOnInit(): void {
    this.url=this.routes.url;
    if(this.url=='/dashboard/estilista/list'){
      this.nombreSeccion='Gestión de estilistas'
    }else if(this.url=='/dashboard/cliente/list'){
      this.nombreSeccion='Gestión de clientes'
    }
    
  }

  


}
