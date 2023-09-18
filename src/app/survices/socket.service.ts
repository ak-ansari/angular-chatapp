import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;
  temp:any;
  url = environment.SERVER_URL;
  object!: Object;

  constructor() {
    this.socket = io(this.url,{transports:["websocket"]});
  }
  listen(event_name: string, fun: (data: any) => void): Observable<any> {
    return this.socket.on(event_name, fun);
  }
  emit(event_name: string, data: any) {
    this.socket.emit(event_name, data);
  }
  private obs: Subject<any> = new Subject();

  passobject(object: object) {
    this.obs.next(object);
  }
  getmsg(): Observable<any> {
    return this.obs;
  }
  private Users: Subject<any> = new Subject();
  passUsers(data: string) {
    this.Users.next(data);
  }
  getUsers(): Observable<any> {
    return this.Users;
  }

  fetchdata() {}
}
