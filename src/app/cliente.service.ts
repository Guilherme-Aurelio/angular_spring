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

  criarCliente(cliente: Cliente): Observable<any> {
    return this.http.post(`${this.baseUrl}`, cliente);
  }

  atualizarCliente(cliente: Cliente): Observable<any> {
    return this.http.put(`${this.baseUrl}`, cliente);
  }

  listarClientes(): Observable<Cliente[]> {
    return this.http.get<any>('http://localhost:8080/clientes').pipe(
      map((response: any) => response.content)
    );
  }
  detalharCliente(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  excluirCliente(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
