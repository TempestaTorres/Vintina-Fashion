import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductService} from '../../services/product-service';
import {ProductType} from '../../product/product-type';
import {AddToCart} from '../../services/add-to-cart';
import {Observable, Subscription} from 'rxjs';

@Component({
  selector: 'app-product-form',
  imports: [],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  @Input({required: true}) productType: string | undefined = '';
  @Output() openSizeGuide = new EventEmitter<void>();
  @Output() addedToBag = new EventEmitter<void>();

  public product: ProductType | undefined = undefined;
  public error:boolean = false;
  public processing: boolean = false;
  public btnDisabled: boolean = true;
  private reset: boolean = false;

  private observable: Observable<string>;
  private subscription: Subscription | null = null;

  constructor(private productService: ProductService,  private  cartService: AddToCart) {

    this.observable = new Observable(subscriber => {
      let timerId = setInterval(() => {
        if (this.productType)
          subscriber.next(this.productType);
      }, 500);

      return {
        unsubscribe: () => {
          clearInterval(timerId);
        }
      }
    });
  }

  ngOnInit() {

    this.subscribe();

  }

  ngOnDestroy() {
    this.subscription?.unsubscribe();
  }

  private subscribe(): void {
    this.subscription = this.observable.subscribe(value => {

      if (value.length > 0) {
        this.product = this.productService.getProductByType(value);

        if (!this.reset) {
          // Ajax for count and sizes

          this.resetAllSizeButtons();
          this.reset = true;
        }
      }
    });
  }

  private resetAllSizeButtons(): void {
    let buttons = document.querySelectorAll('.size-item');

    buttons.forEach(button => {
      let parent: HTMLElement | null = button.parentElement;

      if (parent) {
        for (let i = 0; i < parent.children.length; i++) {
          let child = parent.children[i];
          if (child instanceof HTMLElement) {
            child.classList.remove('border-black');
          }
        }
      }
    });
  }

  public addToBag() {

    if (this.product) {
      this.processing = true;
      this.product.quantity = 1;
      this.cartService.addToCart(this.product);
      this.error = false;

      setTimeout(() => {
        this.processing = false;
        this.btnDisabled = true;
        this.productType = '';
        this.reset = false;
        this.addedToBag.emit();

      }, 2000);
    }
  }

  public onSizeGuideClick(): void {
    this.openSizeGuide.emit();
  }

  public sizeItemClicked(e: MouseEvent) {
    let target = e.currentTarget as HTMLElement;

    this.error = true;
    this.setActive(target);
    this.btnDisabled = false;
  }
  public sizeItemCupClicked(e: MouseEvent) {
    let target = e.currentTarget as HTMLElement;

    this.error = false;
    this.setActive(target);
  }

  private setActive(target: HTMLElement): void {
    let parent: HTMLElement | null = target.parentElement;

    if (parent) {
      for (let i = 0; i < parent.children.length; i++) {
        let child = parent.children[i];
        if (child instanceof HTMLElement) {
          child.classList.remove('border-black');
        }
      }
    }
    target.classList.add('border-black');
  }
}
