import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { CadastrarFuncionarioBody, FuncionarioResponse } from '../models/funcionario.model';

@Injectable({
  providedIn: 'root',
})
export class FuncionariosService {
  http = inject(HttpClient);
  apiRoute = 'api/funcionario';

  buscarFuncionarios(): Observable<FuncionarioResponse[]> {
    return this.http.get<FuncionarioResponse[]>(`${environment.apiURL}/${this.apiRoute}`);
  }

  cadastrarFuncionario(funcionario: CadastrarFuncionarioBody): Observable<any> {
    // não tem retorno
    return this.http.post(`${environment.apiURL}/${this.apiRoute}`, funcionario);
  }
}
