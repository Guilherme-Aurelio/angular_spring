import { EntradaProdutoService } from './../entrada-produto.service';
import { EntradaProduto } from './../modelo/EntradaProduto';
import { Component } from '@angular/core';
import { LoginService } from './../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-entrada-produto',
  templateUrl: './entrada-produto.component.html',
  styleUrl: './entrada-produto.component.css'
})
export class EntradaProdutoComponent {
  entradasProduto: EntradaProduto[] = [];
  novaEntradaProduto: EntradaProduto = {
    id: 0,
    quantidade: 0,
    dataHora: new Date().toISOString(), // Defina conforme necessário
    fornecedor: {} as any, // Substitua 'any' pelo tipo correto de Fornecedor
    produto: {} as any, // Substitua 'any' pelo tipo correto de Produto
    preco: 0
  };
  entradaProdutoDetalhado: EntradaProduto | null = null;

  constructor(private entradaProdutoService: EntradaProdutoService, private router: Router, private LoginService: LoginService) { }

  ngOnInit(): void {
    this.carregarEntradasProduto();
  }

  carregarEntradasProduto(): void {
    this.entradaProdutoService.listarEntradaProdutos().subscribe(
      (data: EntradaProduto[]) => {
        this.entradasProduto = data;
      },
      (error: any) => {
        console.error(error);
        // Trate os erros conforme necessário
      }
    );
  }

  criarNovaEntradaProduto(): void {
    this.entradaProdutoService.criarEntradaProdutos(this.novaEntradaProduto).subscribe(
      () => {
        this.novaEntradaProduto = {
          id: 0,
          quantidade: 0,
          dataHora: '', // Defina conforme necessário
          fornecedor: {} as any, // Substitua 'any' pelo tipo correto de Fornecedor
          produto: {} as any, // Substitua 'any' pelo tipo correto de Produto
          preco: 0
        };
        this.carregarEntradasProduto();
      },
      (error: any) => {
        console.error(error);
        // Trate os erros conforme necessário
      }
    );
  }

  detalharFornecedor(id: number): void {
    this.entradaProdutoService.detalharEntradaProdutos(id).subscribe(
      (data: any) => {
        this.entradaProdutoDetalhado = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  excluirFornecedor(id: number): void {
    this.entradaProdutoService.excluirEntradaProdutos(id).subscribe(
      () => {
        this.carregarEntradasProduto();
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
