import { Cliente } from './../modelo/Cliente';
import { ClienteService } from './../cliente.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../login.service';

@Component({
  selector: 'app-cliente',
  templateUrl: './cliente.component.html',
  styleUrl: './cliente.component.css'
})
export class ClienteComponent {
  clientes: Cliente[] = [];
  novocliente: Cliente = {
    id: 0,
    nome: '',
    rua:'',
    numero: 0,
    bairro:'',
    cep:'',
  };
  clienteDetalhado: Cliente | null = null;
  clienteEditando = false;
  constructor(private clienteService: ClienteService, private router: Router, private LoginService: LoginService) { }

  ngOnInit(): void {
    this.carregarClientes();
  }
  carregarClientes(): void {
    this.clienteService.listarClientes().subscribe(
      (data: Cliente[]) => {
        this.clientes = data;
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
  criarNovaCliente(): void {
    this.clienteService.criarCliente(this.novocliente).subscribe(
      () => {
        this.novocliente = {
          id: 0,
          nome: '',
          rua:'',
          numero: 0,
          bairro:'',
          cep:''
        };
        this.carregarClientes();
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  atualizarCliente(): void {
    if (this.clienteDetalhado) {
      this.clienteService.atualizarCliente(this.clienteDetalhado).subscribe(
        () => {
          this.clienteDetalhado = { id: 0, nome: '', rua: '', numero: 0, bairro: '', cep: '' };
          this.carregarClientes();
        },
        (error: any) => {
          console.error(error);
        }
      );
    }
  }
  editarCliente(cliente: Cliente): void {
    this.clienteDetalhado = { ...cliente }; // Clona a cliente para editar
    this.clienteEditando = true;
  }

  cancelarEdicao(): void {
    this.clienteDetalhado = null;
    this.clienteEditando = false;
  }
  detalharCliente(id: number): void {
    this.clienteService.detalharCliente(id).subscribe(
      (data: any) => {
        this.clienteDetalhado = data;
      },
      (error: any) => {
        console.error(error);
      }
    );
  }

  excluirCliente(id: number): void {
    this.clienteService.excluirCliente(id).subscribe(
      () => {
        this.carregarClientes();
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
