import { isNgTemplate } from '@angular/compiler';
import { NgModel } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from '../survices/socket.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
let msg: string = '0';
@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css'],
})
export class FormComponent implements OnInit {
  public val: any;
  public user?: any;
  public msg?:string;
  public object!:{user:string,msg:string,class?:string};
  faPaperPlane=faPaperPlane;
  
 
  ngOnInit(): void {
    let user: any;
    // do {
    //   user = prompt('please enter your name');
    // } while (!user);
    this.user = user;
    this.SocketSurvices.emit('join',user)
  }
  typeingmsg(){
    this.SocketSurvices.emit('type',this.user)
  }

  getvalue(value:string) {
    this.val = '';
    this.msg=value;
   let obj={
    user:this.user,
    msg:this.msg,
    class:'incoming'

  }
  this.object=obj
    this.SocketSurvices.emit('message',obj)
    this.SocketSurvices.passobject(this.object);
  
  }


  constructor(private SocketSurvices: SocketService) {}
}
