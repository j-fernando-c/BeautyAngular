import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, tap } from 'rxjs';
import { Usuario } from '../interfaces/usuario.interfaces';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
  private refresh$ = new Subject<void>();
  private apiUrl = "http://localhost:5000/api/usuarios/";
  private url2 = "http://localhost:5000/api/usuarios/estado/";

  constructor(private http: HttpClient) { }

  get refresh() {
    return this.refresh$;
  }

  getUsuarios(): Observable<Usuario[]> {
    return this.http.get<Usuario[]>(this.apiUrl);
  }

  createUsuario(body: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.apiUrl, body)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      );
  }

  actualizarUsuario(id: string, body: Usuario): Observable<Usuario> {
    return this.http.put<Usuario>(`${this.apiUrl}${id}`, body);
  }

  getOneUsuario(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.apiUrl}${id}`);
  }

  EliminarUsuario(id: string): Observable<Usuario> {
    return this.http.delete<Usuario>(`${this.apiUrl}${id}`)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      );
  }

  actulizarEstado(id: string): Observable<Usuario> {
    return this.http.get<Usuario>(`${this.url2}${id}`)
      .pipe(
        tap(() => {
          this.refresh$.next();
        })
      );
  }

  actualizarContraseña(id: string, contrasena: string): Observable<any> {
    const body = { contrasena };
    return this.http.put(`${this.apiUrl}${id}/actualizar-contrasena`, body);
  }
}
