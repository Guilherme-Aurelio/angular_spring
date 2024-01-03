import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from './../login.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  constructor(private LoginService: LoginService, private Router: Router) {}
  login = '';
  hide = false;
  senha = '';
  mensagemErro = '';

  isPasswordVisible = false;

  get buttonText(): string {
    return this.hide ? 'Esconder a senha' : 'Exibir a senha';
  }

  toggleVisibility(): void {
    this.hide = !this.hide;
  }

onLogin(): void {
  this.mensagemErro = '';
    // Limpa o token do localStorage, se existir
    if (localStorage.getItem('token')) {
      localStorage.removeItem('token');
    }

  this.LoginService.login(this.login, this.senha).subscribe(
    (response) => {
      if (response && response.token) {
        localStorage.setItem('token', response.token);
        console.log('Token armazenado no localStorage:', response.token);
        this.Router.navigate(['/home']);
      } else {
        const token = response.json();
        if (!token) {
          this.mensagemErro = 'Login ou senha inválidos.';
        } else {
          this.mensagemErro = 'Ocorreu um erro ao processar o login. Por favor, tente novamente.';
        }
      }
    },
    (error) => {
      console.error('Erro ao realizar o login:', error);
      if (error.status === 401) {
        this.mensagemErro = 'Credenciais inválidas. Por favor, verifique seu login e senha.';
      } else {
        this.mensagemErro = 'Ocorreu um erro ao processar o login. Por favor, tente novamente.';
      }
    },
  );
}
}

