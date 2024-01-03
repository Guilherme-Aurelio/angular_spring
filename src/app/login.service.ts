import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { Usuario } from './modelo/Usuario';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  private baseUrl = 'http://localhost:8080/login';
  private url = 'http://localhost:8080/login/usuario'
  constructor(private http: HttpClient) { }
  // Método para verificar se o token está expirado
  private isTokenExpired(token: string): boolean {
    const currentTimestamp = Math.floor(Date.now() / 1000);

    // Convertendo o token para número
    const tokenExpiration = parseInt(token, 10); // Supondo que o token seja um timestamp

    // Verificando se o token está expirado
    return tokenExpiration < currentTimestamp;
  }

  criarUsuario(usuario: Usuario): Observable<Usuario> {
    return this.http.post<Usuario>(this.url, usuario);
  }

  login(login: string, senha: string): Observable<any> {
    return this.http.post<any>(this.baseUrl, { login, senha }).pipe(
      tap((response) => {
        if (response && response.token) {
          // Verifica se o token atual está expirado
          const storedToken = localStorage.getItem('token');
          if (storedToken && this.isTokenExpired(storedToken)) {
            localStorage.removeItem('token'); // Remove o token expirado
          }

          localStorage.setItem('token', response.token);
        }
      })
    );
  }
  logoff(): void {
    localStorage.clear();
  }

  estaAutenticado(): boolean {
    if (localStorage.getItem('token')) {
      return true;
    }
    else {
      return false;
    }
  }
}
