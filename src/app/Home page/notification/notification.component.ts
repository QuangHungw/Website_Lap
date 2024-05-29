import { Component } from '@angular/core';
import { NotificationService } from './notification.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  template: `
  <div *ngIf="message" class="notification">
    {{ message }}
  </div>
`,
  styleUrl: './notification.component.scss'
})
export class NotificationComponent {
  message: string | null = null;

  constructor(private notificationService: NotificationService) {
    this.notificationService.notification$.subscribe(message => {
      this.message = message;
      setTimeout(() => this.message = null, 3000); // Hide after 3 seconds
    });
  }
}
