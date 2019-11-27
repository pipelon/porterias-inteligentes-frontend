import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor() { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let claves = btoa(environment.username + ':' + environment.password);

        let idUnidadResidencial = (request.body && request.body.housingEstateID) ?
            request.body.housingEstateID :
            environment.idUnidadResidencial.toString();

        if (environment.username && environment.password) {

            const clonedAuthRequest = request.clone({
                headers: request.headers.set('Authorization', 'Basic ' + claves),
                url: request.url + '?idUnidadResidencial=' + idUnidadResidencial,
            });
            return this.nextHandle(clonedAuthRequest, next);

        }

        return next.handle(request);
    }

    /**
     * Funcion que continua la peticion luego de haber sido interceptada
     */
    nextHandle(clonedAuthRequest: any, next: HttpHandler) {
        return next.handle(clonedAuthRequest).pipe(
            catchError(err => {
                if (err instanceof HttpErrorResponse && err.status === 0) {
                    console.log('Check Your Internet Connection And Try again Later');
                }
                return throwError(err);
            })
        );
    }
}