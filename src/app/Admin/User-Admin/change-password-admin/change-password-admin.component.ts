import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { Password } from './change-password-admin.module';
import { ChangePasswordAdminService } from './change-password-admin.service';

@Component({
  selector: 'app-change-password-admin',
  standalone: true,
  imports: [RouterLink,CommonModule,FormsModule],
  templateUrl: './change-password-admin.component.html',
  styleUrl: './change-password-admin.component.scss'
})
export class ChangePasswordAdminComponent {
  oldPassword: string = '';
  newPassword: string = '';
  confirmNewPassword: string = '';
  token?: string | null;
  errorMessage: string = ''; 
  
  constructor(private changePasswordService: ChangePasswordAdminService) {}
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
       {next:  (response: string) => {
         
        alert(response); // Display the success message
        localStorage.removeItem('accessToken');
        window.location.href = '/login';
      },
      error:  (error) => {
        console.error('Error:', error);
        if (error.status === 400) {
          this.errorMessage = 'Old password is incorrect';
        } else {
          this.errorMessage = 'Failed to change password. Please try again.';
        }
      }}
      );
  }
}


