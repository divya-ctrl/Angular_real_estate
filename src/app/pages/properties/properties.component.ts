import { AsyncPipe, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { combineLatest, map, Observable, startWith, Subject } from 'rxjs';
import { environment } from '../../../environments/environment';
import { PropertyItem } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';

@Component({
  selector: 'app-properties',
  standalone: true,
  imports: [AsyncPipe, FormsModule, NgIf, RouterLink],
  templateUrl: './properties.component.html',
  styleUrl: './properties.component.scss'
})
export class PropertiesComponent implements OnInit {
  locationText = '';
  typeText = '';
  private readonly filterChanged$ = new Subject<void>();
  properties$!: Observable<PropertyItem[]>;

  constructor(
    private readonly propertyService: PropertyService,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParamMap.subscribe((params) => {
      this.locationText = params.get('location') ?? '';
      this.filterChanged$.next();
    });

    this.properties$ = combineLatest([
      this.propertyService.getPublicProperties(),
      this.filterChanged$.pipe(startWith(undefined))
    ]).pipe(
      map(([properties]) => this.applyFilters(properties))
    );
  }

  onFilterChange(): void {
    this.filterChanged$.next();
  }

  clearFilters(): void {
    this.locationText = '';
    this.typeText = '';
    this.onFilterChange();
  }

  imageFor(property: PropertyItem): string | null {
    return property.images?.length ? property.images[0] : null;
  }

  whatsAppLink(property: PropertyItem): string {
    const phone = (property.contactPhone || environment.defaultWhatsAppNumber).replace(/\D/g, '');
    const message = encodeURIComponent(`Hi SVR Property Landmark, I am interested in ${property.title} at ${property.location}. Please share more details.`);
    return `https://wa.me/${phone}?text=${message}`;
  }

  private applyFilters(properties: PropertyItem[]): PropertyItem[] {
    const location = this.locationText.trim().toLowerCase();
    const type = this.typeText.trim().toLowerCase();

    return properties.filter((property) => {
      const haystack = `${property.title} ${property.location} ${property.type}`.toLowerCase();
      const matchLocation = !location || haystack.includes(location);
      const matchType = !type || property.type.toLowerCase() === type;
      return matchLocation && matchType;
    });
  }
}
