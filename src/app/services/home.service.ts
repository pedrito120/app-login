import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  private apiUrl = 'http://localhost:8080/'; 

  constructor(private http: HttpClient) { }

  setData(data: any): Observable<any> {
    return this.http.post(this.apiUrl + 'set_data', {data})
  }

}
