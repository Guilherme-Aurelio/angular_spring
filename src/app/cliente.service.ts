import { Cliente } from './modelo/Cliente';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  private baseUrl = 'http://localhost:8080/clientes';

  constructor(private http: HttpClient) { }

  criarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(this.baseUrl, cliente);
  }

  atualizarCliente(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.baseUrl}`, cliente);
  }

  listarClientes(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl).pipe(
      map((response: any) => response.content)
    );
  }
  detalharCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.baseUrl}/${id}`);
  }

  excluirCliente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
