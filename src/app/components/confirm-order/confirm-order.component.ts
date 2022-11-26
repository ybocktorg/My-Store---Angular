import { CartService } from 'src/app/services/cart.service';
import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';

@Component({
  selector: 'app-confirm-order',
  templateUrl: './confirm-order.component.html',
  styleUrls: ['./confirm-order.component.scss'],
})
export class ConfirmOrderComponent implements OnInit {
  currentUser!: User;
  user!: User;
  u_name!: string;
  totalPrice: number = 0;
  constructor(private readonly cartServ: CartService) {}

  ngOnInit(): void {
    this.user = this.cartServ?.userDeatails;
    this.totalPrice = this.cartServ?.total;
  }
}
