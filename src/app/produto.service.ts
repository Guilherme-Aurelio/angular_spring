import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Produto } from './modelo/Produto';

@Injectable({
  providedIn: 'root'
})
export class ProdutoService {
  private baseUrl = 'http://localhost:8080/produtos';

  constructor(private http: HttpClient) { }

  criarProduto(produto: Produto): Observable<any> {
    return this.http.post(`${this.baseUrl}`, produto);
  }

  listarProdutos(): Observable<Produto[]> {
    return this.http.get<any>('http://localhost:8080/produtos').pipe(
      map((response: any) => response.content)
    );
  }
  detalharProduto(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  excluirProduto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
