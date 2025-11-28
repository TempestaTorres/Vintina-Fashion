import { Component } from '@angular/core';
import {PostCommentComponent} from '../../components/post-comment.component/post-comment.component';
import {RouterLink} from '@angular/router';
declare var Swiper: any;

@Component({
  selector: 'app-bridal-shapewear',
  imports: [
    PostCommentComponent,
    RouterLink
  ],
  templateUrl: './bridal-shapewear.html',
  styleUrl: './bridal-shapewear.css',
})
export class BridalShapewear {

  private swiper: any;

  constructor() {
  }

  ngOnInit() {

    this.toTop();
    this.swiper = new Swiper('.swiper-container', {

      speed: 500,
      spaceBetween: 30,
      autoplay: true,
      slidesPerView: 2,
      slidesPerGroup: 2,
      //rewind: true,
      loop: true,
      pagination: {
        el: '.swiper-pagination-clickable',
        type: 'bullets',
        clickable: true,
      },
      breakpoints: {
        320: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        480: {
          slidesPerView: 2,
          spaceBetween: 10,
        },
        640: {
          slidesPerView: 2,
          spaceBetween: 20,
        }
      }
    });

  }

  ngOnDestroy() {
    this.swiper.destroy();
  }

  public toTop(): void {

    let target: HTMLElement | null = document.getElementById('app-template-site');

    target?.scrollIntoView({
      block: "start",
      inline: "nearest"
    });
  }
  public toTopSmooth(): void {

    let target: HTMLElement | null = document.getElementById('app-template-site');

    target?.scrollIntoView({
      block: "start",
      inline: "nearest",
      behavior: "smooth"
    });
  }
}
