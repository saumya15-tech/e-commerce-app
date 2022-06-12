import { Component, OnInit } from '@angular/core';
import ProductJson from 'src/assets/product.json';
import { PRODUCT } from 'src/app/product';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  products: PRODUCT[] = ProductJson;
  constructor() {}

  ngOnInit(): void {}
}
