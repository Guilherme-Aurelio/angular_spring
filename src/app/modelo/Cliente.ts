export interface Cliente {
  id: number;
  nome: string;
  endereco: Endereco;
}

export interface Endereco {
  rua: string;
  numero: number;
  bairro: string;
  cep: string;
}