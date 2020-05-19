import { Injectable, Injector } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { catchError } from 'rxjs/operators';
import { StorageService } from '../auth/storage.service';
import { Md5 } from 'ts-md5/dist/md5';

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {

    constructor(private _storage: StorageService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        if (!request.headers.has("X-Skip-Interceptor")) {

            let idUnidadResidencial = (request.body && request.body.housingEstateID) ?
                request.body.housingEstateID : '';

            let user = this._storage.getCurrentSession();
            let id = user.id.toString();
            const md5 = new Md5();
            let userId = md5.appendStr(id).end();

            const clonedAuthRequest = request.clone({
                url: request.url + '?user=' + userId,
            });
            return this.nextHandle(clonedAuthRequest, next);

        } else {
            const clonedAuthRequest = request.clone(
                {
                    headers: request.headers.delete('X-Skip-Interceptor', 'true')
                }
            );
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