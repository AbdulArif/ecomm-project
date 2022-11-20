import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit {
productId = '' 
  constructor(
    private activatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('productId') as string
  }

}
