import { Component, inject } from '@angular/core';
import { FuncionariosService } from '../../../services/funcionarios.service';
import { CadastrarFuncionarioBody, FuncionarioResponse } from '../../../models/funcionario.model';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import { DatePipe } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { InputTextModule } from 'primeng/inputtext';
import { FormsModule, NgForm } from '@angular/forms';
import { DialogModule } from 'primeng/dialog';
import { InputOtpModule } from 'primeng/inputotp';
import { MessageModule } from 'primeng/message';
import { CheckboxModule } from 'primeng/checkbox';
import { CpfPipe } from '../../../pipes/cpf.pipe';
import { ToolbarModule } from 'primeng/toolbar';
import { FieldsetModule } from 'primeng/fieldset';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { DatePickerModule } from 'primeng/datepicker';
import { InputMaskModule } from 'primeng/inputmask';
import { ScrollPanelModule } from 'primeng/scrollpanel';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';

@Component({
  imports: [
    CpfPipe,
    ToastModule,
    ScrollPanelModule,
    InputMaskModule,
    DatePickerModule,
    InputOtpModule,
    IconFieldModule,
    InputIconModule,
    CardModule,
    MessageModule,
    ButtonModule,
    FieldsetModule,
    DatePipe,
    ToolbarModule,
    AvatarModule,
    DialogModule,
    InputTextModule,
    FormsModule,
    InputOtpModule,
    CheckboxModule,
  ],
  selector: 'app-funcionarios',
  styleUrl: './funcionarios.css',
  templateUrl: './funcionarios.html',
  providers: [MessageService],
  standalone: true,
})
export class FuncionariosComponent {
  funcionariosService = inject(FuncionariosService);
  toastService = inject(MessageService);

  funcionarios: FuncionarioResponse[] = [];

  modalCadastrarFuncionarioAberto: boolean = false;
  modalMudarCodigoAberto: boolean = false;
  mudandoCodigoID: number | undefined = undefined;

  ngOnInit() {
    this.buscarFuncionarios();
  }

  esconderMudarCodigoModal(form: NgForm) {
    this.mudandoCodigoID = undefined;
    form.resetForm();
  }

  esconderCadastrarFuncionarioModal(form: NgForm) {
    form.resetForm();
  }

  abrirModalMudarCodigo(id: number) {
    this.mudandoCodigoID = id;
    this.modalMudarCodigoAberto = true;
  }

  abrirModalCadastrarFuncionario() {
    this.modalCadastrarFuncionarioAberto = true;
  }

  enviarMudarCodigoForm(form: NgForm) {
    if (form.invalid) return;
    console.log(
      `Mudando código do funcionário id(${this.mudandoCodigoID}) para: ${form.value.codigo}`,
    );
    this.modalMudarCodigoAberto = false;
    this.mudandoCodigoID = undefined;
  }

  enviarCadastrarFuncionarioForm(form: NgForm) {
    if (form.invalid) return;
    const { entendi, ...funcionario } = form.value;
    this.funcionariosService
      .cadastrarFuncionario(funcionario as CadastrarFuncionarioBody)
      .subscribe({
        next: () => {
          this.toastService.add({
            summary: 'Cadastrado!',
            detail: 'O funcionário foi cadastrado com sucesso',
            severity: 'success',
          });
          this.buscarFuncionarios();
        },
        error: (err) => {
          console.error(err);
          this.toastService.add({
            summary: 'Erro!',
            detail: err.error.erro,
            severity: 'error',
          });
        },
      });
    this.modalCadastrarFuncionarioAberto = false;
    form.resetForm();
  }

  private buscarFuncionarios() {
    this.funcionariosService.buscarFuncionarios().subscribe({
      next: (funcionarios: FuncionarioResponse[]) => {
        this.funcionarios = [...funcionarios];
      },
      error: (err) => {
        console.error(err);
        this.toastService.add({
          summary: 'Erro ao carregar!',
          detail: err.error.erro,
          severity: 'error',
        });
      },
    });
  }
}
