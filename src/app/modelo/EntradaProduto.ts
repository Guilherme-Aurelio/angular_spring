import { Fornecedor } from './Fornecedor'; // Importe o modelo de Fornecedor
import { Produto } from './Produto'; // Importe o modelo de Produto

export interface EntradaProduto {
  id: number;
  quantidade: number;
  dataHora: string; 
  fornecedor: Fornecedor;
  produto: Produto;
  preco: number;
}
