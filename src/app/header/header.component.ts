import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { Product } from '../data-type';
import { ProductService } from '../services/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: string = 'default'
  sellerName:string="";
  productsList!: Product[]
  searchProducts!: Product[]
  cartItems = 0;
  userName:string="";



  getProductSub!: Subscription

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  async ngOnInit(): Promise<void> {
    // this.GetProducts()
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller"
          var sellerStore = localStorage.getItem('seller')
          if (sellerStore) {
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]
            this.sellerName = sellerData.name
          }
          else if (localStorage.getItem('user')) {
            let userStore = localStorage.getItem('user')
            var userData = userStore && JSON.parse(userStore)
            this.userName = userData.name
            this.menuType = 'user'
            this.productService.GetCartList(userData.id);

          }
        }
        else {
          // console.log("OutSide seller area")
          this.menuType = "default"
        }
      }
    })
   await this.getCartdata()
  }

  ngOnDestroy(): void {
    if (this.getProductSub) {
      this.getProductSub.unsubscribe();
    }
  }
  async getCartdata() {
    let cartData = localStorage.getItem('localCart')
    if (cartData) {
      this.cartItems = JSON.parse(cartData).length
    }
    this.productService.cartData.subscribe((item)=>{
      this.cartItems = item.length
    })
    console.log(this.cartItems)
  }
  logOut() {
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
  }

  userLogOut() {
    localStorage.removeItem('user');
    this.router.navigate(['/user-auth'])
    this.productService.cartData.emit([])
  }
  // GetProducts() {
  //   this.getProductSub = this.productService.GetProducts().subscribe({
  //       next: (response: any) => {
  //         this.productsList = response;
  //         console.log(this.productsList)
  //       },
  //       error: (error: any) => {
  //         // this.toastr.error('Failed to get Orders.', 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
  //       },
  //       complete: () => {
  //       }
  //     }
  //   );
  // }

  searchProduct(query: KeyboardEvent) {
    if (query) {
      const element = query.target as HTMLInputElement
      this.productService.SearchProducts(element.value).subscribe((result) => {
        this.searchProducts = result
        console.log(this.searchProducts)
        if (result.length > 5) {
          result.length = 5
        }
      })
    }
  }

  hideSearch() {
    this.searchProducts = []
  }
  submitSearch(val: string) {
    this.router.navigate([`search/${val}`])
  }

  redirectToDetails(id: number) {
    this.router.navigate(['/details/' + id])
  }

}
