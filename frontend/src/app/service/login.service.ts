import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginData, LoginResponse } from '../interface/login.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  constructor(private http: HttpClient) {}

  login(payload: LoginData): Observable<LoginResponse> {
    const url = `${environment.api_url}/admin/login`;
    return this.http.post<LoginResponse>(url, payload);
  }

  isLoggedIn(token: string): Observable<LoginResponse> {
    const url = `${environment.api_url}/admin/verify-login`;
    return this.http.post<LoginResponse>(url, { token });
  }
}
