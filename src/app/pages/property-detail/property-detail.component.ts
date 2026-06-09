import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { environment } from '../../../environments/environment';
import { PropertyItem } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-property-detail',
  standalone: true,
  imports: [NgIf, RouterLink],
  templateUrl: './property-detail.component.html',
  styleUrl: './property-detail.component.scss'
})
export class PropertyDetailComponent implements OnInit {
  property: PropertyItem | null = null;
  selectedImage = '';
  loading = true;
  errorMessage = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly propertyService: PropertyService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      this.errorMessage = 'Property id is missing.';
      this.loading = false;
      return;
    }

    try {
      this.property = await this.propertyService.getPropertyById(id);
      this.selectedImage = this.property?.images?.[0] ?? '';
      this.errorMessage = this.property ? '' : 'Property not found.';
    } catch {
      this.errorMessage = 'Unable to load property details.';
    } finally {
      this.loading = false;
    }
  }

  selectImage(image: string): void {
    this.selectedImage = image;
  }

  whatsAppLink(): string {
    if (!this.property) {
      return '#';
    }

    const phone = (this.property.contactPhone || environment.defaultWhatsAppNumber).replace(/\D/g, '');
    const message = encodeURIComponent(`Hi SVR Property Landmark, I am interested in ${this.property.title} at ${this.property.location}. Please contact me.`);
    return `https://wa.me/${phone}?text=${message}`;
  }
}
