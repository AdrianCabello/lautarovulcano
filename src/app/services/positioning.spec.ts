import { TestBed } from '@angular/core/testing';
import { AboutComponent } from '../components/about/about.component';
import { ContactComponent } from '../components/contact/contact.component';
import { LanguageService } from './language.service';
import { MonthlyServiceComponent } from '../components/monthly-service/monthly-service.component';

describe('Portfolio positioning', () => {
  it('explains monthly support in five steps and offers a working contact link', () => {
    const fixture = TestBed.createComponent(MonthlyServiceComponent);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('[data-testid="monthly-support-step"]').length).toBe(5);
    expect(page.querySelector('#monthly-service-title')?.textContent).toBe('Contenido y comunicación para redes');
    expect(page.querySelector('[data-testid="monthly-service-join-link"]')?.getAttribute('href')).toBe('#contact');
    expect(page.textContent).toContain('La grabación y la publicación se coordinan dentro de esa propuesta.');
    expect(page.querySelector('[data-testid="monthly-examples-section"]')).not.toBeNull();
  });
  it('keeps monthly support prominent and links web design to existing projects', () => {
    const fixture = TestBed.createComponent(AboutComponent);
    fixture.detectChanges();
    const page = fixture.nativeElement as HTMLElement;
    expect(page.querySelectorAll('#services article').length).toBe(5);
    expect(page.querySelector('[data-testid="service-monthly-details-link"]')?.getAttribute('href'))
      .toBe('#monthly-service');
    expect(page.querySelector('[data-testid="service-monthly-card"] h3')?.textContent)
      .toContain('Una presencia activa, sin improvisar cada publicación.');
    expect(page.querySelector('[data-testid="service-web-link"]')?.getAttribute('href'))
      .toBe('/trabajos#portfolio');
    expect(page.textContent).not.toContain('activas principalmente en verano');
  });

  it('does not automatically include production and account management tasks', () => {
    const fixture = TestBed.createComponent(ContactComponent);
    fixture.detectChanges();
    const copy = fixture.nativeElement.textContent as string;
    expect(copy).toContain('la atención de mensajes y las campañas pagas no están incluidas automáticamente');
    expect(copy).toContain('se acuerdan por separado');
  });

  it('translates the new scope and positioning in both directions', () => {
    const language = TestBed.inject(LanguageService);
    for (const spanish of [
      'Contenido y comunicación para redes',
      'Te oriento con el material que necesitamos',
      'Quiero consultar por el servicio',
      'De la planificación a las piezas listas.',
      'Marcas con las que trabajé',
      'Te ayudo a definir qué comunicar y cómo mostrarlo. Diseño identidades, contenido y sitios web a partir de lo que tu negocio necesita.',
      'Definimos desde el inicio qué contenido necesitás, cuántas piezas vamos a desarrollar y cómo organizamos las entregas. La grabación, la publicación y otras tareas se acuerdan según el proyecto.',
    ]) {
      const english = language.translate(spanish, 'en');
      expect(english).not.toBe(spanish);
      expect(language.translate(english, 'es')).toBe(spanish);
    }
  });
});
