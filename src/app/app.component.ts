import { AfterViewInit, Component, HostListener, Inject, OnDestroy, OnInit, PLATFORM_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, RouterLink } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { LucideModule } from './shared/lucide.module';
import { SeoService } from './services/seo.service';
import { LanguageService } from './services/language.service';
import { PageTranslationDirective } from './directives/page-translation.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [CommonModule, RouterModule, RouterLink, LucideModule, PageTranslationDirective],
})
export class AppComponent implements OnInit, AfterViewInit, OnDestroy {
  title = 'lautarovulcano';
  isMobileMenuOpen = false;
  isNavCompact = false;
  activeSection = 'services';

  private observer?: IntersectionObserver;
  private motionObserver?: IntersectionObserver;
  private motionMutationObserver?: MutationObserver;
  private readonly isBrowser: boolean;
  private readonly motionSelector = [
    '.motion-section:not([data-testid="hero-section"]) > .container',
    '.site-footer > .container',
    '.motion-card',
    '.motion-copy-block',
    '.motion-list-item',
    '.project-card',
    '.archive-card',
    '.process-grid',
    '.process-step',
    '.motion-cta',
    '.motion-reveal',
    '.motion-rule'
  ].join(',');

  constructor(
    private seoService: SeoService,
    public readonly language: LanguageService,
    @Inject(PLATFORM_ID) platformId: object
  ) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit() {
    this.updateSeo();

    if (this.isBrowser) {
      this.updateNavState();
      window.setTimeout(() => this.observeSections(), 0);
    }
  }

  ngAfterViewInit(): void {
    if (this.isBrowser) {
      window.setTimeout(() => this.initMotion(), 0);
    }
  }

  ngOnDestroy(): void {
    this.observer?.disconnect();
    this.motionObserver?.disconnect();
    this.motionMutationObserver?.disconnect();
  }

  @HostListener('window:scroll')
  onWindowScroll(): void {
    this.updateNavState();
  }

  toggleMobileMenu() {
    this.isMobileMenuOpen = !this.isMobileMenuOpen;
  }

  toggleLanguage(): void {
    this.language.toggle();
    this.updateSeo();
  }

  private updateSeo(): void {
    const isEnglish = this.language.current() === 'en';

    this.seoService.updateMetaTags({
      title: isEnglish
        ? 'Lautaro Vulcano | Graphic design, content, and web'
        : 'Lautaro Vulcano | Diseño gráfico, contenido y web',
      description: isEnglish
        ? 'I design identities, content, and websites for brands that want to present themselves clearly and maintain a professional presence.'
        : 'Diseño identidades, contenido y sitios web para marcas que buscan presentarse con claridad y sostener una presencia profesional.',
      image: 'https://lautarovulcano.com/assets/perfil.png',
      url: 'https://lautarovulcano.com/'
    });
  }

  private updateNavState(): void {
    if (!this.isBrowser) {
      return;
    }

    this.isNavCompact = window.scrollY > 28;
  }

  private observeSections(): void {
    if (!this.isBrowser || !('IntersectionObserver' in window)) {
      return;
    }

    const sections = ['services', 'portfolio', 'about', 'contact']
      .map((id) => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));

    this.observer = new IntersectionObserver((entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (visible?.target.id) {
        this.activeSection = visible.target.id;
      }
    }, {
      rootMargin: '-28% 0px -58% 0px',
      threshold: [0.12, 0.2, 0.36]
    });

    sections.forEach((section) => this.observer?.observe(section));
  }

  private initMotion(): void {
    if (!this.isBrowser || !('IntersectionObserver' in window)) {
      return;
    }

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return;
    }

    document.documentElement.classList.add('motion-ready');

    this.motionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add('is-motion-visible');
        this.motionObserver?.unobserve(entry.target);
      });
    }, {
      rootMargin: '0px 0px 18% 0px',
      threshold: 0.01
    });

    this.observeMotionElements(document);

    this.motionMutationObserver = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node instanceof Element) {
            this.observeMotionElements(node);
          }
        });
      });
    });

    this.motionMutationObserver.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  private observeMotionElements(root: ParentNode): void {
    const elements = new Set<Element>();

    if (root instanceof Element && root.matches(this.motionSelector)) {
      elements.add(root);
    }

    root.querySelectorAll(this.motionSelector).forEach((element) => elements.add(element));

    elements.forEach((element) => {
      if (!element.classList.contains('is-motion-visible')) {
        this.motionObserver?.observe(element);
      }
    });
  }
}
