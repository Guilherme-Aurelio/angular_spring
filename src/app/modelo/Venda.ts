import { ItemVenda } from './ItemVenda';
import { Cliente } from "./Cliente"; // Importe o modelo do cliente, se existir

export interface Venda {
  dataHora: string; // Ou use o tipo Date se preferir
  totalVenda: number; // Ou use o tipo BigDecimal se necessário
  itensVendas: ItemVenda[];
  cliente: {
    id: number;
  };


}
