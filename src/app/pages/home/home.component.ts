import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [FormsModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {
  searchLocation = '';

  constructor(private readonly router: Router) {}

  searchProperties(): void {
    this.router.navigate(['/properties'], {
      queryParams: this.searchLocation.trim() ? { location: this.searchLocation.trim() } : {}
    });
  }
}
