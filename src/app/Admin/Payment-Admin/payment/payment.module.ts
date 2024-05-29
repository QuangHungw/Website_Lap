export interface Payment {
  id: number;
  amount: number;
  payment_method: string;
  payment_date: Date;
}

export class PaymentModule {}
