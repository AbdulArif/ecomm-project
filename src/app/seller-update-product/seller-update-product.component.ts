import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import {  Router, ActivatedRoute } from '@angular/router';
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
    private router: Router,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.productId = this.activatedRoute.snapshot.paramMap.get('id')
    this.builAddProductForm()
    this.GetProductById()
  }

  builAddProductForm() {
    this.productForm = this.formBuilder.group({
      id: [Number, Validators.required],
      name: ['', Validators.required],
      price: ['', Validators.required],
      color: '',
      category: '',
      description: '',
      image: ''
    })
    // console.log(this.productForm.value)
  }

  GetProductById() {
    this.productId && this.productService.GetProductById(this.productId).subscribe({
      next: (res: any) => {
        this.product = res
        this.viewProduct(this.product)
        // console.log(this.product)
      },
      error: (err) => { console.log(err) }
    })
  }

  viewProduct(pro: any) {
    this.productForm.patchValue({
      id: this.productId,
      name: pro[0].name,
      price: pro[0].price,
      color: pro[0].color,
      category: pro[0].category,
      description: pro[0].description,
      image: pro[0].image
    })
    // console.log(this.productForm.value)
  }

  updateProduct() {
    // console.log(this.productForm.value)
    if (this.productForm.invalid) {
      // this.toastr.warning('Fill all the required fileds!', 'Warning', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      return
    }
    // this.addStepSub = 
    this.productService.updateProduct(this.productForm.value).subscribe({
      next: (res) => {
        // this.toastr.success('Workflow details saved!', 'Success', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
        this.router.navigate(['seller-home']);
      },
      error: (err) => {
        console.log(err)
        // this.toastr.error("Failed to save!", 'Error', { positionClass: 'toast-bottom-right', closeButton: true, progressBar: true, progressAnimation: 'decreasing' });
      }
    })

  }
}
