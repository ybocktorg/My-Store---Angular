import { CartService } from 'src/app/services/cart.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/models/product';
import { ProductsService } from 'src/app/services/products.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
})
export class ProductDetailsComponent implements OnInit {
  routerSubscription!: Subscription;
  serviceSubscription!: Subscription;

  quantites: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  quantity!: number;
  product!: Product;
  productId!: number;

  constructor(
    private prodServ: ProductsService,
    private cartServ: CartService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.routerSubscription = this.route.params.subscribe((params) => {
      this.productId = +params['productId'];

      this.serviceSubscription = this.prodServ
        .getProducts()
        .subscribe((products) => {
          if (this.productId === undefined) return;

          const selctedProduct = products.find(
            (product) => product.id === this.productId
          );
          if (!selctedProduct) {
            this.router.navigate(['404']);
            return;
          }

          this.product = selctedProduct;
          this.quantity = selctedProduct.quantity;
        });
    });
  }

  ngOnInit(): void {}

  addItemToCart(selectedItem: Product) {
    selectedItem.quantity = +selectedItem.quantity;
    //console.log('selectedItem', selectedItem);
    this.cartServ.addToCart(selectedItem);

    alert('Sussefuly added to cart!');
  }
}
