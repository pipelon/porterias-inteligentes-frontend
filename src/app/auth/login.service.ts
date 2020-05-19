import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private api = environment.urlApi;
  private serviceLogin: string = `api/login`;
  private serviceLogout: string = `api/logout`;

  constructor(private _http: HttpClient) { }

  login(form: any): Observable<User> {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Skip-Interceptor': "true"
    });
    let options = { headers: headers };
    return this._http.post<User>(`${this.api}${this.serviceLogin}`,
      { 'username': form.username, 'password': form.password },
      options)
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  logout() {
    let headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Skip-Interceptor': "true"
    });
    let options = { headers: headers };
    return this._http.post(`${this.api}${this.serviceLogout}`, {})
      .pipe(
        retry(3), // retry a failed request up to 3 times
        catchError(this.handleError) // then handle the error
      );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // Se produjo un error en el lado del cliente o en la red.
      console.error('Error', error.error.message);
    } else {
      // El servidor devolvió un código de respuesta fallido.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Mensaje generico para el usuario
    return throwError('Algo malo sucedió; Por favor, inténtelo de nuevo más tarde');
  };
}