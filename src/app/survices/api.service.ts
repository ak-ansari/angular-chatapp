import { Injectable } from '@angular/core';
import{HttpClient} from '@angular/common/http'
import { environment } from 'src/environments/environment';
// let url = 'http://localhost:3000';
let url = environment.SERVER_URL;
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  
  fetchallusers(){
    return this.http.get(url)
  }

  constructor(private http:HttpClient) { }
}
