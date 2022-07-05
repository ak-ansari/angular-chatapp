import { Component, OnInit } from '@angular/core';
import { SocketService } from '../survices/socket.service';

@Component({
  selector: 'app-chatarea',
  templateUrl: './chatarea.component.html',
  styleUrls: ['./chatarea.component.css'],
})
export class ChatareaComponent implements OnInit {
  public allmsg: any = [];
  chatarea:any= document.querySelector('.chatarea');

  thisuser: any;
  outgoingmsg: any;
  constructor(private socketService: SocketService) {}

  ngOnInit(): void {
    

    this.socketService.getmsg().subscribe((data) => {
      data.class = 'outgoing';
      this.allmsg.push(data);
      
    });

    this.socketService.listen('message', (data) => {
      this.allmsg.push(data);
      
    });
    this.socketService.listen('join', (data) => {
      let userlist: any = {};
      userlist.name = `${data} joined the chat`;
      userlist.class = 'username';
      this.allmsg.push(userlist);
    });
    this.socketService.listen('left', (data) => {
      let userlist: any = {};
      userlist.name = `${data} left`;
      userlist.class = 'username';
      this.allmsg.push(userlist);
    });
  }
 
}
