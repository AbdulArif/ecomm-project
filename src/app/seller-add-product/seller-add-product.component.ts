import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ProductService } from '../sevices/product.service';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {
  addProductForm!: FormGroup
  addProductMessage: string | undefined

  constructor(
    private formBuilder: UntypedFormBuilder,
    private productService: ProductService
  ) { }

  ngOnInit(): void {
    this.builAddProductForm();

  }

  builAddProductForm() {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      color: '',
      category: '',
      description: '',
      image: ''
    })
  }

  addProduct() {
    this.productService.addProduct(this.addProductForm.value).subscribe({
      next: (result: any) => {
        if (result) {
          this.addProductMessage = "Product is successfully added"
        }
        setTimeout(() => this.addProductMessage = undefined, 3000)
      },
      error: (err) => { console.log(err) }
    })
  }

}
