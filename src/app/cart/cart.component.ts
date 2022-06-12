import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import ShippingJson from 'src/assets/shipping.json';
import { SHIPPING } from 'src/app/shipping';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  cartProductList: any;
  shipping: SHIPPING[] = ShippingJson;
  shippingPrice: any = 10;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartProductList = this.calculateProductQty(
      this.cartService.getItems()
    );
  }
  // Calculating individual Product Quantity in cart
  calculateProductQty(cartData: any) {
    const result = Object.values(
      cartData.reduce((acc: any, e: any) => {
        let prod = `${e.name}|${e.name}`;
        if (!acc[prod]) acc[prod] = { ...e, count: 1 };
        else acc[prod].count += 1;
        return acc;
      }, {})
    );
    return result;
  }
  // Removing single entity from cart
  removeProduct(product: any) {
    let objIndex = this.productIndex(product);
    this.cartProductList[objIndex].count -= 1;
    if (this.cartProductList[objIndex].count <= 0) {
      this.cartProductList.splice(objIndex, 1);
    }
    this.cartService.removeProductFromCart(product);
  }
  // add single entity to cart
  addProduct(product: any) {
    let objIndex = this.productIndex(product);
    this.cartProductList[objIndex].count += 1;
    this.cartService.addProductToCart(product);
  }
  //Remove whole product
  deleteProduct(product: any) {
    let objIndex = this.productIndex(product);
    this.cartProductList.splice(objIndex, 1);
    this.cartService.deleteProductFromCart(product);
  }
  //Finding selected prod. index
  productIndex(productObj: any) {
    return this.cartProductList.findIndex(
      (obj: any) => obj.id == productObj.id
    );
  }
  //Shipping price method
  onSelected(event: any) {
    this.shippingPrice = event.target.value;
  }
  // Calculating total cart value
  getTotal() {
    let aa = this.cartProductList.reduce((sum: any, current: any) => {
      return sum + current.price * current.count;
    }, 0);
    return aa + +this.shippingPrice;
  }
}
