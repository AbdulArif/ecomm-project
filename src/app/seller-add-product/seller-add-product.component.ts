import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, UntypedFormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-seller-add-product',
  templateUrl: './seller-add-product.component.html',
  styleUrls: ['./seller-add-product.component.scss']
})
export class SellerAddProductComponent implements OnInit {
  addProductForm!: FormGroup
  constructor(
    private formBuilder: UntypedFormBuilder
  ) { }

  ngOnInit(): void {
    this.builAddProductForm();

  }

  builAddProductForm() {
    this.addProductForm = this.formBuilder.group({
      name: ['', Validators.required],
      price: ['', Validators.required],
      color: '',
      category:'',
      description:'',
      image: ''
    })
  }

  addProduct() {
    console.table(this.addProductForm.value)
  }

}
