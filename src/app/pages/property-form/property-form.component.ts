import { NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { PropertyPayload } from '../../models/property.model';
import { PropertyService } from '../../services/property.service';

type PropertyFormControlName =
  | 'title'
  | 'location'
  | 'price'
  | 'area'
  | 'type'
  | 'description'
  | 'featuresText'
  | 'contactName'
  | 'contactPhone'
  | 'active';

@Component({
  selector: 'app-property-form',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgIf],
  templateUrl: './property-form.component.html',
  styleUrl: './property-form.component.scss'
})
export class PropertyFormComponent implements OnInit {
  propertyId = '';
  isEditMode = false;
  loading = false;
  saving = false;
  errorMessage = '';
  existingImages: string[] = [];
  imagesToDelete: string[] = [];
  selectedFiles: File[] = [];
  selectedPreviews: string[] = [];

  readonly propertyTypes = [
    'Residential Land',
    'Commercial Land',
    'Agricultural Land',
    'Layout',
    'Construction',
    'Apartment',
    'Villa'
  ];

  readonly form = this.fb.nonNullable.group({
    title: ['', Validators.required],
    location: ['', Validators.required],
    price: ['', Validators.required],
    area: ['', Validators.required],
    type: ['Residential Land', Validators.required],
    description: ['', Validators.required],
    featuresText: [''],
    contactName: ['SVR Property Landmark', Validators.required],
    contactPhone: ['', Validators.required],
    active: [true]
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly propertyService: PropertyService
  ) {}

  async ngOnInit(): Promise<void> {
    const id = this.route.snapshot.paramMap.get('id');

    if (!id) {
      return;
    }

    this.isEditMode = true;
    this.propertyId = id;
    this.loading = true;

    try {
      const property = await this.propertyService.getPropertyById(id);

      if (!property) {
        this.errorMessage = 'Property not found.';
        return;
      }

      this.existingImages = [...property.images];
      this.form.patchValue({
        title: property.title,
        location: property.location,
        price: property.price,
        area: property.area,
        type: property.type,
        description: property.description,
        featuresText: property.features.join('\n'),
        contactName: property.contactName,
        contactPhone: property.contactPhone,
        active: property.active
      });
    } catch {
      this.errorMessage = 'Unable to load property for editing.';
    } finally {
      this.loading = false;
    }
  }

  onFilesSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFiles = Array.from(input.files ?? []);
    this.selectedPreviews.forEach((url) => URL.revokeObjectURL(url));
    this.selectedPreviews = this.selectedFiles.map((file) => URL.createObjectURL(file));
  }

  removeExistingImage(image: string): void {
    this.existingImages = this.existingImages.filter((item) => item !== image);
    this.imagesToDelete.push(image);
  }

  removeSelectedImage(index: number): void {
    URL.revokeObjectURL(this.selectedPreviews[index]);
    this.selectedFiles = this.selectedFiles.filter((_, itemIndex) => itemIndex !== index);
    this.selectedPreviews = this.selectedPreviews.filter((_, itemIndex) => itemIndex !== index);
  }

  async save(): Promise<void> {
    this.errorMessage = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const payload = this.toPayload();
    this.saving = true;

    try {
      if (this.isEditMode) {
        await this.propertyService.updateProperty(this.propertyId, payload, this.selectedFiles);
        //await Promise.all(this.imagesToDelete.map((url) => this.propertyService.deleteImage(url).catch(() => undefined)));
      } else {
        await this.propertyService.createProperty(payload, this.selectedFiles);
      }

      await this.router.navigate(['/admin']);
    } catch {
      this.errorMessage = 'Unable to save property. Check Firebase rules and try again.';
    } finally {
      this.saving = false;
    }
  }

  hasError(controlName: PropertyFormControlName): boolean {
    const control = this.form.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  private toPayload(): PropertyPayload {
    const value = this.form.getRawValue();

    return {
      title: value.title.trim(),
      location: value.location.trim(),
      price: value.price.trim(),
      area: value.area.trim(),
      type: value.type,
      description: value.description.trim(),
      features: this.parseFeatures(value.featuresText),
      images: [...this.existingImages],
      contactName: value.contactName.trim(),
      contactPhone: value.contactPhone.trim(),
      active: value.active
    };
  }

  private parseFeatures(value: string): string[] {
    return value
      .split(/[\n,]/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
}
