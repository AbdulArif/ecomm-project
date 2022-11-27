import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from '../sevices/product.service';
import { Product } from '../data-type';


@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
  productId = ''
  productData!: Product
  productQuantity: number = 1

  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId') as string
    this.GetProductById()
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

  handelQuantity(val: string) {
    if (this.productQuantity < 20 && val === 'plus') {
      this.productQuantity = this.productQuantity + 1
    }
    else if (this.productQuantity > 1 && val === 'min') {
      this.productQuantity = this.productQuantity - 1
    }
  }
}
