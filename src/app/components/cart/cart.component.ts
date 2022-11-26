import { User } from './../../models/user';
import { Product } from './../../models/product';
import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { Subscription, observable } from 'rxjs';
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss'],
})
export class CartComponent implements OnInit {
  public sub = new Subscription();
  public subTotal = new Subscription();
  quantites: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  cartList: Product[] = [];
  quantity!: number;
  totalPrice: number = 0;
  user!: User;
  userName!: string;
  minNameVal: number = 3;
  minAddressVal = 8;
  minMaxCardVal: number = 16;

  emptyName: boolean = false;
  emptyAddress: boolean = false;
  emptyCard: boolean = false;
  // form
  checkoutForm: FormGroup;

  constructor(
    private cartServ: CartService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.checkoutForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(this.minNameVal)]],

      address: [
        '',
        [
          Validators.required,
          Validators.minLength(this.minNameVal),
          Validators.minLength(this.minAddressVal),
        ],
      ],
      card: [
        '',
        [
          Validators.required,
          Validators.minLength(this.minMaxCardVal),
          Validators.maxLength(this.minMaxCardVal),
          Validators.pattern(/^[0-9]\d*$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    //console.log(this.cartList);
    this.cartServ.getAllSelectedProducts().subscribe((cartList) => {
      this.cartList = cartList;
    });
    this.calcTotal();
  }

  calcTotal() {
    this.totalPrice = 0;
    this.cartList.forEach((item) => {
      this.totalPrice += +item.price * +item.quantity;
    });
  }

  confirmRemove(product: Product) {
    let confirMsg = 'Are you sure you want to remove this product?';
    if (confirm(confirMsg) == true) {
      this.removeItem(product);
      setTimeout(() => {
        this.productRemovedConfirmation();
      }, 100);
    } else {
    }
  }

  removeItem(product: Product) {
    this.cartServ.removeOneItem(product.id);
    this.calcTotal();
    return this.cartList;
  }

  productRemovedConfirmation() {
    alert('Product has been removed successfuly!');
  }

  UserDetails() {
    if (this.checkoutForm.invalid) return;
    this.user = this.checkoutForm.value;

    this.cartServ.userDeatails = this.user;
    this.cartServ.total = this.totalPrice;
    //this.cartServ.addUser(this.user, this.totalPrice);
    setTimeout(() => this.router.navigate(['/confirm']));
  }
}
