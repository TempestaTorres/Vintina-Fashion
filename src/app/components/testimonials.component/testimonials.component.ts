import { Component } from '@angular/core';
import {ObserveElementDirective} from '../../directives/scroll-observer';
import {NgClass} from '@angular/common';
declare var tns: any;

@Component({
  selector: 'app-testimonials',
  imports: [
    ObserveElementDirective,
    NgClass
  ],
  templateUrl: './testimonials.component.html',
  styleUrl: './testimonials.component.css',
  standalone: true
})
export class TestimonialsComponent {

  private slider: any;

  constructor() {
  }

  ngOnInit() {

    this.testimonials();
  }

  protected testimonials(): void {

    this.slider = tns({
      container: '.testimonials-track',
      items: 1,
      autoplay: true,
      mouseDrag: false,
      autoplayTimeout: 3500,
      autoplayHoverPause:true,
      controlsPosition: 'bottom',
      nav: false,
      navPosition: 'bottom',
      responsive: {
        0: {
          items: 1,
          gutter: 10
        },
        768: {
          items: 1,
          gutter: 10
        },
        1025: {
          items: 1,
          gutter: 10
        }
      }
    });

    let button: HTMLButtonElement | null = document.querySelector('button[data-action]');
    if (button) {
      button.remove();
    }

    let prevButton: HTMLButtonElement | null = document.querySelector('button[data-controls="prev"]');
    if (prevButton) {
      prevButton.innerHTML = '<i aria-hidden="true" class="jki jki-chevron-left-light"></i>';
    }

    let nextButton: HTMLButtonElement | null = document.querySelector('button[data-controls="next"]');
    if (nextButton) {
      nextButton.innerHTML = '<i aria-hidden="true" class="jki jki-chevron-right-light"></i>';
    }
    this.slider.play();
  }

  isIntersecting (status: boolean, element: HTMLElement) {
    if (status) {
      element.classList.remove('app-invisible');
    }
  }
}
