import { Component } from '@angular/core';
import { HeaderAdminComponent } from '../header-admin/header-admin.component';
import { RouterOutlet } from '@angular/router';
import { FootAdminComponent } from '../foot-admin/foot-admin.component';

@Component({
  selector: 'app-layoutadmin',
  standalone: true,
  imports: [HeaderAdminComponent,RouterOutlet,FootAdminComponent],
  templateUrl: './layoutadmin.component.html',
  styleUrl: './layoutadmin.component.scss'
})
export class LayoutadminComponent {

}
