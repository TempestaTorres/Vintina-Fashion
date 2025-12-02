import { Component } from '@angular/core';
import {ModalBioComponent} from '../../components/modal-bio.component/modal-bio.component';
import {ProductType} from '../../product/product-type';
import {ActivatedRoute} from '@angular/router';
import {ProductService} from '../../services/product-service';
import {ObserveElementDirective} from '../../directives/scroll-observer';
import {NgClass} from '@angular/common';
import {ScrollTotopService} from '../../services/scrolltotop-service';
declare var Swiper: any;

@Component({
  selector: 'app-product-details',
  imports: [
    ModalBioComponent,
    ObserveElementDirective,
    NgClass
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {

  public zoomed: boolean = false;
  public bioOpened: boolean = false;
  private swiper: any;
  private swInitialized: boolean = false;

  public product: ProductType | undefined = undefined;
  public thumbnails: Array<string> = [];

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
              private scrollTotopService: ScrollTotopService) {
  }

  public ngOnInit() {

    this.scrollTotopService.toTop();

    this.productInit();

    if (this.swInitialized) {
      this.swiper.destroy();
    }

  }

  ngAfterViewInit() {
    if (this.thumbnails.length > 0) {
      this.swInit();
    }
  }

  ngOnDestroy() {
    this.swiper.destroy();
  }

  public showModalBio(): void {
    this.bioOpened = true;
  }

  public closeModalBio(): void {
    this.bioOpened = false;
  }

  public onZoomedClick(e: MouseEvent): void {
    e.preventDefault();
    this.zoomed = !this.zoomed;

    let target: HTMLElement = e.currentTarget as HTMLElement;

    if (this.zoomed) {
      target.style.transform = 'scale(2)';
    }
    else {
      target.style.transform = 'scale(1)';
    }
  }

  public onMouseLeave(e: MouseEvent): void {

    let target: HTMLElement = e.currentTarget as HTMLElement;
    this.reset(target);
  }

  public reset(t: HTMLElement): void {
    t.style.transform = 'scale(1)';
    t.style.transformOrigin = 'center center 0px';
    this.zoomed = false;
  }

  public onMouseMove(e: MouseEvent): void {

    let target: HTMLElement = e.currentTarget as HTMLElement;

    const o: DOMRect = target.getBoundingClientRect();

    if ((e.offsetX > 55 && e.offsetX < o.width - 55)) {

      let res: {xPercent: number, yPercent: number} = this.calculateMousePosition(e);

      target.style.transformOrigin = `${res.xPercent}% ${res.yPercent}%`;

      //console.log(e.offsetX);
    }
    else {
      this.reset(target);
    }

  }

  public calculateMousePosition(e: MouseEvent): {xPercent: number, yPercent: number}  {
    let target: HTMLElement = e.currentTarget as HTMLElement;

    const o: DOMRect = target.getBoundingClientRect();
    let n: number = e.clientX - o.left;
    let  r: number = e.clientY - o.top;
    return {
      xPercent: n / o.width * 100,
      yPercent: r / o.height * 100
    }
  }

  public isIntersecting (status: boolean, element: HTMLElement) {
    if (status) {
      element.classList.remove('app-invisible');
    }
  }

  private swInit(): void {
    this.swiper = new Swiper('.swiper-container', {

      slidesPerView: 1,
      pagination: {
        type: 'progressbar',
        el: '.swiper-pagination',
      },
      navigation: {
        prevEl: ".app-swiper-button-prev",
        nextEl: ".app-swiper-button-next"
      },
      keyboard: true,
      thumbnail: null,
    });
    this.swInitialized = true;
  }

  private productInit(): void {

    this.activatedRoute.params.subscribe((params) => {

      if (params['type']) {

        this.product = this.productService.getProductByType(params['type']);

        if (this.product) {
          if (this.product.thumbnail) {
            this.thumbnails = this.product.thumbnail;
            console.log(this.thumbnails);
          }
        }
      }
    });
  }
}
