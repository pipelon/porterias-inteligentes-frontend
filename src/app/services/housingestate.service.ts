import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { HttpErrorResponse, HttpClient } from '@angular/common/http';
import { HousingEstate } from '../models/housingestate';
import { environment } from 'src/environments/environment';
import { catchError, retry } from 'rxjs/operators';
 
@Injectable({
  providedIn: 'root'
})
export class HousingestateService {

  private api = environment.urlApi;
  private serviceUrl: string = `api/view`;

  constructor(private _http: HttpClient) { }

  getHousingEstates(): Observable<HousingEstate> {
    return this._http.get<HousingEstate>(`${this.api}${this.serviceUrl}`)
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
