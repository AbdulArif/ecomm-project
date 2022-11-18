import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from '../data-type';
import { ProductService } from '../sevices/product.service';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  query!: string | null;
  searchProducts!: Product[];


  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.query = this.activatedRoute.snapshot.paramMap.get('query')
    this.SearchProducts()
  }

  SearchProducts() {
    this.query && this.productService.SearchProducts(this.query).subscribe({
      next: (res: any) => {
        this.searchProducts = res
        console.log(this.searchProducts)
      },
      error: (err) => { console.log(err) }
    })
  }
}
