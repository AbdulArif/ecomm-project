import { Component, OnInit } from '@angular/core';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { Subscription } from 'rxjs';
import { ProductService } from '../sevices/product.service';

@Component({
  selector: 'app-seller-home',
  templateUrl: './seller-home.component.html',
  styleUrls: ['./seller-home.component.scss']
})
export class SellerHomeComponent implements OnInit {
  deleteIcon = faTrash
  getProductSub!: Subscription
  deleteProductSub!: Subscription
  productsList: any[] = []


  constructor(
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.GetProducts()
  }
  ngOnDestroy(): void {
    if (this.getProductSub) {
      this.getProductSub.unsubscribe();
    }
    if (this.deleteProductSub) {
      this.deleteProductSub.unsubscribe();
    }
  }

  GetProducts() {
    this.getProductSub = this.productService.GetProducts().subscribe({
        next: (response: any) => {
          this.productsList = response;
          console.log(this.productsList)
        },
        error: (error: any) => {
          // this.toastr.error('Failed to get Orders.', 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        },
        complete: () => {
        }
      }
    );
  }

  deleteProduct(id: Number) {
    this.deleteProductSub = this.productService.DeleteProduct(id).subscribe({
        next: (response: any) => {
          console.log(response)
        },
        error: (error: any) => {
          console.log(error)
          // this.toastr.error('Failed to delete Product.', 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        },
        complete: () => {
          this.GetProducts()
        }
      }
    );
  }

}
