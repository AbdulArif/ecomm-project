import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ProductService } from '../sevices/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  getProductSub! : Subscription
  products: any[] = []


  constructor(
    private productService : ProductService
  ) { }

  ngOnInit(): void {
    this.GetProducts()
  }
ngOnDestroy(): void {
    if (this.getProductSub) {
      this.getProductSub.unsubscribe();
    }
  }

  GetProducts() {
    this.getProductSub = this.productService.GetProducts().subscribe(
      {
        next: (response: any) => {
          this.products = response;
          console.log(this.products)
        },
        error: (error: any) => {
          // this.toastr.error('Failed to get Orders.', 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        },
        complete: () => {
        }
      }
    );
  }

}
