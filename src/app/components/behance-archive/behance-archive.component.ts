import { Component, computed, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LucideModule } from '../../shared/lucide.module';

interface BehanceProject {
  title: string;
  category: string;
  description: string;
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
  private readonly datesByProjectId: Record<string, string> = {
    '229673981': '05 Jul 2025',
    '227243323': '01 Jun 2025',
    '223159479': '07 Abr 2025',
    '219431403': '16 Feb 2025',
    '218872431': '09 Feb 2025',
    '218823099': '08 Feb 2025',
    '218655779': '06 Feb 2025',
    '218417665': '03 Feb 2025',
    '218415241': '03 Feb 2025',
    '205306629': '11 Ago 2024',
    '202939467': '10 Jul 2024',
    '194214267': '18 Mar 2024',
    '186712233': '13 Dic 2023',
    '186710765': '13 Dic 2023',
    '183616755': '01 Nov 2023',
    '183612919': '01 Nov 2023',
    '183611647': '01 Nov 2023',
    '178973521': '01 Sep 2023',
    '176266453': '27 Jul 2023',
    '175709487': '19 Jul 2023',
    '170421739': '11 May 2023',
    '169796819': '03 May 2023',
    '168824055': '20 Abr 2023',
    '165830961': '13 Mar 2023',
    '165614895': '09 Mar 2023',
    '162282955': '26 Ene 2023',
    '162259443': '26 Ene 2023',
    '159433521': '18 Dic 2022',
    '158245101': '30 Nov 2022',
    '158095679': '29 Nov 2022',
    '155286021': '20 Oct 2022',
    '155285755': '20 Oct 2022',
    '154147119': '05 Oct 2022',
  };

  readonly projects: BehanceProject[] = [
    { title: 'Flyer + Animacion Detroit Techno', category: 'Flyer / Motion', description: 'Flyer y pieza animada para comunicar una fecha de música techno con una estética nocturna e industrial.', filter: 'Eventos', image: 'assets/behance-profile-covers/01.jpg', url: 'https://www.behance.net/gallery/229673981/Flyer-Animacion-Detroit-Techno' },
    { title: 'Tony Burger', category: 'Identidad visual', description: 'Identidad visual para una hamburguesería, construida alrededor de un personaje ilustrado y una marca directa.', filter: 'Identidad', image: 'assets/behance-profile-covers/02.jpg', url: 'https://www.behance.net/gallery/227243323/Tony-burger-Proyecto-de-marca' },
    { title: 'Gold Phone', category: 'Gestion de redes', description: 'Sistema de contenidos para redes de una tienda de tecnología, con foco en productos, promociones y atención.', filter: 'Redes', image: 'assets/behance-profile-covers/03.jpg', url: 'https://www.behance.net/gallery/223159479/Gold-Phone-Gestion-de-redes' },
    { title: 'Change', category: 'Social media', description: 'Piezas de social media para una academia de trading, pensadas para ordenar su comunicación digital.', filter: 'Redes', image: 'assets/behance-profile-covers/04.jpg', url: 'https://www.behance.net/gallery/219431403/Change-(Academia-de-trading)-Social-media' },
    { title: '4P', category: 'Logo', description: 'Diseño de logotipo e isotipo para 4P, buscando una marca simple, reconocible y fácil de aplicar.', filter: 'Logos', image: 'assets/behance-profile-covers/05.jpg', url: 'https://www.behance.net/gallery/218872431/4P-LOGO' },
    { title: 'Eventloop', category: 'Social media', description: 'Contenido para redes de una plataforma de eventos, con piezas para anunciar fechas, artistas y novedades.', filter: 'Redes', image: 'assets/behance-profile-covers/06.jpg', url: 'https://www.behance.net/gallery/218823099/Eventloop-Social-Media' },
    { title: 'Positive Fecha 2', category: 'Eventos', description: 'Campaña visual para una fecha de Positive, adaptada a publicaciones e historias para redes.', filter: 'Eventos', image: 'assets/behance-profile-covers/07.jpg', url: 'https://www.behance.net/gallery/218655779/Evento-Positive-Fecha-2-Social-media' },
    { title: 'Dr. Marita Polifroni', category: 'Social media', description: 'Contenido de social media para una profesional de la salud, con una comunicación clara y cercana.', filter: 'Redes', image: 'assets/behance-profile-covers/08.jpg', url: 'https://www.behance.net/gallery/218417665/Social-media-Cannabis-Genero-DrMarita-Polifroni' },
    { title: 'Positive New Year', category: 'Eventos', description: 'Identidad de campaña para el evento Positive New Year, con piezas centradas en la fecha y la experiencia.', filter: 'Eventos', image: 'assets/behance-profile-covers/09.jpg', url: 'https://www.behance.net/gallery/218415241/Evento-Positive-New-Year-Social-media' },
    { title: 'Hasta los guantes', category: 'Portada musical', description: 'Diseño de portada para un lanzamiento musical, preparado para Spotify y difusión en redes.', filter: 'Musica', image: 'assets/behance-profile-covers/10.jpg', url: 'https://www.behance.net/gallery/205306629/HASTA-LOS-GUANTES-PORTADA-SPOTIFY' },
    { title: 'Evento automotor', category: 'Presentacion', description: 'Presentación comercial para un evento del sector automotor, organizada para exponer información con claridad.', filter: 'Otros', image: 'assets/behance-profile-covers/11.jpg', url: 'https://www.behance.net/gallery/202939467/PPT-PARA-EVENTO-AUTOMOTOR' },
    { title: 'Felices Paseos', category: 'Identidad visual', description: 'Identidad visual para un servicio de paseos de mascotas, con un lenguaje amable y fácil de reconocer.', filter: 'Identidad', image: 'assets/behance-profile-covers/12.jpg', url: 'https://www.behance.net/gallery/194214267/Felices-Pasesos' },
    { title: 'La loca', category: 'Logo', description: 'Diseño de logotipo para La Loca, explorando una identidad expresiva y adaptable.', filter: 'Logos', image: 'assets/behance-profile-covers/13.jpg', url: 'https://www.behance.net/gallery/186712233/La-loca-Logo' },
    { title: 'Fark', category: 'Logo', description: 'Diseño de logotipo para Fark, orientado a construir una firma visual clara y contemporánea.', filter: 'Logos', image: 'assets/behance-profile-covers/14.jpg', url: 'https://www.behance.net/gallery/186710765/Fark-Logo' },
    { title: 'MyD Peluqueria y barberia', category: 'Logo', description: 'Renovación del logotipo de una peluquería y barbería para mejorar su lectura y aplicación.', filter: 'Logos', image: 'assets/behance-profile-covers/15.jpg', url: 'https://www.behance.net/gallery/183616755/Renovacion-de-logo-MyD-Peluqueria-y-barberia' },
    { title: 'Menu La Bamba', category: 'Pieza comercial', description: 'Diseño de menú para La Bamba, organizando productos, precios y jerarquías para una lectura rápida.', filter: 'Otros', image: 'assets/behance-profile-covers/16.jpg', url: 'https://www.behance.net/gallery/183612919/Menu-La-bamba' },
    { title: 'Portada y video lyric', category: 'Musica', description: 'Portada y video lyric para un lanzamiento musical, combinando identidad gráfica y movimiento.', filter: 'Musica', image: 'assets/behance-profile-covers/17.jpg', url: 'https://www.behance.net/gallery/183611647/Portada-y-video-lyric' },
    { title: 'QuadSkate Tandil', category: 'Eventos', description: 'Flyer para un encuentro de patín en Tandil, pensado para comunicar fecha, actividad y convocatoria.', filter: 'Eventos', image: 'assets/behance-profile-covers/18.jpg', url: 'https://www.behance.net/gallery/178973521/Flyer-evento-QuadSkate-Tandil' },
    { title: 'Que linda estas', category: 'Diseno musical', description: 'Diseño de portada para el lanzamiento «Qué linda estás» de Gusen, adaptado a plataformas y redes.', filter: 'Musica', image: 'assets/behance-profile-covers/19.jpg', url: 'https://www.behance.net/gallery/176266453/Que-linda-estas-Gusen-(Diseno)' },
    { title: 'Muneco Duko', category: 'Pieza digital', description: 'Pieza promocional para un sorteo internacional, centrada en el premio y la mecánica de participación.', filter: 'Otros', image: 'assets/behance-profile-covers/20.jpg', url: 'https://www.behance.net/gallery/175709487/Sorteo-internacional-Muneco-duko' },
    { title: 'Gusti Gold Stream', category: 'Edicion', description: 'Kit visual para streaming de Gusti Gold, con recursos gráficos y ediciones para acompañar las transmisiones.', filter: 'Otros', image: 'assets/behance-profile-covers/21.jpg', url: 'https://www.behance.net/gallery/170421739/Kit-edits-para-Stream-Gusti-Gold' },
    { title: 'Cell Store MDP', category: 'Redes sociales', description: 'Contenido para redes de una tienda de celulares, con piezas de producto, promociones y comunicación comercial.', filter: 'Redes', image: 'assets/behance-profile-covers/22.jpg', url: 'https://www.behance.net/gallery/169796819/Cell-Store-MDP-Trabajo-redes' },
    { title: 'Carolina Fernandez', category: 'Redes sociales', description: 'Diseño de contenidos para una inmobiliaria, orientado a presentar propiedades y fortalecer su presencia digital.', filter: 'Redes', image: 'assets/behance-profile-covers/23.jpg', url: 'https://www.behance.net/gallery/168824055/Carolina-Fernandez-Inmobiliaria-REDES' },
    { title: 'Parraburgers Tandil', category: 'Logo', description: 'Diseño de logotipo para Parraburgers Tandil, buscando una identidad directa para el rubro gastronómico.', filter: 'Logos', image: 'assets/behance-profile-covers/24.jpg', url: 'https://www.behance.net/gallery/165830961/Logo-Parraburgers-Tandil' },
    { title: 'Gale Detailing', category: 'Logo', description: 'Diseño de logotipo para un servicio de detailing, con una estética vinculada al cuidado automotor.', filter: 'Logos', image: 'assets/behance-profile-covers/25.jpg', url: 'https://www.behance.net/gallery/165614895/Logotipo-Gale-detailing' },
    { title: 'Prode Futbol Tandil', category: 'Pieza digital', description: 'Pieza digital para un prode de fútbol en Tandil, preparada para explicar la propuesta y convocar participantes.', filter: 'Otros', image: 'assets/behance-profile-covers/26.jpg', url: 'https://www.behance.net/gallery/162282955/PRODE-FUTBOL-TANDIL' },
    { title: 'Historias y publicaciones', category: 'Instagram', description: 'Serie de historias y publicaciones para Instagram, resuelta como un sistema visual consistente.', filter: 'Redes', image: 'assets/behance-profile-covers/27.jpg', url: 'https://www.behance.net/gallery/162259443/Trabajo-de-historia-y-publicaciones' },
    { title: 'Elemnt', category: 'Logo', description: 'Diseño de logotipo e isotipo para Elemnt, construido para funcionar en diferentes tamaños y soportes.', filter: 'Logos', image: 'assets/behance-profile-covers/28.jpg', url: 'https://www.behance.net/gallery/159433521/Logoisotipo-Elemnt' },
    { title: 'Branding CannaSi', category: 'Identidad visual', description: 'Desarrollo de identidad visual para CannaSi, con recursos gráficos aplicables a su comunicación.', filter: 'Identidad', image: 'assets/behance-profile-covers/29.jpg', url: 'https://www.behance.net/gallery/158245101/Branding-CannaSi' },
    { title: 'Manual CannaSI', category: 'Manual de marca', description: 'Manual de marca para CannaSI, reuniendo criterios de uso, color, tipografía y aplicaciones.', filter: 'Identidad', image: 'assets/behance-profile-covers/30.jpg', url: 'https://www.behance.net/gallery/158095679/Manual-de-marca-CannaSI' },
    { title: 'Mis Panas Pizza', category: 'Instagram', description: 'Contenido de Instagram para Mis Panas Pizza, enfocado en mostrar sabores y estimular la compra.', filter: 'Redes', image: 'assets/behance-profile-covers/31.jpg', url: 'https://www.behance.net/gallery/155286021/Sabores-pizzas-Trabajo-para-Mis-panas-pizza-Insta' },
    { title: 'Publicidad inventada', category: 'Edicion de imagen', description: 'Ejercicio de edición fotográfica aplicado a una campaña publicitaria conceptual.', filter: 'Otros', image: 'assets/behance-profile-covers/32.jpg', url: 'https://www.behance.net/gallery/155285755/Edicion-de-fotos-para-publicidad-inventada' },
    { title: 'Ahi va', category: 'App', description: 'Concepto visual y propuesta de interfaz para una aplicación, trabajando identidad y experiencia de uso.', filter: 'Otros', image: 'assets/behance-profile-covers/33.jpg', url: 'https://www.behance.net/gallery/154147119/Proyecto-de-app-Ahi-va-Vulcano-Lautaro' },
  ];

  readonly filteredProjects = computed(() => {
    const filter = this.activeFilter();
    return filter === 'Todos'
      ? this.projects
      : this.projects.filter((project) => project.filter === filter);
  });

  readonly activePreviewUrl = signal(this.projects[0].url);
  readonly featuredProject = computed(() => {
    const visible = this.visibleProjects();
    return visible.find((project) => project.url === this.activePreviewUrl()) ?? visible[0] ?? this.projects[0];
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
    const nextProject = filter === 'Todos'
      ? this.projects[0]
      : this.projects.find((project) => project.filter === filter);
    this.activePreviewUrl.set(nextProject?.url ?? this.projects[0].url);
  }

  projectDate(project: BehanceProject): string {
    const projectId = project.url.match(/gallery\/(\d+)/)?.[1];
    return projectId ? this.datesByProjectId[projectId] ?? '' : '';
  }

  setFeaturedProject(project: BehanceProject): void {
    this.activePreviewUrl.set(project.url);
  }

  toggleShowAll(): void {
    this.showAll.update((value) => !value);
  }
}
