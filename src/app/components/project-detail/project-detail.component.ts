import { Component, inject, computed, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { LucideModule } from '../../shared/lucide.module';
import { ProjectsService, RakiumProject } from '../../services/projects.service';

@Component({
  selector: 'app-project-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, LucideModule],
  templateUrl: './project-detail.component.html'
})
export class ProjectDetailComponent implements OnInit {
  private readonly route = inject(ActivatedRoute);
  private readonly projectsService = inject(ProjectsService);
  private readonly sanitizer = inject(DomSanitizer);

  private readonly id = signal<string | null>(null);
  readonly project = computed<RakiumProject | undefined>(() => {
    const pid = this.id();
    return pid ? this.projectsService.getProjectById(pid) : undefined;
  });

  readonly gallerySorted = computed(() => {
    const p = this.project();
    if (!p?.gallery?.length) return [];
    return [...p.gallery].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
  });

  readonly videoUrls = computed(() => {
    const p = this.project();
    const list: string[] = [];
    if (p?.videoUrl) list.push(p.videoUrl);
    if (p?.videos?.length) p.videos.forEach(v => list.push(v.url));
    return list;
  });

  readonly tags = computed(() => {
    const p = this.project();
    if (!p) return [];
    let t: string[] = [];
    if (p.technologies != null) {
      t = Array.isArray(p.technologies) ? p.technologies : typeof p.technologies === 'string' ? [p.technologies] : [];
    }
    if (p.category && !t.includes(p.category)) t = [p.category, ...t];
    return t;
  });

  readonly projectUrl = computed(() => {
    const p = this.project();
    const url = (p?.demoUrl ?? p?.url ?? '').trim();
    return url || null;
  });

  readonly isLoading = this.projectsService.isLoading;

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      this.id.set(id);
      if (id && !this.projectsService.getProjectById(id)) {
        this.projectsService.loadClientProjects();
      }
    });
  }

  getTagIcon(tag: string): string {
    const iconMap: { [key: string]: string } = {
      'Illustrator': 'pen-tool',
      'Photoshop': 'image',
      'InDesign': 'book-open',
      'After Effects': 'film',
      'Premiere Pro': 'video',
      'Figma': 'layout-dashboard'
    };
    return iconMap[tag] ?? 'code';
  }

  isVideoUrl(url: string): boolean {
    return /\.(mp4|webm|ogg)(\?|$)/i.test(url) || url.startsWith('blob:');
  }

  isEmbedUrl(url: string): boolean {
    return /youtube|vimeo|youtu\.be/i.test(url);
  }

  getSafeVideoUrl(url: string): SafeResourceUrl {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
}
