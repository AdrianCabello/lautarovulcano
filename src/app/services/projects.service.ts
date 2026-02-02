import { Injectable, signal, computed } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { environment } from '../../environments/environment';
import { LAUTARO_CLIENT_ID } from '../config/rakium.config';

const PAGE_SIZE = 9;

/** Proyecto tal como lo devuelve rakium-be (public por cliente). */
export interface RakiumProject {
  id: string;
  name: string;
  status?: string;
  description?: string | null;
  longDescription?: string | null;
  imageBefore?: string | null;
  imageAfter?: string | null;
  coverImage?: { id: string; url: string } | null;
  url?: string | null;
  demoUrl?: string | null;
  technologies?: string | string[] | null;
  category?: string | null;
  gallery?: { id: string; url: string; order: number }[];
  videoUrl?: string | null;
  videos?: { id: string; url: string; title?: string }[] | null;
}

export interface RakiumProjectsResponse {
  data: RakiumProject[];
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  hasNext: boolean;
  hasPrev: boolean;
}

/** Proyecto para la vista del portfolio (Trabajos seleccionados). */
export interface PortfolioProject {
  id: string;
  title: string;
  description: string;
  image: string;
  tags: string[];
  url: string;
}

@Injectable({ providedIn: 'root' })
export class ProjectsService {
  private readonly loading = signal(false);
  private readonly loadingMore = signal(false);
  private readonly error = signal<string | null>(null);
  private readonly rawProjects = signal<RakiumProject[]>([]);
  private readonly hasMore = signal(true);
  private readonly currentPage = signal(0);

  readonly projects = computed<PortfolioProject[]>(() =>
    this.rawProjects().map((p) => this.mapToPortfolio(p))
  );
  readonly isLoading = this.loading.asReadonly();
  readonly isLoadingMore = this.loadingMore.asReadonly();
  readonly errorMessage = this.error.asReadonly();
  readonly hasMoreProjects = this.hasMore.asReadonly();

  /** Obtiene el proyecto completo por id (desde la lista ya cargada). */
  getProjectById(id: string): RakiumProject | undefined {
    return this.rawProjects().find((p) => p.id === id);
  }

  constructor(private http: HttpClient) {}

  loadClientProjects(): void {
    this.loading.set(true);
    this.error.set(null);
    this.currentPage.set(0);
    this.hasMore.set(true);
    this.fetchPage(1, (projects) => {
      this.rawProjects.set(projects);
      this.currentPage.set(1);
      this.loading.set(false);
    });
  }

  loadMoreProjects(): void {
    if (this.loadingMore() || !this.hasMore()) return;
    const nextPage = this.currentPage() + 1;
    this.loadingMore.set(true);
    this.fetchPage(nextPage, (newProjects) => {
      this.rawProjects.update((prev) => [...prev, ...newProjects]);
      this.currentPage.set(nextPage);
      this.loadingMore.set(false);
    });
  }

  private fetchPage(
    page: number,
    onSuccess: (projects: RakiumProject[]) => void
  ): void {
    const baseUrl = environment.apiUrl.replace(/\/$/, '');
    const params = new HttpParams()
      .set('page', String(page))
      .set('limit', String(PAGE_SIZE));
    this.http
      .get<any>(`${baseUrl}/api/projects/client/${LAUTARO_CLIENT_ID}`, { params })
      .pipe(
        map((response) => {
          let projects: RakiumProject[] = [];
          let hasNext: boolean | undefined;
          if (response && Array.isArray(response.data)) {
            projects = response.data;
            hasNext = response.hasNext;
          } else if (Array.isArray(response)) {
            projects = response;
            hasNext = response.length >= PAGE_SIZE;
          } else if (response && Array.isArray(response.projects)) {
            projects = response.projects;
            hasNext = response.hasNext;
          }
          const filtered = projects.filter((p: RakiumProject) => p.status === 'PUBLISHED');
          this.hasMore.set(hasNext === true || (hasNext !== false && filtered.length >= PAGE_SIZE));
          return filtered;
        }),
        tap(onSuccess),
        catchError((err) => {
          this.loading.set(false);
          this.loadingMore.set(false);
          this.error.set(err?.message ?? 'Error al cargar proyectos');
          if (this.currentPage() === 0) this.rawProjects.set([]);
          return of([]);
        })
      )
      .subscribe();
  }

  private mapToPortfolio(p: RakiumProject): PortfolioProject {
    const image =
      p.coverImage?.url ??
      p.imageAfter ??
      p.imageBefore ??
      (p.gallery?.length ? p.gallery[0].url : '');
    const description =
      (p.description ?? p.longDescription ?? '').trim() || 'Sin descripción';
    let tags: string[] = [];
    if (p.technologies != null) {
      tags = Array.isArray(p.technologies)
        ? p.technologies
        : typeof p.technologies === 'string'
          ? [p.technologies]
          : [];
    }
    if (p.category && !tags.includes(p.category)) {
      tags = [p.category, ...tags];
    }
    const url = (p.demoUrl ?? p.url ?? '').trim() || '#';
    return {
      id: p.id,
      title: p.name,
      description,
      image: image || 'assets/projects/change.png',
      tags,
      url,
    };
  }
}
