import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
let url = 'https://angular-chat-app-backend.herokuapp.com/';
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  fetchallusers(){
    return this.http.get(url)
  }

  constructor(private http:HttpClient) { }
}
