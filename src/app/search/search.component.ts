import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SelectItem } from 'primeng/api';
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
  sortOptions!: SelectItem[];
  sortOrder!: number;
  sortField!: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.sortOptions = [
      { label: 'Price High to Low', value: '!price' },
      { label: 'Price Low to High', value: 'price' }
  ];
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

  onSortChange(event: any) {
    console.log(event.target.value)
    let value = event.target.value;

    if (value.indexOf('!') === 0) {
        this.sortOrder = -1;
        this.sortField = value.substring(1, value.length);
    }
    else {
        this.sortOrder = 1;
        this.sortField = value;
    }
}
}
