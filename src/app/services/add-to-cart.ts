import {Injectable} from '@angular/core';
import {ProductType} from '../product/product-type';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AddToCart {
  private _cart: ProductType[] = [];
  private cartItemsCount: number = 0;
  private newItemAdded: boolean = false;
  private cartShown: boolean = false;
  public itemAdded: Observable<boolean>;
  public showCart: Observable<boolean>;
  public cartCounter: Observable<number>;

  constructor() {
    this.itemAdded = new Observable(observer => {

      let timerId = setInterval(() => {
        observer.next(this.newItemAdded);
      }, 500);

      return {
        unsubscribe: () => {
          clearInterval(timerId);
        }
      }
    });

    this.cartCounter = new Observable(observer => {

      let timerId = setInterval(() => {
        observer.next(this.cartItemsCount);
      }, 500);

      return {
        unsubscribe: () => {
          clearInterval(timerId);
        }
      }
    });

    this.showCart = new Observable(observer => {

      let timerId = setInterval(() => {
        observer.next(this.cartShown);
      }, 500);

      return {
        unsubscribe: () => {
          clearInterval(timerId);
        }
      }
    });
  }

  public openCart(): void {
    this.cartShown = true;
  }

  public closeCart(): void {
    this.cartShown = false;
  }

  public addToCart(product: ProductType): void {
    let found: boolean = false;

    for (const item of this._cart) {
      if (item.id === product.id) {
        found = true;
        break;
      }
    }
    if (!found) {
      this._cart.push(product);
      this.newItemAdded = true;
      this.cartItemsCount++;
    }
  }

  public resetNewItemAdded(): void {
    this.newItemAdded = false;
  }

  public getCart(): ProductType[] {
    return this._cart;
  }
  public getCartSubTotalAmount(): number {
    let total: number = 0;

    for (const cart of this._cart) {
      let quantity: number | undefined = cart.quantity;

      if (quantity !== undefined) {
        total += quantity * cart.price;
      }
      else {
        total += cart.price;
      }
    }
    return total;
  }

  public removeFromCart(cartItem: ProductType): void {
    this._cart = this._cart.filter(item => item.id !== cartItem.id);
    this.cartItemsCount = this._cart.length;
  }
}
