import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { LucideModule } from '../../shared/lucide.module';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-portfolio',
  standalone: true,
  imports: [CommonModule, LucideModule],
  templateUrl: './portfolio.component.html',
  styleUrls: []
})
export class PortfolioComponent implements OnInit {
  private readonly projectsService = inject(ProjectsService);
  private readonly router = inject(Router);

  readonly projects = this.projectsService.projects;
  readonly isLoading = this.projectsService.isLoading;
  readonly errorMessage = this.projectsService.errorMessage;

  ngOnInit(): void {
    this.projectsService.loadClientProjects();
  }

  goToProject(id: string): void {
    this.router.navigate(['/proyecto', id]);
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

    return iconMap[tag] || 'code';
  }
} 