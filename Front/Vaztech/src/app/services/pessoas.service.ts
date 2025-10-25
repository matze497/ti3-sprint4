import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { AtualizarPessoaBody, CadastrarPessoaBody, PessoaResponse } from '../models/pessoa.model';

@Injectable({
  providedIn: 'root',
})
export class PessoasService {
  http = inject(HttpClient);
  apiRoute = 'api/pessoa';

  buscarPessoas(): Observable<PessoaResponse[]> {
    return this.http.get<PessoaResponse[]>(`${environment.apiURL}/${this.apiRoute}`);
  }

  cadastrarPessoa(pessoa: CadastrarPessoaBody): Observable<PessoaResponse> {
    return this.http.post<PessoaResponse>(`${environment.apiURL}/${this.apiRoute}`, pessoa);
  }

  atualizarPessoa(id: number, pessoa: AtualizarPessoaBody): Observable<PessoaResponse> {
    return this.http.put<PessoaResponse>(`${environment.apiURL}/${this.apiRoute}/${id}`, pessoa);
  }
}
