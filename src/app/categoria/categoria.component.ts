import { LoginService } from './../login.service';
import { CategoriaService } from './../categoria.service';
import { Component } from '@angular/core';
import { Categoria } from '../modelo/Categoria';
import { Router } from '@angular/router';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.css'
})
export class CategoriaComponent {
  categorias: Categoria[] = [];
  novaCategoria: Categoria = {
    id: 0,
    nome: '',
  };
  CategoriaDetalhada: Categoria | null = null;
  CategoriaEditando = false;
  constructor(private categoriaService: CategoriaService, private router: Router, private LoginService: LoginService) { }

  ngOnInit(): void {
    this.carregarCategorias();
  }
  carregarCategorias(): void {
    this.categoriaService.listarCategorias().subscribe(
      (data: Categoria[]) => {
        this.categorias = data;
      },
      (error: any) => {
        if (error.status === 403) {
        } else {
          console.error(error);
        }
      }
    );
  }
  criarNovaCategoria(): void {
    this.categoriaService.criarCategoria(this.novaCategoria).subscribe(
      () => {
        this.novaCategoria = {
          id: 0,
          nome: ''
        };
        this.carregarCategorias();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  atualizarCategoria(): void {
    if (this.CategoriaDetalhada) {
      this.categoriaService.atualizarCategoria(this.CategoriaDetalhada).subscribe(
        () => {
          this.CategoriaDetalhada = { id: 0, nome: '' };
          this.carregarCategorias();
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
  editarCategoria(categoria: Categoria): void {
    this.CategoriaDetalhada = { ...categoria }; // Clona a categoria para editar
    this.CategoriaEditando = true;
  }

  cancelarEdicao(): void {
    this.CategoriaDetalhada = null;
    this.CategoriaEditando = false;
  }
  detalharCategoria(id: number): void {
    this.categoriaService.detalharCategoria(id).subscribe(
      (data: any) => {
        this.CategoriaDetalhada = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  excluirCategoria(id: number): void {
    this.categoriaService.excluirCategoria(id).subscribe(
      () => {
        this.carregarCategorias();
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
