import { Component, OnInit } from '@angular/core';
import { Cart } from '../data-type';
import { ProductService } from '../services/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  totalPrice!: number ;
  cartData!: Cart[];
  orderMsg!: string;

  constructor(
    private product: ProductService, 
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  orderNow(data: { email: string, address: string, contact: string }) {
  }

}
