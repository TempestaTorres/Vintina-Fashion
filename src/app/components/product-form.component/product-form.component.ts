import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ProductService} from '../../services/product-service';
import {ProductType} from '../../product/product-type';

@Component({
  selector: 'app-product-form',
  imports: [],
  templateUrl: './product-form.component.html',
  styleUrl: './product-form.component.css',
})
export class ProductFormComponent {
  @Input({ required: true }) productType: string | undefined = undefined;
  @Output() openSizeGuide = new EventEmitter<void>();
  @Output() addedToBag = new EventEmitter<void>();

  public product: ProductType | undefined = undefined;
  public error:boolean = false;
  public processing: boolean = false;
  public btnDisabled: boolean = true;

  constructor(private productService: ProductService) { }

  ngOnInit() {

    if (this.productType) {
      this.product = this.productService.getProductByType(this.productType);

      if (this.product) {
        this.product.quantity = 1;

        console.log(this.product);
      }
    }
  }

  public addToBag() {
    this.processing = true;

    setTimeout(() => {
      this.processing = false;
      this.btnDisabled = true;
      this.addedToBag.emit();

    }, 3000)
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
