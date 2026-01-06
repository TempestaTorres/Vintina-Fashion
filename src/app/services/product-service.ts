import { Injectable } from '@angular/core';
import {Products, ProductType} from '../product/product-type';
import {HttpClient} from '@angular/common/http';
import {catchError, map, Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  constructor(private http: HttpClient) {
  }

  public getProduct(productType: string): Observable<ProductType | undefined> {
    return this.http.get<ProductType | undefined>('http://testologia.ru/pizzas?id=1')
      .pipe(
        map((result) => result = this.getProductByType(productType)),
        catchError( error => {
          return of(this.getProductByType(productType));
        })
      )
  }
  public getProductByType(productType: string): ProductType | undefined {

    return Products.find((product) => product.type === productType);
  }

  public getProductsByCategory(category: string): ProductType[] {
    return Products.filter((product) => product.category.name === category);
  }

  public getProductsByTag(tag: string): ProductType[] {
    return Products.filter((product) => product.category.tag === tag);
  }

  public getProductTotalAmount(product: ProductType): number {

    let quantity: number | undefined = product.quantity;
    let total: number = product.price;
    if (quantity) {
      total *= quantity;
    }
    return total;
  }

  public getAccessories(): ProductType[] {
    return Products.filter((product) => product.category.name === 'accessories');
  }
}
