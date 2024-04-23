import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './Sign in and log in/login/login.component';
import { WebLapComponent } from './Home page/web-lap/web-lap.component';

import { CartComponent } from './Function/cart/cart.component';
import { AdminComponent } from './admin/admin.component';
import { Product2Component } from './Product/product2/product2.component';
import { CheckoutComponent } from './Function/checkout/checkout.component';
import { CustomerComponent } from './Customers/customer/customer.component';
import { ProductDetailComponent } from './Product/product-detail/product-detail.component';

import { EditCustomerComponent } from './Customers/Editcutomer/editcustomer.component';
import { MenuComponent } from './Function/menu/menu.component';
import { SignupComponent } from './Sign in and log in/signup/signup.component';
import { ProductsComponent } from './Product/products/products.component';
import { DefaultLayoutComponent } from './Layout/default-layout/default-layout.component';



export const routes: Routes = [
   
    {
        path: '',
    component: DefaultLayoutComponent,
    
    
    children: [ 
        {
        path: '',
        component: WebLapComponent,
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
        path: 'editcustomer',
        component: EditCustomerComponent
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
    }
    
]

}


   
];
