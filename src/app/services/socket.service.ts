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
  public session;

  constructor(private _storageService: StorageService) {
    this.session = this._storageService.getCurrentSession();   
    this.connect();
  }

  connect(){
    this.socket = io(environment.SOCKET_ENDPOINT);
  }

  disconnect(){
    this.socket.disconnect();
  }

  onAlerts(): Observable<any> {
    return Observable.create((observer) => {
      this.socket.on('alertas_generales', (message) => {
        if (this.session.id === message.userId) {
          observer.next(message);
        }
      });
    });
  }

}
