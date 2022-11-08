import { Component, OnInit } from '@angular/core';
import { Form, FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-seller-update-product',
  templateUrl: './seller-update-product.component.html',
  styleUrls: ['./seller-update-product.component.scss']
})
export class SellerUpdateProductComponent implements OnInit {
  updateProductForm!: FormGroup
  constructor(
    private formBuilder : UntypedFormBuilder,
    private cctivatedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.builAddProductForm()
  }

  builAddProductForm() {
    this.updateProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      color: '',
      category: '',
      description: '',
      image: ''
    })
  }


  updateProduct(){

  }
}
