import {Component} from '@angular/core';
import {ModalBioComponent} from '../../components/modal-bio.component/modal-bio.component';
import {ProductType} from '../../product/product-type';
import {ActivatedRoute, Router, RouterLink} from '@angular/router';
import {ProductService} from '../../services/product-service';
import {ObserveElementDirective} from '../../directives/scroll-observer';
import {CurrencyPipe, NgClass, TitleCasePipe} from '@angular/common';
import {ScrollTotopService} from '../../services/scrolltotop-service';
import {ModalPayLaterComponent} from '../../components/modal-pay-later.component/modal-pay-later.component';
import {FindInStoreComponent} from '../../components/find-in-store.component/find-in-store.component';
import {ProductFormComponent} from '../../components/product-form.component/product-form.component';
import {MiniCartComponent} from '../../components/mini-cart.component/mini-cart.component';
import {InstagramFeeds} from '../../components/instagram-feeds/instagram-feeds';
import {ModalInstagram} from '../../components/modal-instagram/modal-instagram';
import {AddToCart} from '../../services/add-to-cart';
import {SizeGuideModal} from '../../components/size-guide-modal/size-guide-modal';
import {HttpClient} from '@angular/common/http';
import {Subscription} from 'rxjs';

declare var Swiper: any;

@Component({
  selector: 'app-product-details',
  imports: [
    ModalBioComponent,
    ObserveElementDirective,
    NgClass,
    ModalPayLaterComponent,
    FindInStoreComponent,
    ProductFormComponent,
    InstagramFeeds,
    ModalInstagram,
    TitleCasePipe,
    RouterLink,
    CurrencyPipe,
    SizeGuideModal,
  ],
  templateUrl: './product-details.html',
  styleUrl: './product-details.css',
})
export class ProductDetails {

  public zoomed: boolean = false;
  public bioOpened: boolean = false;
  public payLaterOpened: boolean = false;
  public findInStoreOpened: boolean = false;
  public sizeGuidOpened: boolean = false;
  public  tmLineIndex: number = -1;
  private swiper: any;
  private swInitialized: boolean = false;
  // Tabs
  public tabDescActive: boolean = true;
  public tabAdditionalInfoActive: boolean = false;

  // Signals
  private signalsAdded: boolean[] = [false, false, false, false];
  private signalsloading: boolean[] = [false, false, false, false];

  public relatedProducts: ProductType[] = [];
  public product: ProductType | undefined = undefined;
  public thumbnails: Array<string> = [];

  private subscription: Subscription | null = null;

  constructor(private activatedRoute: ActivatedRoute, private productService: ProductService,
              private scrollTotopService: ScrollTotopService, private router: Router, private  cartService: AddToCart,
              private http: HttpClient) {
  }

  public ngOnInit() {

    this.scrollTotopService.toTop();

    this.productInit();

  }

  ngAfterViewInit() {
    if (this.thumbnails.length > 0) {
      this.swInit();
    }
  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  public toggleTab(tabIndex: number): void {
    if (tabIndex === 0) {
      this.tabDescActive = true;
      this.tabAdditionalInfoActive = false;
    }
    else if (tabIndex === 1) {
      this.tabDescActive = false;
      this.tabAdditionalInfoActive = true;
    }
  }

  public showModalBio(): void {
    this.bioOpened = true;
  }

  public showModalPayLater(): void {
    this.payLaterOpened = true;
  }
  public showModalFindInStore(): void {
    this.findInStoreOpened = true;
  }

  public closeModalBio(): void {
    this.bioOpened = false;
  }

  public closeModalPayLater(): void {
    this.payLaterOpened = false;
  }
  public closeModalFindInStore(): void {
    this.findInStoreOpened = false;
  }
  public closeModalSizeGuide(): void {
    this.sizeGuidOpened = false;
  }

  public closeModalInstagram(): void {
    this.tmLineIndex = -1;
  }

  public onOpenSizeGuideClick(): void {
    this.sizeGuidOpened = true;
  }

  public onInstagramTimelineClick(index: number): void {
    this.tmLineIndex = index;
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

        console.log(params['type']);
        this.scrollTotopService.toTop();
        this.zoomed = false;
        this.bioOpened = false;
        this.payLaterOpened = false;
        this.findInStoreOpened = false;
        this.sizeGuidOpened = false;
        this.tmLineIndex = -1;

        // Tabs
        this.tabDescActive = true;
        this.tabAdditionalInfoActive = false;

        if (this.swInitialized) {
          this.swiper.destroy(true, false);
        }

        this.subscription = this.productService.getProduct(params['type'])
        .subscribe(
          {
            next: (res) => {
              this.product = res;
              if (this.product) {
                if (this.product.thumbnail) {
                  this.thumbnails = this.product.thumbnail;

                  if (this.thumbnails.length > 0) {
                    setTimeout(() => {
                      this.swInit();
                    }, 500);

                  }
                } else {
                  this.thumbnails = [];
                }
                // Related products
                let categories: ProductType[] = this.productService.getProductsByCategory(this.product.category.name);

                this.relatedProducts = categories.filter(category => category.name !== this.product?.name);
                this.signalsAdded = [false, false, false, false];
                this.signalsloading = [false, false, false, false];

              }
            },
            error: (err) => {
              console.log(err);
            }
          })
        //this.product = this.productService.getProductByType(params['type']);

      }
    });
  }

  goToNextProduct(type: string): void {
    this.router.navigate(['/product/details', type], { relativeTo: null });

  }
  viewCartClick(e: MouseEvent): void {
    e.preventDefault();

    this.router.navigate(['/cart']);
  }

  public loading(index: number): boolean {
    return this.signalsloading[index];
  }

  public addedClass(index: number): boolean {
    return this.signalsAdded[index];
  }
  public addToMainCart(e: MouseEvent, product: ProductType): void {
    e.preventDefault();

    // Add product to cart
    if (product) {
      product.quantity = 1;
      this.cartService.addToCart(product);

    }

    let targetElement: HTMLElement | null = e.currentTarget as HTMLElement;

    if (targetElement) {

      let index: number = parseInt(targetElement.id);
      this.signalsloading[index] = true;

      setTimeout(() => {

        this.signalsloading[index] = false;
        this.signalsAdded[index] = true;

      }, 1000);
    }

  }
}
