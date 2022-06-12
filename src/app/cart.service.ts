import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PRODUCT } from 'src/app/product';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  items: PRODUCT[] = [];
  count: number = 0;
  cartCountSubject = new BehaviorSubject(0);

  constructor() {}
  //Adding Product to cart
  addProductToCart(product: PRODUCT) {
    this.items.push(product);
    this.count += 1;
    this.cartCountSubject.next(this.count);
  }
  // Remove selected product from cart on clicking -- button
  removeProductFromCart(product: PRODUCT) {
    let objIndex = this.items.findIndex((obj: any) => obj.id == product.id);
    this.items.splice(objIndex, 1);
    this.count -= 1;
    this.cartCountSubject.next(this.count);
  }
  // Deleting whole product on delete button
  deleteProductFromCart(product: PRODUCT) {
    let removeCount = this.items.filter(
      (obj: any) => obj.id == product.id
    ).length;
    let objIndex = this.items.findIndex((obj: any) => obj.id == product.id);
    this.count -= removeCount;
    this.cartCountSubject.next(this.count);
    this.items.splice(objIndex, 1);
  }
  // getting all products
  getItems() {
    return this.items;
  }
}
