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

  constructor(private http: HttpClient) { }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(this.url).pipe(
      tap((roles) => console.log('Roles obtenidos desde el servicio de usuario:', roles)),
      catchError((error) => {
        console.error('Error al obtener roles:', error);
        return throwError(error);
      })
    );
  }
}



