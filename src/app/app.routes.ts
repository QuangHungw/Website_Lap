import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './Sign in and log in/login/login.component';
import { WebLapComponent } from './Home page/web-lap/web-lap.component';
import { CartComponent } from './Function/cart/cart.component';
import { CheckoutComponent } from './Function/checkout/checkout.component';
import { CustomerComponent } from './Customers/customer/customer.component';
import { ProductDetailComponent } from './Product/product-detail/product-detail.component';
import { EditCustomerComponent } from './Customers/Editcutomer/editcustomer.component';
import { SignupComponent } from './Sign in and log in/signup/signup.component';
import { ProductsComponent } from './Product/products/products.component';
import { DefaultLayoutComponent } from './Layout/default-layout/default-layout.component';
import { ChangePasswordComponent } from './Customers/change-password/change-password.component';
import { AdminComponent } from './Admin/Layout-Admin/admin/admin.component';
import { LayoutadminComponent } from './Admin/Layout-Admin/layoutadmin/layoutadmin.component';
import { OrderComponent } from './Admin/Order-Admin/order/order.component';
import { ProductadminComponent } from './Admin/Product-Admin/productadmin/productadmin.component';
import { CustomeradminComponent } from './Admin/Customer-Admin/customeradmin/customeradmin.component';
import { CategoryadminComponent } from './Admin/Category-Admin/categoryadmin/categoryadmin.component';
import { AddproductComponent } from './Admin/Product-Admin/addproduct/addproduct.component';
import { EditproductComponent } from './Admin/Product-Admin/editproduct/editproduct.component';
import { EditcategoryComponent } from './Admin/Category-Admin/editcategory/editcategory.component';
import { AddcategoryComponent } from './Admin/Category-Admin/addcategory/addcategory.component';
import { EditcustomeradminComponent } from './Admin/Customer-Admin/editcustomeradmin/editcustomeradmin.component';
import { AddcustomerComponent } from './Admin/Customer-Admin/addcustomer/addcustomer.component';
import { UseradminComponent } from './Admin/User-Admin/useradmin/useradmin.component';
import { EditAdminComponent } from './Admin/User-Admin/edit-admin/edit-admin.component';
import { ChangePasswordAdminComponent } from './Admin/User-Admin/change-password-admin/change-password-admin.component';
import { DeleteproductComponent } from './Admin/Product-Admin/deleteproduct/deleteproduct.component';
import { DeletecategoryComponent } from './Admin/Category-Admin/deletecategory/deletecategory.component';



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
        path: 'changepassword',
        component: ChangePasswordComponent
    },
    {
        path: 'products',
        component: ProductsComponent
    },
    {
        path: 'product_detail/:id',
        component: ProductDetailComponent
    },
    {
        path: 'products/:id',
        component:  ProductsComponent
    },
    {
        path: 'products/search/:name',
        component:  ProductsComponent
    },
    {
        path: 'products/price/:price',
        component:  ProductsComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },

    {
        path: 'checkout',
        component: CheckoutComponent
    },
 
    
] 

} , 
{
    path: '',
component: LayoutadminComponent,


children: [ 
    {
    path: 'admin',
    component: AdminComponent,
    },
            {
                path: 'useradmin',
                component: UseradminComponent
            },
                    {
                        path: 'editadmin',
                        component: EditAdminComponent
                    },       {
                                 path: 'changepasswordadmin',
                                component: ChangePasswordAdminComponent
                             },  
    {
path: 'order',
component: OrderComponent
},
{
    path: 'productadmin',
    component: ProductadminComponent
    },
        {
        path: 'addproduct',
        component: AddproductComponent
                },{
                path: 'editproduct/:id',
                component: EditproductComponent
                        },  {
                            path: 'deleteproduct/:id',
                            component: DeleteproductComponent
                                    },{
                                            path: 'productadmin/search/:name',
                                            component: ProductadminComponent
                                            },
 {
    path: 'customeradmin',
    component: CustomeradminComponent
},
        {
            path: 'editcustomeradmin/:id',
            component: EditcustomeradminComponent
        },
            {
                path: 'addcustomer',
                component: AddcustomerComponent
                        },  {
                            path: 'customeradmin/search/:name',
                            component: CustomeradminComponent
                        },
        
    

{
    path: 'categoryadmin',
    component: CategoryadminComponent
},
        {
            path: 'editcategory/:id',
            component: EditcategoryComponent
                    } ,  {
                        path: 'deletecategory/:id',
                        component: DeletecategoryComponent
                                 } ,{
                                    path: 'addcategory',
                                    component: AddcategoryComponent
                                 }               ,{
                                                    path: 'categoryadmin/search/:name',
                                                    component: CategoryadminComponent
                                                            } ,

] 

} 


   
];
