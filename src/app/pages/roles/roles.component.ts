import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Role } from 'src/app/interfaces/role.interfaces';
import { RolesService } from './../../services/roles.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.css']
})
export class RolesComponent implements OnInit {



  constructor(private rolesService: RolesService, private fb: FormBuilder, private router: Router) { }
  role: Role[] = [];
  subcripcion!: Subscription;


  ngOnInit(): void {
    // Método para listar
    this.rolesService.getRoles().subscribe(data => {
      
      this.role = data;

    });


  }



}
