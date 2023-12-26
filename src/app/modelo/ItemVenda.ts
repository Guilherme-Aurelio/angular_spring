import { Produto } from "./Produto"; // Importe o modelo de Produto, se existir
import { Venda } from "./Venda"; // Importe o modelo de Venda, se existir

export interface ItemVenda {
  id: number;
  quantidade: number;
  preco: number;
  produto: {
    id: number;
  };
  //venda: Venda;
}
