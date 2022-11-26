import { CartService } from './../../services/cart.service';
import { ProductsService } from './../../services/products.service';
import { Component, OnInit } from '@angular/core';
import { Product } from './../../models/product';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  constructor(
    private prodServ: ProductsService,
    private cartServ: CartService
  ) {}

  ngOnInit() {
    this.prodServ.getProducts().subscribe((data) => {
      this.products = data;
      //console.table(data);
    });
  }

  addItem(p: Product) {
    p.quantity = +p.quantity;
    this.cartServ.addToCart(p);
    alert('Added to cart sussefuly!');
  }
}
