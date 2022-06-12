import {
  Component,
  OnInit,
  Input,
  ViewChild,
  ElementRef,
  AfterContentInit,
} from '@angular/core';
import ProductJson from 'src/assets/product.json';
import { CartService } from '../cart.service';
import { PRODUCT } from 'src/app/product';
declare var $: any;

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
})
export class ProductCardComponent implements AfterContentInit {
  @Input() product: any;
  products: PRODUCT[] = ProductJson;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {}
  @ViewChild('carousel')
  el!: ElementRef;

  //For carousel
  ngAfterContentInit() {
    const myCarousel = document.querySelectorAll('#myCarousel');
    const carousel = $(myCarousel).carousel();
  }
  //Adding product to cart
  addToCart(product: PRODUCT) {
    this.cartService.addProductToCart(product);
  }
}
