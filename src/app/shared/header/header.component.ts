import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styles: [
  ]
})
export class HeaderComponent implements OnInit {

  message: ""
  constructor(private http:HttpClient,private router: Router) {}


  ngOnInit(): void{
    this.http.get('http://localhost:5000/api/user',{
      // withCredentials:true
    })
    .subscribe(
      (res:any)=>{
      // this.message = `Hola ${res.nombre}`;
    },
    (err) => {
      this.message = err
    }
    );
  }

  reloadPage(): void {
    this.router.navigateByUrl('/dashboard', { skipLocationChange: true }).then(() => {
      this.router.navigate([this.router.url]);
    });
  }
}
