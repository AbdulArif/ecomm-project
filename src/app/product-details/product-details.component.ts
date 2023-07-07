import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../services/product.service';
import { Cart ,Product } from '../data-type';


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
        console.log(this.productData)
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
  
  addToCart(){
    // if(this.productData){
    //   this.productData.quantity = this.productQuantity;
    //   if(!localStorage.getItem('user')){
    //     this.productService.LocalAddToCart(this.productData);
    //     this.removeCart=true
    //   }
    //else{
    //     let user = localStorage.getItem('user');
    //     let userId= user && JSON.parse(user).id;
    //     let cartData:Cart={
    //       ...this.productData,
    //       productId:this.productData.id,
    //       userId
    //     }
    //     delete cartData.id;
    //     this.product.addToCart(cartData).subscribe((result: any)=>{
    //       if(result){
    //        this.product.getCartList(userId);
    //        this.removeCart=true
    //       }
    //     })        
    //   }  
    // } 
  }
  removeToCart(productId: any) {
    this.productService.removeItemFromCart(productId)
    this.removeCart = false
  }
}
