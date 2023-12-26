import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Fornecedor } from './modelo/Fornecedor';

@Injectable({
  providedIn: 'root'
})
export class FornecedorService {

  private baseUrl = 'http://localhost:8080/fornecedores';

  constructor(private http: HttpClient) { }

  criarFornecedor(fornecedor: Fornecedor): Observable<any> {
    return this.http.post(this.baseUrl, fornecedor);
  }

  detalharFornecedor(id: number): Observable<Fornecedor> {
    return this.http.get<Fornecedor>(`${this.baseUrl}/${id}`);
  }

  listarFornecedores(): Observable<Fornecedor[]> {
    return this.http.get<any>('http://localhost:8080/fornecedores').pipe(
      map((response: any) => response.content)
    );
  }

  excluirFornecedor(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  atualizarFornecedor(fornecedor: Fornecedor): Observable<Fornecedor> {
    return this.http.put<Fornecedor>(this.baseUrl, fornecedor);
  }
}
