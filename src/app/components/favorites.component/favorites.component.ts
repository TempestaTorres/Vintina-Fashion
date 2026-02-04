import {Component} from '@angular/core';
import {ObserveElementDirective} from '../../directives/scroll-observer';
import {CurrencyPipe, NgClass, TitleCasePipe} from '@angular/common';
import {Products, ProductType} from '../../product/product-type';
import {Router, RouterLink} from '@angular/router';
import {AddToCart} from '../../services/add-to-cart';

@Component({
  selector: 'ng-app-favorites',
  imports: [
    ObserveElementDirective,
    NgClass,
    CurrencyPipe,
    RouterLink,
    TitleCasePipe
  ],
  templateUrl: './favorites.component.html',
  styleUrl: './favorites.component.css',
  standalone: true
})
export class FavoritesComponent {

  // Signals
  private signalsAdded: boolean[] = [];
  private signalsloading: boolean[] = [];
  //ajax
  public readonly products: ProductType[] = Products;

  constructor(private router: Router, private  cartService: AddToCart) {

    for (let i: number = 0; i < this.products.length; i++) {
      this.signalsAdded.push(false);
      this.signalsloading.push(false);
    }

  }

  isIntersecting (status: boolean, element: HTMLElement) {
    if (status) {
      element.classList.remove('app-invisible');
    }
  }

  addToCart(e: MouseEvent, product: ProductType): void {
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

  viewCartClick(e: MouseEvent): void {
    e.preventDefault();

    this.router.navigate(['/cart']);
  }

  public loading(index: number): boolean {
    return this.signalsloading[index];
  }

  public added(index: number): boolean {
    return this.signalsAdded[index];
  }

}
