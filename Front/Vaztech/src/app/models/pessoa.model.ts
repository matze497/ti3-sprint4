export interface PessoaResponse {
  id: number;
  nome: string;
  cpfCnpj: string;
  dataNascimento: string;
  origem: string;
}

export interface CadastrarPessoaBody {
  nome: string;
  cpfCnpj: string;
  dataNascimento: string;
  origem: string;
}

export interface AtualizarPessoaBody {
  nome?: string;
  cpfCnpj?: string;
  dataNascimento?: string;
  origem?: string;
}
