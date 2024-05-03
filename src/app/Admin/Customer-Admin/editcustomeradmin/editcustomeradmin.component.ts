import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-editcustomeradmin',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './editcustomeradmin.component.html',
  styleUrl: './editcustomeradmin.component.scss'
})
export class EditcustomeradminComponent {

}
