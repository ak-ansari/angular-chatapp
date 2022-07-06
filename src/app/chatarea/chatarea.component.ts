import { Component, ElementRef, OnInit,ViewChild } from '@angular/core';
import { ApiService } from '../survices/api.service';
import { SocketService } from '../survices/socket.service';

@Component({
  selector: 'app-chatarea',
  templateUrl: './chatarea.component.html',
  styleUrls: ['./chatarea.component.css'],
})
export class ChatareaComponent implements OnInit {
  @ViewChild('chat') chat!: ElementRef;
  scroll() {
    this.chat.nativeElement.scrollTop=this.chat.nativeElement.scrollHeight;

  }
  
  public allmsg: any = [];
  listofusers:any;
  public temp:any;
  public room:any;

  thisuser: any;
  outgoingmsg: any;
  constructor(private socketService: SocketService, private apiservice:ApiService) {}

  ngOnInit(): void {
    this.socketService.getroom().subscribe((data)=>{
    this.room=data;})
    this.socketService.getmsg().subscribe((data) => {
      data.class = 'outgoing';
      this.allmsg.push(data);
      setTimeout(() => {
         this.scroll();
       }, 100);
    });

    this.socketService.listen('message', (data) => {
      console.log(data);
      this.allmsg.push(data);
      this.temp='';
      setTimeout(() => {
        this.scroll();
      }, 100);
      
    });
    
    this.socketService.listen('join', (data) => {
      let userlist: any = {};
      
      userlist.name = `${data} joined the chat`;
      userlist.class = 'username';
      this.allmsg.push(userlist);
      setTimeout(() => {
        this.scroll();
      }, 100);
    });
    this.socketService.listen('left', (data) => {
      let userlist: any = {};
      userlist.name = `${data} left`;
      userlist.class = 'username';
      this.allmsg.push(userlist);
      setTimeout(() => {
        this.scroll();
      }, 100);
    
    });
    this.socketService.listen('type',(data)=>{
this.temp=`${data.msg} is typing.....`;

    });
    this.apiservice.fetchallusers().subscribe((obj:any)=>{
  
  let room=this.room
  let temp=obj[room];
  if(Object.values(temp).length!==0){
    this.listofusers = `users in this room : ${Object.values(temp)}`;

  }
  

    })
  }
}
