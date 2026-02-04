import {Component, OnInit} from '@angular/core';
import {ProductType} from '../../product/product-type';
import {AddToCart} from '../../services/add-to-cart';
import {ProductService} from '../../services/product-service';
import {Router, RouterLink} from '@angular/router';
import {CurrencyPipe} from '@angular/common';
import {Subscription} from 'rxjs';

declare var Swiper: any;

@Component({
  selector: 'app-mini-cart',
  imports: [
    RouterLink,
    CurrencyPipe
  ],
  templateUrl: './mini-cart.component.html',
  styleUrls: ['./mini-cart.component.css'],
  standalone: true
})
export class MiniCartComponent implements OnInit {

  public opened: boolean = false;

  public cartItems: ProductType[] = [];
  public totalSum: number = 0;
  public noticeActive: boolean = false;

  private swiper: any | null = null;
  private swiperInitialized: boolean = false;

  private subscription: Subscription | null = null;
  private subscriptionOpen: Subscription | null = null;

  constructor(private  cartService: AddToCart, private productService: ProductService,
              private router: Router) {

  }

  ngOnInit() {

    this.subscribeToCart();

  }

  public loginClick(): void {
    this.opened = false;

    setTimeout(() => {
      this.router.navigate(['/login']).then();
    }, 500);
  }
  public signupClick(): void {
    this.opened = false;

    setTimeout(() => {
      this.router.navigate(['/signup']).then();
    }, 500);
  }
  private subscribeToCart(): void {

    this.subscription = this.cartService.itemAdded.subscribe(value => {

      if (value) {
        this.cartService.resetNewItemAdded();

        this.cartItems = this.cartService.getCart();
        this.setCartSubTotalAmount();
        this.noticeActive = true;

        if (this.swiperInitialized) {
          this.swiper.destroy(true, false);
        }

        setTimeout(() => {
          this.swInit();
        }, 500);
      }
    });

    this.subscriptionOpen = this.cartService.showCart.subscribe(value => {

      if (value) {
        this.cartService.closeCart();

        this.cartItems = this.cartService.getCart();
        this.setCartSubTotalAmount();
        this.noticeActive = true;

        if (this.swiperInitialized) {
          this.swiper.destroy(true, false);
        }

        setTimeout(() => {
          this.swInit();
          this.opened = true;
        }, 500);
      }
    });

  }
  ngOnDestroy() {
    this.subscription?.unsubscribe();
    this.subscriptionOpen?.unsubscribe();
  }

  public close(): void {

    this.opened = false;
  }

  public onSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this.opened = false;

    setTimeout(() => {
      this.router.navigate(['/checkout']).then();
    }, 500);
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

  public isLastItem(item: ProductType): boolean {
    return item.quantity === 1;
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
    this.swiperInitialized = true;
  }
}
