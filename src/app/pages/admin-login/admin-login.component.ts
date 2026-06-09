import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-admin-login',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './admin-login.component.html',
  styleUrl: './admin-login.component.scss'
})
export class AdminLoginComponent {
  errorMessage = '';
  loading = false;

  constructor(
    public readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async login(): Promise<void> {
    this.loading = true;
    this.errorMessage = '';

    try {
      const user = await this.authService.signInWithGoogle();

      if (!this.authService.isAdmin(user)) {
        this.errorMessage = 'This Gmail ID is not authorized for admin access.';
        await this.authService.logout();
        return;
      }

      await this.router.navigate(['/admin']);
    } catch {
      this.errorMessage = 'Google login failed. Please try again.';
    } finally {
      this.loading = false;
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
  }
}
