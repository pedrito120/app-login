import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'http://localhost:8080/'; 

  constructor(private http: HttpClient) { }

  login(data: any): Observable<any> {
    console.log(data);
    return this.http.post(this.apiUrl + 'login', {email: data.email, password:data.password})
  }

  setLoggedIn(success : string){
    localStorage.setItem('success',success);
  }
  
  isLoggedIn(): boolean {
    const success = localStorage.getItem("success");

    if(success){
      return true;

    }else{
      return false;
    }
  }
}
