import { FornecedorService } from './../fornecedor.service';
import { Fornecedor } from './../modelo/Fornecedor';
import { Component } from '@angular/core';
import { LoginService } from './../login.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-fornecedor',
  templateUrl: './fornecedor.component.html',
  styleUrl: './fornecedor.component.css'
})
export class FornecedorComponent {
  fornecedores: Fornecedor[] = [];
  novofornecedor: Fornecedor = {
    id: 0,
    nome: '',
    endereco: {
      rua: '',
      numero: 0,
      bairro: '',
      cep: ''
    },
  };
  fornecedorDetalhado: Fornecedor | null = null;
  fornecedorEditando = false;
  constructor(private fornecedorService: FornecedorService, private router: Router, private LoginService: LoginService) { }

  ngOnInit(): void {
    this.carregarFornecedores();
  }
  carregarFornecedores(): void {
    this.fornecedorService.listarFornecedores().subscribe(
      (data: Fornecedor[]) => {
        this.fornecedores = data;
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
  criarNovoFornecedor(): void {
    this.fornecedorService.criarFornecedor(this.novofornecedor).subscribe(
      () => {
        this.novofornecedor = {
          id: 0,
          nome: '',
          endereco: {
            rua: '',
            numero: 0,
            bairro: '',
            cep: ''
          },
        };
        this.carregarFornecedores();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  atualizarFornecedor(): void {
    if (this.fornecedorDetalhado) {
      this.fornecedorService.atualizarFornecedor(this.fornecedorDetalhado).subscribe(
        () => {
          this.fornecedorDetalhado = {
            id: 0,
            nome: '',
            endereco: {
              rua: '',
              numero: 0,
              bairro: '',
              cep: ''
            },
          };
          this.carregarFornecedores();
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
  editarFornecedor(fornecedor: Fornecedor): void {
    this.fornecedorDetalhado = { ...fornecedor }; // Clona a fornecedor para editar
    this.fornecedorEditando = true;
  }

  cancelarEdicao(): void {
    this.fornecedorDetalhado = null;
    this.fornecedorEditando = false;
  }
  detalharFornecedor(id: number): void {
    this.fornecedorService.detalharFornecedor(id).subscribe(
      (data: any) => {
        this.fornecedorDetalhado = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  excluirFornecedor(id: number): void {
    this.fornecedorService.excluirFornecedor(id).subscribe(
      () => {
        this.carregarFornecedores();
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
