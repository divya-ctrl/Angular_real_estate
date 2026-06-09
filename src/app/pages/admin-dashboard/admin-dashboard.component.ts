import { AsyncPipe, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { PropertyItem } from '../../models/property.model';
import { AuthService } from '../../services/auth.service';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [AsyncPipe, NgIf, RouterLink],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.scss'
})
export class AdminDashboardComponent {
  properties$: Observable<PropertyItem[]> = this.propertyService.getAllPropertiesForAdmin();
  deletingId = '';

  constructor(
    private readonly propertyService: PropertyService,
    private readonly authService: AuthService,
    private readonly router: Router
  ) {}

  async deleteProperty(property: PropertyItem): Promise<void> {
    if (!property.id) {
      return;
    }

    const confirmed = window.confirm(`Delete property "${property.title}"? This will also delete uploaded images.`);
    if (!confirmed) {
      return;
    }

    this.deletingId = property.id;
    try {
      await this.propertyService.deleteProperty(property.id, property.images ?? []);
    } finally {
      this.deletingId = '';
    }
  }

  async logout(): Promise<void> {
    await this.authService.logout();
    await this.router.navigate(['/']);
  }
}
