import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideModule } from '../../shared/lucide.module';

interface BehanceProject {
  title: string;
  category: string;
  filter: WorkFilter;
  image: string;
  url: string;
}

type WorkFilter = 'Todos' | 'Identidad' | 'Redes' | 'Eventos' | 'Logos' | 'Musica' | 'Otros';

@Component({
  selector: 'app-behance-archive',
  standalone: true,
  imports: [CommonModule, LucideModule],
  templateUrl: './behance-archive.component.html',
  styleUrls: ['./behance-archive.component.scss'],
})
export class BehanceArchiveComponent {
  readonly showAll = signal(false);
  readonly activeFilter = signal<WorkFilter>('Todos');
  readonly filters: WorkFilter[] = ['Todos', 'Identidad', 'Redes', 'Eventos', 'Logos', 'Musica', 'Otros'];

  readonly projects: BehanceProject[] = [
    { title: 'Flyer + Animacion Detroit Techno', category: 'Flyer / Motion', filter: 'Eventos', image: 'assets/behance-profile-covers/01.jpg', url: 'https://www.behance.net/gallery/229673981/Flyer-Animacion-Detroit-Techno' },
    { title: 'Tony Burger', category: 'Identidad visual', filter: 'Identidad', image: 'assets/behance-profile-covers/02.jpg', url: 'https://www.behance.net/gallery/227243323/Tony-burger-Proyecto-de-marca' },
    { title: 'Gold Phone', category: 'Gestion de redes', filter: 'Redes', image: 'assets/behance-profile-covers/03.jpg', url: 'https://www.behance.net/gallery/223159479/Gold-Phone-Gestion-de-redes' },
    { title: 'Change', category: 'Social media', filter: 'Redes', image: 'assets/behance-profile-covers/04.jpg', url: 'https://www.behance.net/gallery/219431403/Change-(Academia-de-trading)-Social-media' },
    { title: '4P', category: 'Logo', filter: 'Logos', image: 'assets/behance-profile-covers/05.jpg', url: 'https://www.behance.net/gallery/218872431/4P-LOGO' },
    { title: 'Eventloop', category: 'Social media', filter: 'Redes', image: 'assets/behance-profile-covers/06.jpg', url: 'https://www.behance.net/gallery/218823099/Eventloop-Social-Media' },
    { title: 'Positive Fecha 2', category: 'Eventos', filter: 'Eventos', image: 'assets/behance-profile-covers/07.jpg', url: 'https://www.behance.net/gallery/218655779/Evento-Positive-Fecha-2-Social-media' },
    { title: 'Dr. Marita Polifroni', category: 'Social media', filter: 'Redes', image: 'assets/behance-profile-covers/08.jpg', url: 'https://www.behance.net/gallery/218417665/Social-media-Cannabis-Genero-DrMarita-Polifroni' },
    { title: 'Positive New Year', category: 'Eventos', filter: 'Eventos', image: 'assets/behance-profile-covers/09.jpg', url: 'https://www.behance.net/gallery/218415241/Evento-Positive-New-Year-Social-media' },
    { title: 'Hasta los guantes', category: 'Portada musical', filter: 'Musica', image: 'assets/behance-profile-covers/10.jpg', url: 'https://www.behance.net/gallery/205306629/HASTA-LOS-GUANTES-PORTADA-SPOTIFY' },
    { title: 'Evento automotor', category: 'Presentacion', filter: 'Otros', image: 'assets/behance-profile-covers/11.jpg', url: 'https://www.behance.net/gallery/202939467/PPT-PARA-EVENTO-AUTOMOTOR' },
    { title: 'Felices Paseos', category: 'Identidad visual', filter: 'Identidad', image: 'assets/behance-profile-covers/12.jpg', url: 'https://www.behance.net/gallery/194214267/Felices-Pasesos' },
    { title: 'La loca', category: 'Logo', filter: 'Logos', image: 'assets/behance-profile-covers/13.jpg', url: 'https://www.behance.net/gallery/186712233/La-loca-Logo' },
    { title: 'Fark', category: 'Logo', filter: 'Logos', image: 'assets/behance-profile-covers/14.jpg', url: 'https://www.behance.net/gallery/186710765/Fark-Logo' },
    { title: 'MyD Peluqueria y barberia', category: 'Logo', filter: 'Logos', image: 'assets/behance-profile-covers/15.jpg', url: 'https://www.behance.net/gallery/183616755/Renovacion-de-logo-MyD-Peluqueria-y-barberia' },
    { title: 'Menu La Bamba', category: 'Pieza comercial', filter: 'Otros', image: 'assets/behance-profile-covers/16.jpg', url: 'https://www.behance.net/gallery/183612919/Menu-La-bamba' },
    { title: 'Portada y video lyric', category: 'Musica', filter: 'Musica', image: 'assets/behance-profile-covers/17.jpg', url: 'https://www.behance.net/gallery/183611647/Portada-y-video-lyric' },
    { title: 'QuadSkate Tandil', category: 'Eventos', filter: 'Eventos', image: 'assets/behance-profile-covers/18.jpg', url: 'https://www.behance.net/gallery/178973521/Flyer-evento-QuadSkate-Tandil' },
    { title: 'Que linda estas', category: 'Diseno musical', filter: 'Musica', image: 'assets/behance-profile-covers/19.jpg', url: 'https://www.behance.net/gallery/176266453/Que-linda-estas-Gusen-(Diseno)' },
    { title: 'Muneco Duko', category: 'Pieza digital', filter: 'Otros', image: 'assets/behance-profile-covers/20.jpg', url: 'https://www.behance.net/gallery/175709487/Sorteo-internacional-Muneco-duko' },
    { title: 'Gusti Gold Stream', category: 'Edicion', filter: 'Otros', image: 'assets/behance-profile-covers/21.jpg', url: 'https://www.behance.net/gallery/170421739/Kit-edits-para-Stream-Gusti-Gold' },
    { title: 'Cell Store MDP', category: 'Redes sociales', filter: 'Redes', image: 'assets/behance-profile-covers/22.jpg', url: 'https://www.behance.net/gallery/169796819/Cell-Store-MDP-Trabajo-redes' },
    { title: 'Carolina Fernandez', category: 'Redes sociales', filter: 'Redes', image: 'assets/behance-profile-covers/23.jpg', url: 'https://www.behance.net/gallery/168824055/Carolina-Fernandez-Inmobiliaria-REDES' },
    { title: 'Parraburgers Tandil', category: 'Logo', filter: 'Logos', image: 'assets/behance-profile-covers/24.jpg', url: 'https://www.behance.net/gallery/165830961/Logo-Parraburgers-Tandil' },
    { title: 'Gale Detailing', category: 'Logo', filter: 'Logos', image: 'assets/behance-profile-covers/25.jpg', url: 'https://www.behance.net/gallery/165614895/Logotipo-Gale-detailing' },
    { title: 'Prode Futbol Tandil', category: 'Pieza digital', filter: 'Otros', image: 'assets/behance-profile-covers/26.jpg', url: 'https://www.behance.net/gallery/162282955/PRODE-FUTBOL-TANDIL' },
    { title: 'Historias y publicaciones', category: 'Instagram', filter: 'Redes', image: 'assets/behance-profile-covers/27.jpg', url: 'https://www.behance.net/gallery/162259443/Trabajo-de-historia-y-publicaciones' },
    { title: 'Elemnt', category: 'Logo', filter: 'Logos', image: 'assets/behance-profile-covers/28.jpg', url: 'https://www.behance.net/gallery/159433521/Logoisotipo-Elemnt' },
    { title: 'Branding CannaSi', category: 'Identidad visual', filter: 'Identidad', image: 'assets/behance-profile-covers/29.jpg', url: 'https://www.behance.net/gallery/158245101/Branding-CannaSi' },
    { title: 'Manual CannaSI', category: 'Manual de marca', filter: 'Identidad', image: 'assets/behance-profile-covers/30.jpg', url: 'https://www.behance.net/gallery/158095679/Manual-de-marca-CannaSI' },
    { title: 'Mis Panas Pizza', category: 'Instagram', filter: 'Redes', image: 'assets/behance-profile-covers/31.jpg', url: 'https://www.behance.net/gallery/155286021/Sabores-pizzas-Trabajo-para-Mis-panas-pizza-Insta' },
    { title: 'Publicidad inventada', category: 'Edicion de imagen', filter: 'Otros', image: 'assets/behance-profile-covers/32.jpg', url: 'https://www.behance.net/gallery/155285755/Edicion-de-fotos-para-publicidad-inventada' },
    { title: 'Ahi va', category: 'App', filter: 'Otros', image: 'assets/behance-profile-covers/33.jpg', url: 'https://www.behance.net/gallery/154147119/Proyecto-de-app-Ahi-va-Vulcano-Lautaro' },
  ];

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    return filter === 'Todos'
      ? this.projects
      : this.projects.filter((project) => project.filter === filter);
  });

  visibleProjects(): BehanceProject[] {
    const projects = this.filteredProjects();
    return this.showAll() ? projects : projects.slice(0, 12);
  }

  projectCount(filter: WorkFilter): number {
    return filter === 'Todos'
      ? this.projects.length
      : this.projects.filter((project) => project.filter === filter).length;
  }

  setFilter(filter: WorkFilter): void {
    this.activeFilter.set(filter);
    this.showAll.set(false);
  }

  toggleShowAll(): void {
    this.showAll.update((value) => !value);
  }
}
