import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Product } from '../data-type';
import { ProductService } from '../sevices/product.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  images = [944, 1011, 984].map((n) => `https://picsum.photos/id/${n}/900/500`);
  productsList!: Product[]

  constructor(
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.propularProducts()
  }

  propularProducts() {
    this.productService.PropularProducts().subscribe({
      next: (response: any) => {
        this.productsList = response;
        console.log(this.productsList)
      },
      error: (error: any) => {
        console.log(error)
      }
    })
  }

}
