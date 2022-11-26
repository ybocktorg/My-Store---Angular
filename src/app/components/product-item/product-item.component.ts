import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-item',
  templateUrl: './product-item.component.html',
  styleUrls: ['./product-item.component.scss'],
})
export class ProductItemComponent implements OnInit {
  selectedP!: Product;
  @Input() product!: Product;
  @Output() selectedProduct = new EventEmitter();
  quantites: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  constructor(
    private prodServ: ProductsService,
    private cartServ: CartService
  ) {}

  ngOnInit(): void {}

  transferItem(prod: Product) {
    this.selectedP = prod;
    this.selectedProduct.emit(this.selectedP);
  }
}
