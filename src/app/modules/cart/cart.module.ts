import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CartRoutingModule } from './cart-routing-module';
import { CartComponent } from './../../components/cart/cart.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
//import { BrowserModule } from '@angular/platform-browser';


@NgModule({
  declarations:[CartComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CartRoutingModule
  ]
})
export class CartModule { }
