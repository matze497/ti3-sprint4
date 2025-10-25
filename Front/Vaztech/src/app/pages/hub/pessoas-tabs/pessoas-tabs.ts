import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { InputTextModule } from 'primeng/inputtext';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { PaginatorModule } from 'primeng/paginator';
import { DropdownModule } from 'primeng/dropdown';
import { AvatarModule } from 'primeng/avatar';
import { DatePipe } from '@angular/common';
import { PessoasService } from '../../../services/pessoas.service';
import { CadastrarPessoaBody, PessoaResponse, AtualizarPessoaBody } from '../../../models/pessoa.model';
import { CpfPipe } from '../../../pipes/cpf.pipe';

@Component({
  selector: 'app-pessoas-tabs',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    FormsModule,
    DialogModule,
    MessageModule,
    CheckboxModule,
    ToolbarModule,
    FieldsetModule,
    IconFieldModule,
    InputIconModule,
    DatePickerModule,
    InputMaskModule,
    InputTextModule,
    ToastModule,
    PaginatorModule,
    DropdownModule,
    AvatarModule,
    DatePipe,
    CpfPipe
  ],
  templateUrl: './pessoas-tabs.html',
  providers: [MessageService],
})
export class PessoasTabsComponent {
  pessoasService = inject(PessoasService);
  toastService = inject(MessageService);

  pessoas: PessoaResponse[] = [];
  pessoasPaginadas: PessoaResponse[] = [];

  modalCadastrarPessoaAberto: boolean = false;
  modalEditarPessoaAberto: boolean = false;
  pessoaSelecionada: PessoaResponse | null = null;

  first: number = 0;
  rows: number = 6;

  funcoes = [
    { label: 'Cliente', value: 'CLIENTE' },
    { label: 'Fornecedor', value: 'FORNECEDOR' }
  ];

  ngOnInit() {
    this.buscarPessoas();
  }

  onPageChange(event: any) {
    this.first = event.first;
    this.rows = event.rows;
    this.atualizarPaginacao();
  }

  atualizarPaginacao() {
    const inicio = this.first;
    const fim = this.first + this.rows;
    this.pessoasPaginadas = this.pessoas.slice(inicio, fim);
  }

  abrirModalCadastrarPessoa() {
    this.modalCadastrarPessoaAberto = true;
  }

  abrirModalEditarPessoa(pessoa: PessoaResponse) {
    this.pessoaSelecionada = { ...pessoa };
    this.modalEditarPessoaAberto = true;
  }

  esconderCadastrarPessoaModal(form: NgForm) {
    form.resetForm();
  }

  esconderEditarPessoaModal(form: NgForm) {
    this.pessoaSelecionada = null;
    form.resetForm();
  }

  enviarCadastrarPessoaForm(form: NgForm) {
    if (form.invalid) return;

    const pessoaData: CadastrarPessoaBody = {
      nome: form.value.nome,
      cpfCnpj: form.value.cpfCnpj,
      dataNascimento: form.value.dataNascimento,
      origem: form.value.origem
    };

    this.pessoasService.cadastrarPessoa(pessoaData).subscribe({
      next: () => {
        this.toastService.add({
          summary: 'Cadastrado!',
          detail: 'A pessoa foi cadastrada com sucesso',
          severity: 'success',
        });
        this.buscarPessoas();
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          summary: 'Erro!',
          detail: err.error.erro || 'Erro ao cadastrar pessoa',
          severity: 'error',
        });
      },
    });

    this.modalCadastrarPessoaAberto = false;
    form.resetForm();
  }

  enviarEditarPessoaForm(form: NgForm) {
    if (form.invalid || !this.pessoaSelecionada) return;

    const pessoaData: AtualizarPessoaBody = {
      nome: form.value.nome,
      cpfCnpj: form.value.cpfCnpj,
      dataNascimento: form.value.dataNascimento,
      origem: form.value.origem
    };

    this.pessoasService.atualizarPessoa(this.pessoaSelecionada.id, pessoaData).subscribe({
      next: () => {
        this.toastService.add({
          summary: 'Atualizado!',
          detail: 'A pessoa foi atualizada com sucesso',
          severity: 'success',
        });
        this.buscarPessoas();
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          summary: 'Erro!',
          detail: err.error.erro || 'Erro ao atualizar pessoa',
          severity: 'error',
        });
      },
    });

    this.modalEditarPessoaAberto = false;
    this.pessoaSelecionada = null;
    form.resetForm();
  }

  private buscarPessoas() {
    this.pessoasService.buscarPessoas().subscribe({
      next: (pessoas: PessoaResponse[]) => {
        this.pessoas = [...pessoas];
        this.atualizarPaginacao();
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          summary: 'Erro ao carregar!',
          detail: err.error?.erro || 'Erro ao buscar pessoas',
          severity: 'error',
        });
      },
    });
  }

  isCpf(cpfCnpj: string): boolean {
    return cpfCnpj.replace(/\D/g, '').length === 11;
  }
}
