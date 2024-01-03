import { FabricanteService } from './../fabricante.service';
import { Fabricante } from './../modelo/Fabricante';
import { Component } from '@angular/core';
import { LoginService } from './../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-fabricante',
  templateUrl: './fabricante.component.html',
  styleUrl: './fabricante.component.css'
})
export class FabricanteComponent {
  fabricantes: Fabricante[] = [];
  novafabricante: Fabricante = {
    id: 0,
    nome: '',
  };
  fabricanteDetalhada: Fabricante | null = null;
  fabricanteEditando = false;
  constructor(private fabricanteService: FabricanteService, private router: Router, private LoginService: LoginService) { }

  ngOnInit(): void {
    this.carregarFabricantes();
  }
  carregarFabricantes(): void {
    this.fabricanteService.listarFabricantes().subscribe(
      (data: Fabricante[]) => {
        this.fabricantes = data;
      },
      (error: any) => {
        if (error.status === 403) {
          // Tratar o erro 403 aqui
          // Por exemplo, mostrar uma mensagem de erro amigável
        } else {
          console.error(error);
        }
      }
    );
  }
  criarNovaFabricante(): void {
    this.fabricanteService.criarFabricante(this.novafabricante).subscribe(
      () => {
        this.novafabricante = {
          id: 0,
          nome: ''
        };
        this.carregarFabricantes();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  atualizarFabricante(): void {
    if (this.fabricanteDetalhada) {
      this.fabricanteService.atualizarFabricante(this.fabricanteDetalhada).subscribe(
        () => {
          this.fabricanteDetalhada = { id: 0, nome: '' };
          this.carregarFabricantes();
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
  editarFabricante(fabricante: Fabricante): void {
    this.fabricanteDetalhada = { ...fabricante }; // Clona a fabricante para editar
    this.fabricanteEditando = true;
  }

  cancelarEdicao(): void {
    this.fabricanteDetalhada = null;
    this.fabricanteEditando = false;
  }
  detalharFabricante(id: number): void {
    this.fabricanteService.detalharFabricante(id).subscribe(
      (data: any) => {
        this.fabricanteDetalhada = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  excluirFabricante(id: number): void {
    this.fabricanteService.excluirFabricante(id).subscribe(
      () => {
        this.carregarFabricantes();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }
  onLogoff(): void {
    this.LoginService.logoff();
    this.router.navigate(['/login']);
  }
  onHome(): void {
    this.router.navigate(['/home']);
  }
}
