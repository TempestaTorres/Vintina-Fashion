import { Component } from '@angular/core';
import {ObserveElementDirective} from '../../directives/scroll-observer';
import {NgClass} from '@angular/common';
import {Collection} from '../../components/collection/collection';
import {Router, RouterLink} from '@angular/router';
import {FavoritesComponent} from '../../components/favorites.component/favorites.component';
import {TestimonialsComponent} from '../../components/testimonials.component/testimonials.component';
import {ScrollTotopService} from '../../services/scrolltotop-service';

@Component({
  selector: 'ng-app-home',
  imports: [
    ObserveElementDirective,
    NgClass,
    Collection,
    RouterLink,
    FavoritesComponent,
    TestimonialsComponent
  ],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {

  constructor(private readonly router: Router, private scrollTotopService: ScrollTotopService) {
  }

  ngOnInit() {
    this.scrollTotopService.toTop();
  }
  isIntersecting (status: boolean, element: HTMLElement) {
    if (status) {
      element.classList.remove('app-invisible');
    }
  }
}
