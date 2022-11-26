import { Product } from './../models/product';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject} from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  products: Product[] = [];
  products$ = new BehaviorSubject<Product[]>(this.products);

  constructor(private http: HttpClient, private router : ActivatedRoute) { }

  getProducts() {
  return this.http.get<Product[]>('./../../assets/data/products.json');

}

fetchProducts() {
  const subscription = this.http.get<Product[]>('./../../assets/data/products.json').subscribe(products => {
    this.products = products;
    this.products$.next(this.products);

    //subscription.unsubscribe();
  });
}



}
