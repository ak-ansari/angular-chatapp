import { isNgTemplate } from '@angular/compiler';
import { NgModel } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from '../survices/socket.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {


  public val: any;
  public user?: any;
  public room?: any;
  public msg?: string;
  public object!: { user: string; msg: string; class?: string; room: string };
  faPaperPlane = faPaperPlane;

  ngOnInit(): void {
    let user: any;
    let room: any;
    let proceed: boolean = false;
    do {
      user = prompt('please enter your name');
    } while (!user);
    do {
      room = prompt('select a room(one , two , three)');
      if (room == 'one' || room == 'two' || room == 'three') {
        proceed = true;
      }
    } while (!proceed);
     const welcome = new Audio();
     welcome.src = '../../assets/wellcome.mp3';
     setTimeout(()=>{

       welcome.play();
     },100)
    this.user = user;
    this.room = room;

    this.SocketSurvices.passroom(this.room);
    this.SocketSurvices.emit('join', { user: this.user, room: this.room });
  }
  typeingmsg() {
    this.SocketSurvices.emit('type', { msg: this.user, room: this.room });
  }

  getvalue(value: string) {
   
    this.val = '';
    this.msg = value;
    let obj = {
      user: this.user,
      msg: this.msg,
      room: this.room,
      class: 'incoming',
    };
    this.object = obj;
    this.SocketSurvices.emit('message', this.object);
    this.SocketSurvices.passobject(this.object);
  }

  constructor(private SocketSurvices: SocketService) {}
}
