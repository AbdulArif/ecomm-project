import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart, Product } from '../data-type';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId = ''
  productData!: Product
  productQuantity: number = 1
  removeCart = false
  cartData!: any;


  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId') as string
    this.GetProductById()
    this.getCartdata()
  }

  GetProductById() {
    this.productService.GetProductById(this.productId).subscribe({
      next: (res: any) => {
        this.productData = res[0]
        // console.log(this.productData)
      },
      error: (err) => { console.log(err) }
    })
  }

  getCartdata() {
    let cartData = localStorage.getItem('localCart')
    if (this.productId && cartData) {
      let items = JSON.parse(cartData)
      items = items.filter((item: Product) => this.productId == item.id?.toString())
      if (items.length) {
        this.removeCart = true;
      }
      else {
        this.removeCart = false;
      }
    }
    let user = localStorage.getItem('user');
    if (user) {
      let userId = user && JSON.parse(user)[0].id;
      this.productService.GetCartList(userId);
      this.productService.cartData.subscribe((result) => {
        let item = result.filter((item: any) => this.productId?.toString() === item.productId?.toString())
        console.log(item)
        if (item.length) {
          this.cartData = item[0];
          this.removeCart = true;
        }
      })
    }
    // this.productService.cartData.subscribe((item)=>{
    //   this.cartItems = item.length
    // })
    // console.log(this.cartItems)
  }

  handelQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity = this.productQuantity + 1
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity = this.productQuantity - 1
    }
  }

  addToCart() {
    console.log(this.productData)
    if (this.productData) {
      this.productData.quantity = this.productQuantity;
      if (!localStorage.getItem('user')) {
        this.productService.LocalAddToCart(this.productData);
        this.removeCart = true
      }
      else {
        let user: string | null = localStorage.getItem('user');
        let userId = user && JSON.parse(user)[0].id;
        // console.log(userId)
        let cartData: any = {
          ...this.productData,
          productId: this.productData.id,
          userId
        }
        delete cartData.id;
        this.productService.AddToCart(cartData).subscribe((result: any) => {
          if (result) {
            this.productService.GetCartList(userId);
            this.removeCart = true
          }
        })
      }
    }
  }
  removeToCart(productId: any) {
    if (!localStorage.getItem('user')) {
      this.productService.removeItemFromCart(productId);
    } else {
      console.warn("cartData", this.cartData);
      if (this.cartData) {
        this.productService.removeToCart(this.cartData.id)
          .subscribe((result) => {
            let user = localStorage.getItem('user');
            let userId = user && JSON.parse(user).id;
            if (userId) {
              this.productService.GetCartList(userId);
            }
          });
      }
    }
    this.removeCart = false;
  }
  
}
