import { Component } from '@angular/core';
import { LoginService } from './../login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'] // Corrija o nome da propriedade aqui
})
export class HomeComponent {
  constructor(private LoginService: LoginService, private router: Router) {}

  onLogoff(): void {
    this.LoginService.logoff();
    this.router.navigate(['/login']);
  }
}

