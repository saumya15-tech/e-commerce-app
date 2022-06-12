import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import ProductJson from 'src/assets/product.json';
import { PRODUCT } from 'src/app/product';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss'],
})
export class ProductDetailComponent implements OnInit {
  products: PRODUCT[] = ProductJson;
  product: any;

  constructor(
    private route: ActivatedRoute,
    private cartService: CartService
  ) {}

  // Getting the product id from the current route
  // Finding the product with the id provided in route
  ngOnInit(): void {
    const routeParams = this.route.snapshot.paramMap;
    const productIdFromRoute = routeParams.get('productId');
    this.product = this.products.find((e) => e.slug === productIdFromRoute);
  }

  addToCart(product: PRODUCT) {
    this.cartService.addProductToCart(product);
  }
}
