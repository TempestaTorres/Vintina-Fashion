import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductService} from '../../services/product-service';
import {ProductType} from '../../product/product-type';
import {CurrencyPipe} from '@angular/common';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-find-in-store',
  imports: [
    CurrencyPipe
  ],
  templateUrl: './find-in-store.component.html',
  styleUrl: './find-in-store.component.css',
})
export class FindInStoreComponent {

  @Input({ required: true }) opened: boolean = false;
  @Input({ required: true }) productType: string | undefined = undefined;
  @Output() findInStoreClosed = new EventEmitter<void>();
  @Output() openSizeGuide = new EventEmitter<void>();

  public product: ProductType | undefined = undefined;
  public inStore: boolean = true;
  public processing: boolean = false;

  constructor(private productService: ProductService, private activatedRoute: ActivatedRoute) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params) => {
      if (params['type']) {
        this.product = this.productService.getProductByType(params['type']);

        if (this.product) {
          this.product.quantity = 1;

        }
      }
    });

    if (this.productType) {
      this.product = this.productService.getProductByType(this.productType);

      if (this.product) {
        this.product.quantity = 1;

      }
    }
  }

  public checkAvailability(): void {

    this.processing = true;

    setTimeout(() => {
      this.processing = false;
    }, 3000)
  }
  public sizeItemClicked(e: MouseEvent) {
    let target = e.currentTarget as HTMLElement;

    this.setActive(target);

  }
  public sizeCupItemClicked(e: MouseEvent) {
    let target = e.currentTarget as HTMLElement;

    this.setActive(target);

  }

  public close(): void {
    this.findInStoreClosed.emit();
  }

  public onSizeGuideClick(): void {
    this.findInStoreClosed.emit();
    this.openSizeGuide.emit();
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
