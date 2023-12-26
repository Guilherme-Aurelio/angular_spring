import { Fabricante } from './modelo/Fabricante';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FabricanteService {

  private baseUrl = 'http://localhost:8080/fabricantes';

  constructor(private http: HttpClient) { }

  criarFabricante(fabricante: Fabricante): Observable<any> {
    return this.http.post(`${this.baseUrl}`, fabricante);
  }

  atualizarFabricante(fabricante: Fabricante): Observable<any> {
    return this.http.put(`${this.baseUrl}`, fabricante);
  }

  listarFabricantes(): Observable<Fabricante[]> {
    return this.http.get<any>('http://localhost:8080/fabricantes').pipe(
      map((response: any) => response.content)
    );
  }
  detalharFabricante(id: number): Observable<any> {
    return this.http.get(`${this.baseUrl}/${id}`);
  }

  excluirFabricante(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
