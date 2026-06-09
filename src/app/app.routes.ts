import { Routes } from '@angular/router';
import { adminGuard } from './guards/admin.guard';
import { HomeComponent } from './pages/home/home.component';
import { ServicesComponent } from './pages/services/services.component';
import { PropertiesComponent } from './pages/properties/properties.component';
import { PropertyDetailComponent } from './pages/property-detail/property-detail.component';
import { ContactComponent } from './pages/contact/contact.component';
import { AdminLoginComponent } from './pages/admin-login/admin-login.component';
import { AdminDashboardComponent } from './pages/admin-dashboard/admin-dashboard.component';
import { PropertyFormComponent } from './pages/property-form/property-form.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'SVR Property Landmark' },
  { path: 'services', component: ServicesComponent, title: 'Services | SVR Property Landmark' },
  { path: 'properties', component: PropertiesComponent, title: 'Properties | SVR Property Landmark' },
  { path: 'properties/:id', component: PropertyDetailComponent, title: 'Property Details | SVR Property Landmark' },
  { path: 'contact', component: ContactComponent, title: 'Contact | SVR Property Landmark' },
  { path: 'admin/login', component: AdminLoginComponent, title: 'Admin Login | SVR Property Landmark' },
  { path: 'admin', component: AdminDashboardComponent, canActivate: [adminGuard], title: 'Admin | SVR Property Landmark' },
  { path: 'admin/properties/new', component: PropertyFormComponent, canActivate: [adminGuard], title: 'Add Property | SVR Property Landmark' },
  { path: 'admin/properties/:id/edit', component: PropertyFormComponent, canActivate: [adminGuard], title: 'Edit Property | SVR Property Landmark' },
  { path: '**', component: NotFoundComponent, title: 'Page Not Found | SVR Property Landmark' }
];
