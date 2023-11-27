import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';
import { Role } from '../interfaces/role.interfaces';


@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private refresh$ = new Subject<void>
  private url ="http://localhost:5000/api/roles/"
  private loginUrl = "http://localhost:5000"

  constructor(private http: HttpClient) { }

    getRoles(): Observable<Role[]>{
      return this.http.get<Role[]>(this.url)
    }


    getOneRole(id:string):Observable<Role>{
      return this.http.get<Role>(this.url + id)
    }

    login(email: string, contrasena: string): Observable<any> {
      const body = { email, contrasena };
      return this.http.post(`${this.loginUrl}/login`, body);
    }


}
