import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { WebLapComponent } from './web-lap/web-lap.component';
import { ProductsComponent } from './products/products.component';
import { CartComponent } from './cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { Product2Component } from './product2/product2.component';
import { CheckoutComponent } from './checkout/checkout.component';
import { CustomerComponent } from './customer/customer.component';
import { ProductDetailComponent } from './product-detail/product-detail.component';
import { SignupComponent } from './signup/signup.component';
import { NewcustomerComponent } from './newcustomer/newcustomer.component';
import { MenuComponent } from './menu/menu.component';



export const routes: Routes = [
   
    {
        path: '',
    component: WebLapComponent
    },
    
    {
    path: 'login',
    component: LoginComponent
    },
    {
        path: 'signup',
        component: SignupComponent
        },
    {
        path: 'customer',
        component: CustomerComponent
    },
    {
        path: 'newcustomer',
        component: NewcustomerComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'product2',
        component: Product2Component
    },
    {
        path: 'product_detail',
        component: ProductDetailComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },
    {
        path: 'admin',
        component: AdminComponent
    },
  
    {
        path: 'checkout',
        component: CheckoutComponent
    },
    {
        path: 'menu',
        component: MenuComponent
    },
    
    

    
   
];
