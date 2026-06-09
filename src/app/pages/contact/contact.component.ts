import { Component } from '@angular/core';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-contact',
  standalone: true,
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  phone = environment.companyPhone;
  email = environment.companyEmail;
  address = environment.companyAddress;

  whatsAppLink(): string {
    const phoneNumber = environment.defaultWhatsAppNumber.replace(/\D/g, '');
    const message = encodeURIComponent('Hi SVR Property Landmark, I would like to know more about your property services.');
    return `https://wa.me/${phoneNumber}?text=${message}`;
  }
}
