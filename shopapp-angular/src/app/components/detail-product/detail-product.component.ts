import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'; 
import { Router } from '@angular/router';
import { Product } from '../../models/product';

import { ProductService } from '../../service/product.service';
import { CartService } from '../../service/cart.service';
import { ProductImage } from '../../models/product.image';

@Component({
  selector: 'app-detail-product',
  templateUrl: './detail-product.component.html',
  styleUrls: ['./detail-product.component.scss']
})

export class DetailProductComponent implements OnInit {
  product?: Product;
  productId: number = 0;
  currentImageIndex: number = 0;
  quantity: number = 1;
  constructor(
    private productService: ProductService,
    private cartService: CartService,
    // private categoryService: CategoryService,
    // private router: Router,
    // private activatedRoute: ActivatedRoute,
    ) {
      
    }
    ngOnInit() {
      // Lấy productId từ URL      
      //const idParam = this.activatedRoute.snapshot.paramMap.get('id');
      debugger
      //this.cartService.clearCart();
      const idParam = 2 //fake value
      if (idParam !== null) {
        this.productId = +idParam;
      }
      if (!isNaN(this.productId)) {
        this.productService.getDetailProduct(this.productId).subscribe({
          next: (response: any) => {            
            debugger
            if (response.product_images && response.product_images.length > 0) {
              response.product_images.forEach((product_image:ProductImage) => {
                debugger
                product_image.imageUrl = `http://localhost:8080/api/v1/products/images/${product_image.imageUrl}`;
              });
            }            
            debugger
            this.product = response 
            this.showImage(0);
          },
          complete: () => {
            debugger;
          },
          error: (error: any) => {
            debugger;
            console.error('Error fetching detail:', error);
          }
        });    
      } else {
        console.error('Invalid productId:', idParam);
      }      
    }
    showImage(index: number): void {
      debugger
      if (this.product && this.product.product_images && 
          this.product.product_images.length > 0) {
  
        if (index < 0) {
          index = 0;
        } else if (index >= this.product.product_images.length) {
          index = this.product.product_images.length - 1;
        }        

        this.currentImageIndex = index;
      }
    }
    thumbnailClick(index: number) {
      debugger
      this.currentImageIndex = index; 
    }  
    nextImage(): void {
      debugger
      this.showImage(this.currentImageIndex + 1);
    }
  
    previousImage(): void {
      debugger
      this.showImage(this.currentImageIndex - 1);
    }      
    addToCart(): void {
      debugger
      if (this.product) {
        this.cartService.addToCart(this.product.id, this.quantity);
      } else {
        console.error('Không thể thêm sản phẩm vào giỏ hàng vì product là null.');
      }
    }    
        
    increaseQuantity(): void {
      this.quantity++;
    }
    
    decreaseQuantity(): void {
      if (this.quantity > 1) {
        this.quantity--;
      }
    }
    
    buyNow(): void {
    }    
}
