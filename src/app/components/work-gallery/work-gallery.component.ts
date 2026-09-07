import { Component, ElementRef, ViewChild, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { catchError, map, of, startWith, switchMap } from 'rxjs';
import { LucideModule } from '../../shared/lucide.module';
import { FooterComponent } from '../footer/footer.component';

interface WorkImage { src: string; original: string; width: number; height: number; }
interface WorkGallery { title: string; category: string; url: string; groups: WorkImage[][]; otherMedia: string[]; videos?: { src: string; title: string }[]; }

@Component({
  selector: 'app-work-gallery',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideModule, FooterComponent],
  templateUrl: './work-gallery.component.html',
  styleUrl: './work-gallery.component.scss',
})
export class WorkGalleryComponent {
  private readonly http = inject(HttpClient);
  private readonly route = inject(ActivatedRoute);
  @ViewChild('viewer') viewer!: ElementRef<HTMLDialogElement>;
  readonly selected = signal<WorkImage | null>(null);
  readonly zoomed = signal(false);
  readonly imageFailed = signal(false);
  get backRoute(): string {
    return this.route.snapshot.queryParamMap.get('from') === 'flyers' ? '/flyers' : '/trabajos';
  }
  get backFragment(): string | undefined {
    if (this.backRoute === '/flyers') return undefined;
    return this.route.snapshot.queryParamMap.get('from') === 'flyers-eventos' ? 'flyers-eventos' : 'trabajos-realizados';
  }
  readonly state$ = this.route.paramMap.pipe(switchMap(params =>
    this.http.get<Record<string, WorkGallery>>('/assets/work-gallery/manifest.json').pipe(
      map(manifest => {
        const project = manifest[params.get('id') || ''];
        return { loading: false, project: project ? { ...project, groups: this.separateFormats(project.groups) } : null };
      }),
      startWith({ loading: true, project: null }),
      catchError(() => of({ loading: false, project: null })),
    ),
  ));

  private separateFormats(groups: WorkImage[][]): WorkImage[][] {
    const separated = groups.flatMap(group => {
      const formats: WorkImage[][] = [];
      for (const image of group) {
        const ratio = image.width / image.height;
        const matching = formats.find(images => Math.abs(images[0].width / images[0].height - ratio) < 0.03);
        if (matching) matching.push(image);
        else formats.push([image]);
      }
      return formats;
    });
    const result: WorkImage[][] = [];
    const stories: WorkImage[] = [];
    for (const group of separated) {
      if (this.isStory(group[0])) {
        if (!stories.length) result.push(stories);
        stories.push(...group);
      } else result.push(group);
    }
    return result;
  }

  isStory(image: WorkImage): boolean {
    return Math.abs(image.width / image.height - 9 / 16) < 0.03;
  }

  open(image: WorkImage): void {
    this.selected.set(image);
    this.zoomed.set(false);
    this.imageFailed.set(false);
    this.viewer.nativeElement.showModal();
  }

  close(): void {
    this.viewer.nativeElement.close();
    this.selected.set(null);
  }
}
