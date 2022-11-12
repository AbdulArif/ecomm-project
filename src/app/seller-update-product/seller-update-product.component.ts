import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Product } from '../data-type';
import { ProductService } from '../sevices/product.service';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {

  productForm!: FormGroup;
  productId!: string | null;
  product!: Product;


  constructor(
    private formBuilder: UntypedFormBuilder,
    private activatedRoute: ActivatedRoute,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id')
    this.builAddProductForm()
    this.GetProductById()
  }

  builAddProductForm() {
    this.productForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      color: '',
      category: '',
      description: '',
      image: ''
    })
    console.log(this.productForm.value)
  }

   GetProductById() {
    this.productId && this.productService.GetProductById(this.productId).subscribe({
      next: (res: any) => {
        this.product = res
        this.viewProduct(this.product)
        console.log(this.product)
      },
      error: (err) => { console.log(err) }
    })
  }

  viewProduct(pro: any) {
    // console.log(pro)
    this.productForm.patchValue({
      id: pro[0].id,
      name: pro[0].name,
      price: this.product.price,
      color: pro.color,
      category: pro.category,
      description: pro.description,
      image: pro.image
    })
    console.log(this.productForm.value)
  }

  updateProduct() {

  }
}
