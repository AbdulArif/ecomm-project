import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { Product } from '../data-type';
import { ProductService } from '../sevices/product.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  menuType: String = 'default'
  sellerName: String = ''
  productsList!: Product[]
  searchProducts: Product[] | undefined

  getProductSub!: Subscription

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    // this.GetProducts()
    this.router.events.subscribe((val: any) => {
      if (val.url) {
        if (localStorage.getItem('seller') && val.url.includes('seller')) {
          this.menuType = "seller"
          var sellerStore = localStorage.getItem('seller') 
          if(sellerStore){
            let sellerData = sellerStore && JSON.parse(sellerStore)[0]
            this.sellerName = sellerData.name
          }
        }
        else {
          // console.log("OutSide seller area")
          this.menuType = "default"
        }
      }
    })
  }

  ngOnDestroy(): void {
    if (this.getProductSub) {
      this.getProductSub.unsubscribe();
    }
  }

  logOut(){
    localStorage.removeItem('seller')
    this.router.navigate(['/'])
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

  searchProduct(query: KeyboardEvent){
    if(query){
      const element = query.target as HTMLInputElement
      this.productService.SearchProducts(element.value).subscribe((result)=>{
        this.searchProducts = result
        if(result.length>5){
          result.length =5
        }
      })
    }
  }

  hideSearch(){
    this.searchProducts =  undefined
  }
  submitSearch(val: string){
    // console.log(val)
  }

}
