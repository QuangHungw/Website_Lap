import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { LoginComponent } from './Sign in and log in/login/login.component';
import { WebLapComponent } from './Home page/web-lap/web-lap.component';
import { CartComponent } from './Function/cart/cart.component';
import { CustomerComponent } from './Customers/customer/customer.component';
import { ProductDetailComponent } from './Product/product-detail/product-detail.component';
import { EditCustomerComponent } from './Customers/Editcutomer/editcustomer.component';
import { SignupComponent } from './Sign in and log in/signup/signup.component';
import { ProductsComponent } from './Product/products/products.component';
import { DefaultLayoutComponent } from './Layout/default-layout/default-layout.component';
import { ChangePasswordComponent } from './Customers/change-password/change-password.component';
import { AdminComponent } from './Admin/Layout-Admin/admin/admin.component';
import { LayoutadminComponent } from './Admin/Layout-Admin/layoutadmin/layoutadmin.component';
import { OrderadminComponent } from './Admin/Order-Admin/orderadmin/orderadmin.component';
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
import { CancelOrderComponent } from './Admin/Order-Admin/cancel-order/cancel-order.component';
import { ConfirmOrderComponent } from './Admin/Order-Admin/confirm-order/confirm-order.component';
import { PostadminComponent } from './Admin/Post-Admin/postadmin/postadmin.component';
import { AddpostComponent } from './Admin/Post-Admin/addpost/addpost.component';
import { EditpostComponent } from './Admin/Post-Admin/editpost/editpost.component';
import { DeletepostComponent } from './Admin/Post-Admin/deletepost/deletepost.component';
import { PaymentComponent } from './Admin/Payment-Admin/payment/payment.component';
import { OrderdetailComponent } from './Admin/Order-Admin/orderdetail/orderdetail.component';
import { OrderComponent } from './Function/order/order.component';
import { OrderconfirmdetailComponent } from './Admin/Order-Admin/orderconfirmdetail/orderconfirmdetail.component';
import { OrderconfirmComponent } from './Function/orderconfirm/orderconfirm.component';
import { DetailComponent } from './Function/detail/detail.component';
import { DetailconfirmComponent } from './Function/detailconfirm/detailconfirm.component';



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
        path: 'products/:name/:price',
        component:  ProductsComponent
    },
    {
        path: 'cart',
        component: CartComponent
    },

    {
        path: 'order',
        component: OrderComponent
    },
    {
        path: 'order/:id',
        component: DetailComponent
    },
    {
        path: 'orderconfirm',
        component: OrderconfirmComponent
    },
    {
        path: 'orderconfirm/:id',
        component: DetailconfirmComponent
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
path: 'orderadmin',
component: OrderadminComponent
},   {
    path: 'cancelorder',
    component: CancelOrderComponent
    },   {
        path: 'confirmorder',
        component: ConfirmOrderComponent
        },  {
            path: 'orderdetail/:id',
            component: OrderdetailComponent
        },          {
                        path: 'orderconfirmdetail/:id',
                        component: OrderconfirmdetailComponent
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



 {
    path: 'postadmin',
    component: PostadminComponent
                    },          {
                        path: 'addpost',
                        component: AddpostComponent
                                },
                                        {
                                            path: 'editpost/:id',
                                            component: EditpostComponent
                                        },
                                                        {
                                                            path: 'deletepost/:id',
                                                            component: DeletepostComponent
                                                        },   
                                                        {
                                                        path: 'postadmin/search/:title',
                                                    component: PostadminComponent
                                                            } ,
                                                        
 {
    path: 'payment',
   component: PaymentComponent
               },                                                          

            ] 

            } 


   
];
