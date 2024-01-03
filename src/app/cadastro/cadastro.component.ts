import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { Usuario } from '../modelo/Usuario';
@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {
  submitted = false;
  hasError = false;
  novoUsuario: Usuario = {
    id: 0,
    login: '',
    senha: ''
  };

  constructor(private LoginService: LoginService, private router: Router,) { }

  cadastrarParticipante(): void {
    this.LoginService.criarUsuario(this.novoUsuario).subscribe(
      (data: Usuario) => {
        console.log('Usuario criado:', data);
        // Limpar os campos após o cadastro bem-sucedido
        this.novoUsuario = {
          id: 0,
          login: '',
          senha: '',
        };
        this.redirecionarParaLogin();
      },
      (error: any) => {
        console.error('Erro ao cadastrar o participante:', error);
      }
    );
  }
  redirecionarParaLogin(): void {
    this.router.navigate(['/login']);
  }
}
