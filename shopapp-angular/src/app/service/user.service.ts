import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { RegisterDTO } from '../dtos/user/register.dto';
import { LoginDTO } from '../dtos/user/login.dto';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = "http://localhost:8080/api/v1/users/register";
  private apiLogin =  "http://localhost:8080/api/v1/users/login";
  private apiConfig = {
    headers: this.createHeaders(),
  }

  private createHeaders() : HttpHeaders {
    return new HttpHeaders({'Content-Type' : 'application/json'});
  }

  constructor(private http: HttpClient) { }

  register(registerDTO : RegisterDTO):Observable<any> {
    return this.http.post(this.apiUrl, registerDTO, this.apiConfig);
  }

  login(loginDTO: LoginDTO): Observable<any> {    
    return this.http.post(this.apiLogin, loginDTO, this.apiConfig);
  }
}

