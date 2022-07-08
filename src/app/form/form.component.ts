import { isNgTemplate } from '@angular/compiler';
import { NgModel } from '@angular/forms';
import { Component, Input, OnInit } from '@angular/core';
import { SocketService } from '../survices/socket.service';
import { ApiService } from '../survices/api.service';
import { faPaperPlane } from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
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
    Swal.fire({
      title: `welcom to let's chat`,
      html: ` <form >
  <div style="display: flex; flex-direction: column;">
    <input type="text" id="userin" name="userin" placeholder="please enter a username" style="border-radius: 7px; height: 40px;">
    <label for="roomin" style="margin:2px 4px ;" > <h3> select a room</h3> </label>
    <select type="text" id="roomin" name="roomin"
    style="border-radius: 4px ; height:35px ;">
        <option value="one">one</option>
        <option value="two">two</option>
        <option value="three">three</option>
    </select>
    </div>
</form>`,

      confirmButtonText: 'next',
      focusConfirm: false,
      preConfirm: () => {
        const tmp1: any = Swal.getPopup()?.querySelector('#userin');
        let userin = tmp1.value;
        const tmp2: any = Swal.getPopup()?.querySelector('#roomin');
        let roomin = tmp2.value;
        if (!userin || !roomin) {
          Swal.showValidationMessage(`Please enter user and room`);
        }
        this.user = userin;
        this.room = roomin;
        
       let promise= new Promise((res,rej)=>{
        res(this.SocketSurvices.emit('join', { user: this.user, room: this.room }))
        rej()
       }).then(()=>{
this.ApiSurvice.fetchallusers().subscribe((data: any) => {
  let room = this.room;
  let temp = data[room];
  let obj: any = Object.values(temp);
  this.SocketSurvices.passUsers(obj);
});
       })
        
      },
    }).then().catch((err)=>console.log(err));
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

  constructor(
    private SocketSurvices: SocketService,
    private ApiSurvice: ApiService
  ) {}
}
