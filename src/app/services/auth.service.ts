import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  private loginUrl = "http://localhost:5000/login"
  private registerUrl = "http://localhost:5000/register";


  login(email: string, contrasena: string): Observable<any> {
    const body = { email, contrasena };
    return this.http.post(this.loginUrl, body)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }

  register(userData: any): Observable<any> {
    return this.http.post(this.registerUrl, userData)
      .pipe(
        catchError((error: any) => throwError(error))
      );
  }


  //logica del guard para proteccion de directivas
  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }
}
