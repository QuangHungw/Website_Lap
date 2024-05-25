import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Payment } from './payment.module';
import { PaymentService } from './payment.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [RouterLink,CommonModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
payments: Payment[] = [];
constructor(private paymentService: PaymentService) {}
ngOnInit(): void {
  if (typeof window !== 'undefined') {
  this.paymentService.getPayment().subscribe((data: Payment) => {
    this.payments = this.payments?.concat(data);
   
  //  console.log(data)
  });
}
}
}
