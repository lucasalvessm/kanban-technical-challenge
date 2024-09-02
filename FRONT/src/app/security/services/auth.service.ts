import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private api = `${environment.apiUrl}/login`;

  constructor(private http: HttpClient) {}

  login(login: string, senha: string): Observable<boolean> {
    return this.http.post(this.api, { login, senha }).pipe(
      map((accessToken: any) => {
        if (accessToken) {
          localStorage.setItem('accessToken', accessToken);
        }

        return !!accessToken;
      })
    );
  }
}
