import { BehaviorSubject, Subject } from 'rxjs';
import { Product } from './../models/product';
import { User } from './../models/user';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  total!: number;
  userName!: string;
  userDeatails!: User;
  cartAllList: Product[] = [];
  cartAllList$ = new BehaviorSubject<Product[]>([]);
  constructor() {}

  getAllSelectedProducts() {
    return this.cartAllList$.asObservable();
  }

  addToCart(selectedProduct: Product) {
    const index = this.cartAllList.findIndex(
      (p) => p.id === selectedProduct.id
    );
    //console.log(index);

    if (index > -1) {
      this.cartAllList[index].quantity =
        this.cartAllList[index].quantity + selectedProduct.quantity;
      this.cartAllList$.next(this.cartAllList);
      //console.log('curr Quantity ', this.cartAllList[index].quantity);

      return this.cartAllList;
    } else {
      this.cartAllList.push(selectedProduct);
      this.cartAllList$.next(this.cartAllList);
      return this.cartAllList;
    }
  }

  addUser(user: User, totalPrice: number) {
    this.userDeatails = user;
    this.total = totalPrice;
  }

  calcTotalPrice() {
    this.total = 0;
    this.cartAllList.forEach((item) => {
      this.total += +item.price * +item.quantity;
      return this.total;
    });
  }

  removeOneItem(selectedId: number) {
    let index = this.cartAllList.findIndex((p) => p.id === selectedId);
    this.cartAllList.splice(index, 1);
    this.cartAllList$.next(this.cartAllList);
    return this.cartAllList;
  }
}
