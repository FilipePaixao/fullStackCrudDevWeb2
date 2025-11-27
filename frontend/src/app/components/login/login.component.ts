import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { fadeInScale, slideUp, fadeInOut } from '../../animations';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  animations: [fadeInScale, slideUp, fadeInOut]
})
export class LoginComponent {
  isLoginMode = true;
  loading = false;
  errorMessage = '';
  
  loginForm = {
    email: '',
    password: ''
  };

  registerForm = {
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  };

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = '';
    this.loginForm = { email: '', password: '' };
    this.registerForm = { name: '', email: '', password: '', confirmPassword: '' };
  }

  login(): void {
    // Trim para remover espaços em branco
    const email = this.loginForm.email?.trim();
    const password = this.loginForm.password?.trim();

    if (!email || !password) {
      this.errorMessage = 'Por favor, preencha todos os campos';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login({ email, password }).subscribe({
      next: () => {
        this.router.navigate(['/dashboard']);
      },
      error: (error) => {
        this.errorMessage = error.error?.error || 'Erro ao fazer login';
        this.loading = false;
      }
    });
  }

  register(): void {
    // Trim para remover espaços em branco
    const name = this.registerForm.name?.trim();
    const email = this.registerForm.email?.trim();
    const password = this.registerForm.password?.trim();
    const confirmPassword = this.registerForm.confirmPassword?.trim();

    if (!name || !email || !password || !confirmPassword) {
      this.errorMessage = 'Por favor, preencha todos os campos';
      return;
    }

    if (password !== confirmPassword) {
      this.errorMessage = 'As senhas não coincidem';
      return;
    }

    if (password.length < 6) {
      this.errorMessage = 'A senha deve ter no mínimo 6 caracteres';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.register({
      name,
      email,
      password
    }).subscribe({
      next: () => {
        // Após registro, fazer login automaticamente
        this.authService.login({
          email,
          password
        }).subscribe({
          next: () => {
            this.router.navigate(['/dashboard']);
          },
          error: (error) => {
            this.errorMessage = 'Registro realizado, mas erro ao fazer login: ' + (error.error?.error || error.message);
            this.loading = false;
          }
        });
      },
      error: (error) => {
        this.errorMessage = error.error?.error || 'Erro ao registrar';
        this.loading = false;
      }
    });
  }
}

