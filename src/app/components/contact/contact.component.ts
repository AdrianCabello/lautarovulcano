import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LucideModule } from '../../shared/lucide.module';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, LucideModule],
  templateUrl: './contact.component.html'
})
export class ContactComponent {
  contactForm: FormGroup;
  isSubmitting = false;
  showSuccess = false;

  constructor(private fb: FormBuilder) {
    this.contactForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      message: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.contactForm.valid && !this.isSubmitting) {
      this.isSubmitting = true;
      const { name, email, message } = this.contactForm.value;
      
      // Crear el enlace mailto con los datos del formulario
      const subject = `Contacto desde portfolio - ${name}`;
      const body = `Nombre: ${name}\nEmail: ${email}\n\nMensaje:\n${message}`;
      const mailtoLink = `mailto:lautarovulcano@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
      
      // Abrir el cliente de correo
      window.location.href = mailtoLink;
      
      // Mostrar mensaje de éxito y resetear el formulario
      this.showSuccess = true;
      this.contactForm.reset();
      
      // Ocultar el mensaje de éxito después de 5 segundos
      setTimeout(() => {
        this.showSuccess = false;
        this.isSubmitting = false;
      }, 5000);
    }
  }
} 