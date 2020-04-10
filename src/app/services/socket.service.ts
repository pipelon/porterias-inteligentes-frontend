import { Injectable } from '@angular/core';
import * as io from 'socket.io-client';
import { environment } from 'src/environments/environment';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SocketService {

  public socket;
  observer: Observer<any>;

  constructor() { }

  setupSocketConnection(): Observable<any> {
    this.socket = io(environment.SOCKET_ENDPOINT);

    this.socket.on('AlertaHorus', (data) => {
      this.observer.next(data);
    });
    return this.createObservable();    
  }

  createObservable(): Observable<number> {
    return new Observable(observer => {
      this.observer = observer;
    });
  }
}
