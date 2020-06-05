import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';
import { StorageService } from './../auth/storage.service';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket;
  observer: Observer<any>;
  public session;

  constructor(private _storageService: StorageService) {
    this.session = this._storageService.getCurrentSession();
  }

  setupSocketConnection(): Observable<any> {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('alertas_generales', (data) => {
      if (this.session.id === data.userId) {
        this.observer.next(data);
      }
    });
    
    return this.createObservable();
  }

  createObservable(): Observable<number> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }
}
