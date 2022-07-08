import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;
  temp:any;
  // url='http://localhost:3000'
  url = 'https://angular-chat-app-backend.herokuapp.com/';
  object!: Object;

  constructor() {
    this.socket = io(this.url);
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
