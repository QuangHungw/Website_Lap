import { CommonModule, DatePipe } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from './editcustomeradmin.module';
import { EditcustomeradminService } from './editcustomeradmin.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editcustomeradmin',
  standalone: true,
  imports: [CommonModule,RouterLink, DatePipe,FormsModule],
  templateUrl: './editcustomeradmin.component.html',
  styleUrl: './editcustomeradmin.component.scss'
})
export class EditcustomeradminComponent {
  users: User[] = [];
  
  constructor(private editcustomeradminService: EditcustomeradminService, private router: Router,private route: ActivatedRoute) {}
  ngOnInit(): void {
    debugger
    this.route.paramMap.subscribe(params => {
      const Id = params.get('id');
      if(Id) {
    this.editcustomeradminService.getUser(Id).subscribe((data: User) => {
      this.users = this.users?.concat(data);
    
     // console.log(this.users)
    });
  }
  });
}

}

