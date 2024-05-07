import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChangePasswordService } from './change-password.service';
import { FormsModule } from '@angular/forms';
import { Password } from './change-password.module';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-change-password',
  standalone: true,
  imports: [RouterLink, FormsModule,NgIf],
  templateUrl: './change-password.component.html',
  styleUrl: './change-password.component.scss',
})
export class ChangePasswordComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  token?: string | null;
  errorMessage: string = ''; 

  constructor(private changePasswordService: ChangePasswordService) {}

  onChangePassword(): void {
    if (this.newPassword !== this.confirmNewPassword) {
      this.errorMessage = 'New password and confirm password must match'; // Hiển thị thông báo lỗi
      return;
    }
    const passwordData: Password = {
      oldPassword: this.oldPassword,
      newPassword: this.newPassword,
      confirmNewPassword: this.confirmNewPassword,
    };

    this.token = localStorage.getItem('accessToken');

    this.changePasswordService
      .changePassword(passwordData, this.token)
      .subscribe(
        (response: string) => {
         
          alert(response); // Display the success message
          localStorage.removeItem('accessToken');
          window.location.href = '/login';
        },
        (error) => {
          console.error('Error:', error);
          if (error.status === 400) {
            this.errorMessage = 'Old password is incorrect';
          } else {
            this.errorMessage = 'Failed to change password. Please try again.';
          }
        }
      );
  }
}
