import { EntradaProduto } from './modelo/EntradaProduto';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EntradaProdutoService {

  private baseUrl = 'http://localhost:8080/fabricantes';

  constructor(private http: HttpClient) { }

  criarEntradaProdutos(entradaproduto: EntradaProduto): Observable<any> {
    return this.http.post(`${this.baseUrl}`, entradaproduto);
  }

  listarEntradaProdutos(): Observable<EntradaProduto[]> {
    return this.http.get<any>('http://localhost:8080/fabricantes').pipe(
      map((response: any) => response.content)
    );
  }
  detalharEntradaProdutos(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  excluirEntradaProdutos(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
