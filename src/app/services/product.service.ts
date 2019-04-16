import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
    httpOptions={
        headers: new HttpHeaders({"content-type":"application/json"})
  }
  url="http://localhost:4444/productmanagement";
  constructor(private http:HttpClient) { }
  
  getAllProducts(){
    return this.http.get(`${this.url}`);
  }

  addProductService(productObject){
    return this.http.post(`${this.url}`,productObject);
     
  }
 
 

  deleteProductService(id){
    return this.http.delete(`${this.url}/${id}`,this.httpOptions)
  }

  updateProductService(productObject,id){
    return this.http.put(`${this.url}/${id}`,JSON.stringify(productObject),this.httpOptions);
  }
 
}



