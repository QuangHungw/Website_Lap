import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from './useradmin.module';
import { UseradminService } from './useradmin.service';

@Component({
  selector: 'app-useradmin',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './useradmin.component.html',
  styleUrl: './useradmin.component.scss'
})
export class UseradminComponent implements OnInit {
  token?: string | null;
  users?: User[] = [];
  constructor(private useradminService: UseradminService,private router: Router) {}
  ngOnInit(): void {
    if (typeof window !== 'undefined') {
      
      this.token = localStorage.getItem('accessToken');
     // console.log('token', this.token);
      
      if(localStorage.getItem('accessToken')) {
      
      this.useradminService.getUser(this.token).subscribe((data: User) => {
        //console.log(data);
        this.users = this.users?.concat(data);
        // if(data.role_id == 0) 
        //   { 
        //     this.router.navigateByUrl('/admin');
        //   }

      });
    }
      
  }
  }
}
