import { Component, OnInit  } from '@angular/core';
import { Produto } from '../modelo/Produto';
import { ProdutoService } from '../produto.service';
import { LoginService } from './../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrl: './produto.component.css'
})
export class ProdutoComponent implements OnInit{
  produtos: Produto[] = [];
  novoProduto: Produto = {
    id: 0,
    nome: '',
    descricao: '',
    quantidadeEstoque: 0,
    preco: 0,
    fabricante: {
      id: 0
    },
    categoria: {
      id: 0
    }
  };

  produtoDetalhado: Produto | null = null;

  constructor(private produtoService: ProdutoService, private router: Router, private LoginService: LoginService) { }

  ngOnInit(): void {
    this.carregarProdutos();
  }

  carregarProdutos(): void {
    this.produtoService.listarProdutos().subscribe(
      (data: Produto[]) => {
        this.produtos = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  criarNovoProduto(): void {
    this.produtoService.criarProduto(this.novoProduto).subscribe(
      () => {
        this.novoProduto = {
          id: 0,
          nome: '',
          descricao: '',
          quantidadeEstoque: 0,
          preco: 0,
          fabricante: {
            id: 0
          },
          categoria: {
            id: 0
          }
        };
        this.carregarProdutos();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  detalharProduto(id: number): void {
    this.produtoService.detalharProduto(id).subscribe(
      (data: any) => {
        this.produtoDetalhado = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  excluirProduto(id: number): void {
    this.produtoService.excluirProduto(id).subscribe(
      () => {
        this.carregarProdutos();
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
}
