import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, catchError, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  private loginUrl = "http://localhost:5000"


  login(email: string, contrasena: string): Observable<any> {
    const body = { email, contrasena };
    return this.http.post(`${this.loginUrl}/login`, body);
  }

}
