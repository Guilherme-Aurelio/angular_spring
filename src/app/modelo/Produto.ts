import { Categoria } from './Categoria';
import { Fabricante } from './Fabricante'; // Substitua './models' pelo caminho correto do arquivo onde esses tipos estão definidos

export interface Produto {
  id: number;
  nome: string;
  descricao: string;
  quantidadeEstoque: number;
  preco: number;
  categoria: {
    id: number;
  };
  fabricante: {
    id: number;
  };
}
