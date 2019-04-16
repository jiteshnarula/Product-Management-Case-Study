import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import {Router} from '@angular/router'
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.css']
})
export class ProductlistComponent implements OnInit {

  private allProducts;  
  private sub:any;
  private currentPage:number

  p: number=1;
  constructor(private productService:ProductService,private router : Router,private activatedRoute :ActivatedRoute) { }

  ngOnInit() {
    this.getAllProducts();
    // redirecting directly to that current item from edit page
    console.log(this.activatedRoute.snapshot.queryParams['redirectPage'])
    if(this.activatedRoute.snapshot.queryParams['redirectPage']){
    this.sub = this.activatedRoute.queryParams.subscribe(params=>{
      let totalPages = params["redirectPage"];
      this.p = totalPages
      console.log(this.p) 
    })
  }else{
    this.p= 1;
    console.log(this.p)
    
  }
//redirecting from add component
  if(this.activatedRoute.snapshot.queryParams['redirectingAddProduct']){
    this.sub = this.activatedRoute.queryParams.subscribe(params=>{
      let totalPages = params["redirectingAddProduct"];
      this.p = totalPages
      console.log(this.p) 
    })
  }

 
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe(getAllProducts=>{this.allProducts=getAllProducts
       
    });
  }
  deleteProduct(id){
    if(confirm('Are you sure you want to delete?')){
      this.productService.deleteProductService(id).subscribe(()=>this.getAllProducts())
      
      console.log("current page"+this.p);
      var totalItems = this.allProducts.length;
      console.log(this.allProducts.length);  
      let afterDeletingTotalItems = totalItems - 1;
      console.log(afterDeletingTotalItems)
      let totalPages = Math.ceil(afterDeletingTotalItems/5);
      
      if(this.p <totalPages){
        this.p = this.p;
      }else{

        console.log(totalPages)
        this.p = totalPages
      }
    }
  }

  deleteAllProducts(){
    if(confirm('Are you sure you want to delete all the products?')){  
        for(let i =0 ;i<this.allProducts.length;i++){
          console.log(this.allProducts[i].id) 
          this.productService.deleteProductService(this.allProducts[i].id).subscribe(()=>{
            
            this.getAllProducts();
           })
        }
    } 
  }

  addProduct(){
    if(confirm("Are you sure you want to add product?")){
      console.log(this.allProducts.length)
      let totalItems = this.allProducts.length;
      var totalPages;
      var redirectionPage;
      if(totalItems % 5 ==0){
        totalPages = totalItems/5 ;
         redirectionPage = totalPages +1;
        console.log("redirectionPage"+redirectionPage)
      }else{
        totalPages = totalItems/5;
         redirectionPage = Math.ceil(totalPages);
        console.log("redirectionPage"+redirectionPage)
      }
      
      let navigationExtras= {
        queryParams:{
          "redirectionPage": redirectionPage
        }
      }
      this.router.navigate(['/add-product'],navigationExtras);
    }
  }


  updateProduct(id){
 
    // [routerLink]="['/edit-product',i.id]" 

     if("Are you sure you want to edit"){

       console.log(this.p) 

        let navigationExtras = {
          queryParams: {
              "currentPage": this.p
          }
      };
      console.log(navigationExtras);
     this.router.navigate(['/edit-product',id],navigationExtras);
    }
  }
 
   

}
