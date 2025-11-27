import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { AuthService } from '../../services/auth.service';
import { User } from '../../models/user.model';
import { 
  fadeInOut, 
  slideUp, 
  slideIn, 
  staggerSlideIn, 
  bounceIn, 
  fadeInScale,
  slideDown,
  scaleIn
} from '../../animations';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  animations: [fadeInOut, slideUp, slideIn, staggerSlideIn, bounceIn, fadeInScale, slideDown, scaleIn]
})
export class DashboardComponent implements OnInit {
  users: User[] = [];
  currentUser: User | null = null;
  showModal = false;
  showProfileModal = false;
  isEditing = false;
  errorMessage = '';
  successMessage = '';
  currentUserInfo: any;
  currentUserProfile: User | null = null;
  loading = false;
  loadingProfile = false;
  deletingUserId: number | null = null;

  userForm = {
    name: '',
    email: ''
  };

  constructor(
    private userService: UserService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.currentUserInfo = this.authService.getUser();
    this.loadUsers();
  }

  loadUsers(): void {
    this.loading = true;
    this.userService.getAllUsers().subscribe({
      next: (users) => {
        this.users = users;
        this.clearMessages();
        this.loading = false;
      },
      error: (error) => {
        this.loading = false;
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          this.showError('Erro ao carregar usuários: ' + (error.error?.error || error.message));
        }
      }
    });
  }

  openCreateModal(): void {
    this.isEditing = false;
    this.currentUser = null;
    this.userForm = { name: '', email: '' };
    this.showModal = true;
    this.clearMessages();
  }

  openEditModal(user: User): void {
    this.isEditing = true;
    this.currentUser = user;
    this.userForm = { name: user.name, email: user.email };
    this.showModal = true;
    this.clearMessages();
  }

  closeModal(): void {
    this.showModal = false;
    this.currentUser = null;
    this.userForm = { name: '', email: '' };
    this.clearMessages();
  }

  saveUser(): void {
    if (!this.userForm.name || !this.userForm.email) {
      this.showError('Por favor, preencha todos os campos');
      return;
    }

    if (this.isEditing && this.currentUser) {
      this.userService.updateUser(this.currentUser.id, this.userForm).subscribe({
        next: () => {
          this.showSuccess('Usuário atualizado com sucesso!');
          this.closeModal();
          this.loadUsers();
        },
        error: (error) => {
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          } else {
            this.showError('Erro ao atualizar usuário: ' + (error.error?.error || error.message));
          }
        }
      });
    } else {
      this.userService.createUser(this.userForm).subscribe({
        next: () => {
          this.showSuccess('Usuário criado com sucesso!');
          this.closeModal();
          this.loadUsers();
        },
        error: (error) => {
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          } else {
            this.showError('Erro ao criar usuário: ' + (error.error?.error || error.message));
          }
        }
      });
    }
  }

  deleteUser(id: number): void {
    if (confirm('Tem certeza que deseja excluir este usuário?')) {
      this.deletingUserId = id;
      this.userService.deleteUser(id).subscribe({
        next: () => {
          this.deletingUserId = null;
          this.showSuccess('Usuário excluído com sucesso!');
          this.loadUsers();
        },
        error: (error) => {
          this.deletingUserId = null;
          if (error.status === 401) {
            this.authService.logout();
            this.router.navigate(['/login']);
          } else {
            this.showError('Erro ao excluir usuário: ' + (error.error?.error || error.message));
          }
        }
      });
    }
  }

  openProfileModal(): void {
    this.showProfileModal = true;
    this.loadingProfile = true;
    this.errorMessage = '';
    
    this.userService.getMyProfile().subscribe({
      next: (profile) => {
        // Converter strings de data para objetos Date se necessário
        if (profile.createdAt && typeof profile.createdAt === 'string') {
          profile.createdAt = new Date(profile.createdAt);
        }
        if (profile.updatedAt && typeof profile.updatedAt === 'string') {
          profile.updatedAt = new Date(profile.updatedAt);
        }
        this.currentUserProfile = profile;
        this.loadingProfile = false;
      },
      error: (error) => {
        this.loadingProfile = false;
        if (error.status === 401) {
          this.authService.logout();
          this.router.navigate(['/login']);
        } else {
          this.showError('Erro ao carregar perfil: ' + (error.error?.error || error.message));
          this.closeProfileModal();
        }
      }
    });
  }

  closeProfileModal(): void {
    this.showProfileModal = false;
    this.currentUserProfile = null;
    this.loadingProfile = false;
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }

  showError(message: string): void {
    this.errorMessage = message;
    this.successMessage = '';
    setTimeout(() => this.clearMessages(), 5000);
  }

  showSuccess(message: string): void {
    this.successMessage = message;
    this.errorMessage = '';
    setTimeout(() => this.clearMessages(), 5000);
  }

  clearMessages(): void {
    this.errorMessage = '';
    this.successMessage = '';
  }
}

