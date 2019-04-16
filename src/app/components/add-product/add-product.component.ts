import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { Router,ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent implements OnInit {

  enteredProductObject:object={}
  constructor(private productService:ProductService,private router:Router,private activatedRoute:ActivatedRoute) { }
  yesAdded:boolean = true;
  buttonLoading:boolean = false;
  private sub :any;
  p:number;
  allProducts:any;

  ngOnInit() {
    
    this.sub = this.activatedRoute.queryParams.subscribe(params=>{
      let currentPage = params["redirectionPage"];
      this.p = currentPage;
      console.log("from add component"+this.p);
    })

    this.productService.getAllProducts().subscribe(displayProducts=>this.allProducts = displayProducts)

  }

  addProduct1(productObject){
    this.buttonLoading = true; 
    this.enteredProductObject={
      "id":productObject.productid,
      "name": productObject.taskname,
      "description" : productObject.description,
      "price": productObject.price
    }
    console.log(this.enteredProductObject)
    console.log("All products"+this.allProducts)

    

      this.productService.addProductService(this.enteredProductObject).subscribe(student=>{
        this.yesAdded = true;
  
        let navigationExtras = {
          queryParams:{
            "redirectingAddProduct":this.p
          }
        }
        this.router.navigate(['/product-list'],navigationExtras);
      })
      


   
  }

}
