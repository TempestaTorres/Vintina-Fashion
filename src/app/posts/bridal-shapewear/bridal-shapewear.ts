import {AfterViewInit, Component, OnDestroy, OnInit} from '@angular/core';
import {PostCommentComponent} from '../../components/post-comment.component/post-comment.component';
import {RouterLink} from '@angular/router';
import {ScrollTotopService} from '../../services/scrolltotop-service';
declare var Swiper: any;

@Component({
  selector: 'app-bridal-shapewear',
  imports: [
    PostCommentComponent,
    RouterLink
  ],
  templateUrl: './bridal-shapewear.html',
  styleUrl: './bridal-shapewear.css',
  standalone: true
})
export class BridalShapewear implements OnInit, OnDestroy,AfterViewInit {

  private swiper: any;

  constructor(private scrollTotopService: ScrollTotopService) {
  }

  ngOnInit() {

    this.scrollTotopService.toTop();

  }

  ngAfterViewInit() {
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
  }

  public toTopSmooth(): void {

    this.scrollTotopService.toTopSmooth();

  }
}
