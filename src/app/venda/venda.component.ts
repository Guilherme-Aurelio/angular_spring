import { Produto } from './../modelo/Produto';
import { ItemVenda } from './../modelo/ItemVenda';
import { Cliente } from './../modelo/Cliente';
import { Component } from '@angular/core';
import { VendaService } from '../venda.service';
import { Venda } from '../modelo/Venda';
import { LoginService } from './../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-venda',
  templateUrl: './venda.component.html',
  styleUrl: './venda.component.css'
})
export class VendaComponent {

  novaVenda: Venda = {
    dataHora: new Date().toISOString(), // Aqui você colocaria a data da venda, por exemplo: new Date().toISOString()
    totalVenda: 0,
    itensVendas: [], // Adicione os itens da venda, se necessário
    cliente: {
      id: 0
    }
  };

  constructor(private vendaService: VendaService, private router: Router, private LoginService: LoginService) { }

  adicionarItem(): void {
    const novoItem: ItemVenda = {
      id: 0,
      quantidade: 0,
      preco: 0,
      produto: {
        id: 0
      },
      //venda: this.novaVenda // Vincula o item à venda atual
    };
    this.novaVenda.itensVendas.push(novoItem);
  }

  cadastrarVenda(): void {
    this.vendaService.cadastrarVenda(this.novaVenda)
      .subscribe(
        (response) => {
          console.log('Venda cadastrada com sucesso!', response);
          // Lógica adicional após cadastrar a venda, se necessário
        },
        (error) => {
          console.error('Erro ao cadastrar venda:', error);
          // Tratamento de erro, feedback ao usuário, etc.
        }
      );
  }
  removerItem(index: number): void {
    this.novaVenda.itensVendas.splice(index, 1); // Remove o item da lista pelo índice
  }
  onLogoff(): void {
    this.LoginService.logoff();
    this.router.navigate(['/login']);
  }
}
