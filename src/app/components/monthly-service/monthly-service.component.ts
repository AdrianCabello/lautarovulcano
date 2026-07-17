import { AfterViewInit, Component, ElementRef, Inject, OnDestroy, PLATFORM_ID, ViewChild } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { LucideModule } from '../../shared/lucide.module';

interface MonthlyAccount {
  title: string;
  url?: string;
  avatar?: string;
}

@Component({
  selector: 'app-monthly-service',
  standalone: true,
  imports: [CommonModule, LucideModule],
  templateUrl: './monthly-service.component.html',
})
export class MonthlyServiceComponent implements AfterViewInit, OnDestroy {
  @ViewChild('brandMarquee') private brandMarquee?: ElementRef<HTMLElement>;

  isDraggingBrands = false;

  private dragStartX = 0;
  private dragStartScrollLeft = 0;
  private dragDistance = 0;
  private animationFrameId?: number;
  private previousFrameTime?: number;
  private removeDragListeners: Array<() => void> = [];

  readonly brandLoops = [0, 1];

  constructor(@Inject(PLATFORM_ID) private readonly platformId: object) {}

  readonly items = [
    'Estrategia y calendario de publicaciones',
    'Piezas diseñadas y editadas para cada formato',
    'Reels, historias y carruseles con intención comercial',
    'Edición de video y motion graphics',
    'Promociones, lanzamientos y fechas importantes',
    'Dirección visual para mantener coherencia',
    'Ajustes según objetivos, urgencias y oportunidades',
  ];

  readonly monthlyAccounts: MonthlyAccount[] = [
    {
      title: 'Agencia Terminal',
      url: 'https://www.instagram.com/agencia_terminal/',
      avatar: 'assets/instagram-avatars/agencia-terminal.jpg',
    },
    {
      title: 'La Casita Tandil',
      url: 'https://www.instagram.com/lacasitatandil/',
      avatar: 'assets/instagram-avatars/la-casita.jpg',
    },
    {
      title: 'Medieval',
      url: 'https://www.instagram.com/medievalbyaranda/',
      avatar: 'assets/instagram-avatars/medieval.jpg',
    },
    {
      title: 'Tandil Repuestos',
      url: 'https://www.instagram.com/tandil_repuestos/',
      avatar: 'assets/instagram-avatars/tandil-repuestos.jpg',
    },
    {
      title: 'Okapi Viajes',
      url: 'https://www.instagram.com/okapiviajestandil/',
      avatar: 'assets/instagram-avatars/okapi-viajes.jpg',
    },
    {
      title: 'Tony Burger',
      url: 'https://www.instagram.com/tonyburgerstandil/',
      avatar: 'assets/instagram-avatars/tony-burger.jpg',
    },
    {
      title: 'Eventloop',
      url: 'https://www.instagram.com/eventloop.ar/',
      avatar: 'assets/instagram-avatars/eventloop.jpg',
    },
  ];

  readonly monthlyExamples = this.monthlyAccounts;

  ngAfterViewInit(): void {
    if (!isPlatformBrowser(this.platformId)) {
      return;
    }

    const marquee = this.brandMarquee?.nativeElement;

    if (!marquee) {
      return;
    }

    const start = (event: PointerEvent) => this.startBrandDrag(event, marquee);
    const move = (event: PointerEvent) => this.moveBrandDrag(event);
    const end = (event: PointerEvent) => this.endBrandDrag(event);
    const cancel = () => this.cancelBrandDrag();

    marquee.addEventListener('pointerdown', start);
    window.addEventListener('pointermove', move);
    window.addEventListener('pointerup', end);
    window.addEventListener('pointercancel', end);
    window.addEventListener('blur', cancel);

    requestAnimationFrame(() => {
      marquee.scrollLeft = marquee.scrollWidth / 2;
      this.animationFrameId = requestAnimationFrame((time) => this.animateBrands(time));
    });

    this.removeDragListeners = [
      () => marquee.removeEventListener('pointerdown', start),
      () => window.removeEventListener('pointermove', move),
      () => window.removeEventListener('pointerup', end),
      () => window.removeEventListener('pointercancel', end),
      () => window.removeEventListener('blur', cancel),
    ];
  }

  ngOnDestroy(): void {
    this.removeDragListeners.forEach((remove) => remove());

    if (this.animationFrameId !== undefined && isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }

  startBrandDrag(event: PointerEvent, target = this.brandMarquee?.nativeElement): void {
    if (!target) {
      return;
    }

    event.preventDefault();
    this.isDraggingBrands = true;
    this.dragStartX = event.clientX;
    this.dragStartScrollLeft = target.scrollLeft;
    this.dragDistance = 0;

    target.setPointerCapture(event.pointerId);
  }

  moveBrandDrag(event: PointerEvent): void {
    if (!this.isDraggingBrands) {
      return;
    }

    event.preventDefault();
    const target = this.brandMarquee?.nativeElement ?? event.currentTarget as HTMLElement;
    const delta = event.clientX - this.dragStartX;
    this.dragDistance = Math.max(this.dragDistance, Math.abs(delta));
    target.scrollLeft = this.dragStartScrollLeft - delta;
    this.keepBrandsLooping(true);
  }

  endBrandDrag(event: PointerEvent): void {
    const target = this.brandMarquee?.nativeElement;
    this.isDraggingBrands = false;

    if (target?.hasPointerCapture(event.pointerId)) {
      target.releasePointerCapture(event.pointerId);
    }
  }

  cancelBrandDrag(): void {
    this.isDraggingBrands = false;
  }

  preventClickAfterDrag(event: MouseEvent): void {
    if (this.dragDistance > 8) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  private animateBrands(time: number): void {
    const marquee = this.brandMarquee?.nativeElement;

    if (!marquee) {
      return;
    }

    const elapsed = this.previousFrameTime === undefined ? 0 : Math.min(time - this.previousFrameTime, 50);
    this.previousFrameTime = time;

    if (!this.isDraggingBrands) {
      marquee.scrollLeft += elapsed * 0.045;
      this.keepBrandsLooping();
    }

    this.animationFrameId = requestAnimationFrame((nextTime) => this.animateBrands(nextTime));
  }

  private keepBrandsLooping(adjustDragStart = false): void {
    const marquee = this.brandMarquee?.nativeElement;

    if (!marquee) {
      return;
    }

    const loopWidth = marquee.scrollWidth / 2;
    let correction = 0;

    if (marquee.scrollLeft <= loopWidth * 0.25) {
      correction = loopWidth;
    } else if (marquee.scrollLeft >= loopWidth * 1.25) {
      correction = -loopWidth;
    }

    if (correction !== 0) {
      marquee.scrollLeft += correction;

      if (adjustDragStart) {
        this.dragStartScrollLeft += correction;
      }
    }
  }

}
