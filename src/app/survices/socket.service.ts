import { Injectable } from '@angular/core';
import { io } from 'socket.io-client';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class SocketService {
  socket: any;
  temp:any;
  url='http://localhost:3000'
  // url = 'https://angular-chat-app-backend.herokuapp.com/';
  object!: Object;

  private obs: Subject<any> = new Subject();
  private room: Subject<any> = new Subject();

  constructor() {
    this.socket = io(this.url);
  }
  listen(event_name: string, fun: (data: any) => void): Observable<any> {
    return this.socket.on(event_name, fun);
  }
  emit(event_name: string, data: any) {
    this.socket.emit(event_name, data);
  }
  passobject(object: object) {
    // return (this.object = object);

    this.obs.next(object);
  }
  passroom(data:string){
    this.room.next(data);
  }
  getroom():Observable<any>{
    return this.room;
  }

  getmsg(): Observable<any> {
    return this.obs;
  }
  fetchdata() {}
}
