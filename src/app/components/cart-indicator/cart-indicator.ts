import { Component } from '@angular/core';
import {Subscription} from 'rxjs';
import {AddToCart} from '../../services/add-to-cart';

@Component({
  selector: 'app-cart-indicator',
  imports: [],
  templateUrl: './cart-indicator.html',
  styleUrl: './cart-indicator.css',
  standalone: true
})
export class CartIndicator {

  private amount: Subscription | null = null;

  public itemsCount: number = 0;
  public hasItems: boolean = false;

  constructor(private cartService:AddToCart) {
  }

  ngOnInit() {
    this.amount = this.cartService.cartCounter.subscribe(value => {

      if (value !== this.itemsCount) {
        this.itemsCount = value;
        this.hasItems = this.itemsCount > 0;
      }
    });
  }

  ngOnDestroy() {
    this.amount?.unsubscribe();
  }

  showMiniCartClick(): void {
    this.cartService.openCart();
  }
}
