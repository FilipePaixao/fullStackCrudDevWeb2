import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../models/user.model';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api';

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) {}

  private getHeaders(): HttpHeaders {
    const token = this.authService.getToken();
    return new HttpHeaders({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
  }

  getAllUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, { headers: this.getHeaders() });
  }

  getUserById(id: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${id}`, { headers: this.getHeaders() });
  }

  createUser(user: { name: string; email: string }): Observable<User> {
    return this.http.post<User>(`${this.apiUrl}/users`, user, { headers: this.getHeaders() });
  }

  updateUser(id: number, user: { name: string; email: string }): Observable<User> {
    return this.http.put<User>(`${this.apiUrl}/users/${id}`, user, { headers: this.getHeaders() });
  }

  deleteUser(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/users/${id}`, { headers: this.getHeaders() });
  }

  getMyProfile(): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/me`, { headers: this.getHeaders() });
  }
}

