import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Router} from '@angular/router';
import { ProductService } from 'src/app/services/product.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-editproduct',
  templateUrl: './editproduct.component.html',
  styleUrls: ['./editproduct.component.css']
})
export class EditproductComponent implements OnInit {
  products:any
  matchedData:object= {}
  selectedID:number;
  productObject:object={}
  p:number;
  private sub :any;

  constructor(private productService:ProductService,private http : HttpClient
    ,private router : Router,private activatedRoute:ActivatedRoute) { }

  ngOnInit() {

    
    //getting id from the url
    this.activatedRoute.params.subscribe(params=>{this.selectedID = +params['id']
  console.log(this.selectedID)})


    //getting the query paramerters

    this.sub = this.activatedRoute.queryParams.subscribe(params=>{
      let currentPage = params["currentPage"];
      this.p = currentPage;
      console.log("from edit component"+this.p);
    })



    //getting all the products
  this.productService.getAllProducts().subscribe(displayProducts=>
        {this.products=displayProducts 
          console.log(this.products)
          for(let i =0;i<this.products.length;i++){
            if(parseInt(this.products[i].id) === this.selectedID){
              this.matchedData = this.products[i]
            } 
          }
        console.log(this.matchedData)

        })
        
  }

  updateProduct1(product){
    
    console.log(this.products)
    var totalItems = this.products.length;
    console.log(totalItems)

    


     this.productObject={
       "name": product.name,
       "description": product.description,
       "price": product.price
     }
     console.log(this.productObject)
     this.productService.updateProductService(this.productObject,this.selectedID).
     subscribe(()=>{
      console.log(this.p)
      let navigationExtras = {
        queryParams: {
            "redirectPage": this.p
        }
    };
      this.router.navigate(['/product-list'],navigationExtras)
     alert("Updated Successfully")
   })
  }

}
