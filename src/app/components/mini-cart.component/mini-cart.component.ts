import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductType} from '../../product/product-type';
import {AddToCart} from '../../services/add-to-cart';
import {ProductService} from '../../services/product-service';
import {Router, RouterLink} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
declare var Swiper: any;

@Component({
  selector: 'app-mini-cart',
  imports: [
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.css'],
})
export class MiniCartComponent {
  @Input({ required: true }) opened: boolean = false;
  @Input({ required: true }) cartAdded: boolean = false;
  @Output() miniCartClosed = new EventEmitter<void>();

  public cartItems: ProductType[] = [];
  public totalSum: number = 0;
  protected timerId: number = 0;

  public noticeActive: boolean = false;

  private swiper: any | null = null;

  constructor(private  cartService: AddToCart, private productService: ProductService,
              private router: Router) {
  }

  public close(): void {

    if (this.swiper !== null) {
      this.swiper.destroy();
      this.swiper = null;
    }
    this.startTimer();
    this.miniCartClosed.emit();

  }

  ngOnInit() {

    this.startTimer();
  }

  ngOnDestroy() {

    this.stopTimer();
  }

  public onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this.router.navigate(['/checkout']).then();

  }

  public counterClicked(product: ProductType, increment: number): void {

    if (product.quantity) {
      product.quantity += increment;

      if (product.quantity <= 0) {
        product.quantity = 0;
        this.removeFromCart(product);
      }
    }
  }
  public addToWishList(e: MouseEvent): void {
    e.preventDefault();
    let target: HTMLElement | undefined = e.currentTarget as HTMLElement;
    if (target instanceof HTMLElement) {
      target.classList.toggle('added');
    }
  }
  public setTotalAmount(cartItem: ProductType): void {
    this.totalSum = this.productService.getProductTotalAmount(cartItem);
  }

  public setCartSubTotalAmount(): void {
    this.totalSum = this.cartService.getCartSubTotalAmount();
  }
  public removeFromCart(cartItem: ProductType): void {

    this.cartService.removeFromCart(cartItem);
    this.cartItems = this.cartService.getCart();

    if (this.cartItems.length > 0) {
      this.setCartSubTotalAmount();
    }
    else {
      this.noticeActive = false;
    }

  }

  public closeNotice(): void {
    this.noticeActive = false;
  }

  public addToFavorite(product: ProductType): void {
    product.favorite = !product.favorite;
  }

  private miniCartObserver(): void {

    if (this.cartAdded) {
      this.cartItems = this.cartService.getCart();
      this.setCartSubTotalAmount();
      this.stopTimer();
      this.noticeActive = true;

      setTimeout(() => {
        this.swInit();
      }, 1000);
    }
  }

  public isLastItem(item: ProductType): boolean {
    return item.quantity === 1;
  }

  private startTimer(): void {
    this.timerId = setInterval(this.miniCartObserver.bind(this), 500);
  }
  private stopTimer(): void {
    clearInterval(this.timerId);
  }

  private swInit(): void {
    this.swiper = new Swiper('.swiper', {

      slidesPerView: 1,
      navigation: {
        prevEl: ".swiper-button-prev",
        nextEl: ".swiper-button-next"
      },
      keyboard: true,
      thumbnail: null,
    });
  }
}
