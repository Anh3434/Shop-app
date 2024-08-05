import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Category } from '../models/category';
@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private apiGetCategories  = "http://localhost:8080/api/v1/categories";

  constructor(private http: HttpClient) { }
  getCategories():Observable<Category[]> {
      return this.http.get<Category[]>(this.apiGetCategories);           
  }
}