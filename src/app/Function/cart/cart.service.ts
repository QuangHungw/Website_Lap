import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { OrderDetail,Product,Payment } from './cart.module';
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private apiUrl1 = 'http://localhost:3000/product';
  private apiUrl2 = 'http://localhost:3000/orderdetail/cart';
  private apiUrl3 = 'http://localhost:3000/orderdetail/update';
  private apiUrl4 = 'http://localhost:3000/orderdetail/delete';
  private apiUrl5 = 'http://localhost:3000/payment';
  constructor(private http: HttpClient) { }
  private orderDetailsSubject = new BehaviorSubject<OrderDetail[]>([]);
  orderDetails$: Observable<OrderDetail[]> = this.orderDetailsSubject.asObservable();

  updateOrderDetails(orderDetails: OrderDetail[]) {
    
    this.orderDetailsSubject.next(orderDetails);
   
  }



  private loadOrderDetailsFromLocalStorage(): OrderDetail[] {
    
      const orderDetails = localStorage.getItem('orderDetails');
      return orderDetails ? JSON.parse(orderDetails) : [];
    
    return [];
  }
  getOrderDetail(token?: string | null): Observable<OrderDetail[]> {
    return this.http.get<OrderDetail[]>(this.apiUrl2, { headers: { Authorization: `Bearer ${token}` } }).pipe(
      tap((orderDetails: OrderDetail[]) => {
        // this.updateOrderDetails(orderDetails);
      })
    );
  }
  getProductById(Id: string): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl1}/${Id}`);
  }

  updateOrderDetail(token: string | null | undefined, id: number, quantity: number): Observable<OrderDetail> {
    const headers = ({
      Authorization: `Bearer ${token}`,
      'Content-Type': 'application/json',
    });

    const body = {
      id: id,
      quantity: quantity,
    };

    return this.http.put<OrderDetail>(this.apiUrl3, body, { headers: headers }).pipe(
      tap((updatedOrder: OrderDetail) => {
        // Cập nhật lại orderDetails trong BehaviorSubject
        const currentOrderDetails = this.orderDetailsSubject.getValue();
        const updatedOrderDetails = currentOrderDetails.map(order =>
          order.id === updatedOrder.id ? updatedOrder : order
        );
        this.updateOrderDetails(updatedOrderDetails);
      })
    );
  }
  deleteOrderDetail(token: string | null | undefined, id: string): Observable<OrderDetail> {
    const url = `${this.apiUrl4}/${id}`;
    const headers = ({
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    });
    const options = { headers: headers };

    return this.http.delete<OrderDetail>(url, options).pipe(
      tap(() => {
        // Lấy danh sách orderDetails hiện tại
        const currentOrderDetails = this.orderDetailsSubject.getValue();
        // Lọc bỏ orderDetail đã xóa
        const updatedOrderDetails = currentOrderDetails.filter(order => order.id !== +id);
        // Cập nhật lại BehaviorSubject
        this.updateOrderDetails(updatedOrderDetails);
      })
    );
  }
  postPayment(token: string | null| undefined, paymentMethod: string): Observable<Payment> {
    return this.http.post<Payment>(
        this.apiUrl5,
        { paymentMethod: paymentMethod },
        { headers: { Authorization: `Bearer ${token}` } }
    );
}

}