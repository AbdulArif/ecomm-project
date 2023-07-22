import { Component, OnInit } from '@angular/core';
import { Cart, Order } from '../data-type';
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
    private productService: ProductService, 
    private router: Router
  ) { }

  ngOnInit(): void {
    this.currentCart()
  }
  currentCart(){
    this.productService.currentCart().subscribe((result) => {

      let price = 0;
      this.cartData = result;
      result.forEach((item) => {
        if (item.quantity) {
          price = price + (+item.price * +item.quantity)
        }
      })
      this.totalPrice = price + (price / 10) + 100 - (price / 10);

      console.warn(this.totalPrice);

    })
  }
  orderNow(data: { email: string, address: string, contact: string }) {
    let user = localStorage.getItem('user');
    let userId = user && JSON.parse(user).id;
    if (this.totalPrice) {
      let orderData: Order = {
        ...data,
        totalPrice: this.totalPrice,
        userId,
        id: undefined
      }

      this.cartData?.forEach((item) => {
        setTimeout(() => {
          item.id && this.productService.deleteCartItems(item.id);
        }, 700)
      })

      this.productService.orderNow(orderData).subscribe((result) => {
        if (result) {
          this.orderMsg = "Order has been placed";
          setTimeout(() => {
            this.orderMsg = '';
            this.router.navigate(['/my-orders'])
          }, 4000);

        }

      })
    }

  }

}
