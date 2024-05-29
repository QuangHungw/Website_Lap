import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { User } from './editcustomeradmin.module';
import { EditcustomeradminService } from './editcustomeradmin.service';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-editcustomeradmin',
  standalone: true,
  imports: [CommonModule,RouterLink,FormsModule,HttpClientModule],
  templateUrl: './editcustomeradmin.component.html',
  styleUrl: './editcustomeradmin.component.scss'
})
export class EditcustomeradminComponent {
  users: User[] = [];
  editObj: Edit = new Edit();
  errorMessage: string = ''; 
  constructor(private editcustomeradminService: EditcustomeradminService, private router: Router,private route: ActivatedRoute) {this. editObj = new Edit();}
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const Id = params.get('id');
      if(Id) {
    this.editcustomeradminService.getUser(Id).subscribe((data: User) => {
      this.users =  [data];
      this.editObj.role_id = data.role_id
     // console.log(this.users)
    });
  }
  });
}

onUpdateCustomer(): void {
 //debugger
  this.route.paramMap.subscribe(params => {
    const Id = params.get('id');
    if (Id) { 
      const role_id = +this.editObj.role_id;  // Convert to number using the unary plus operator or parseInt()
      //  console.log(role_id)
      this.editcustomeradminService.updateUser(Id, role_id).subscribe(
      {next:   () => {
        alert('Account updated successfully');
        this.router.navigateByUrl('/customeradmin');
      },
      error: (error) => {
        this.errorMessage=(error.error.message);
        //console.error('Error:', error.error.message);
      }}
      );
    }
  });
}

}
export class Edit {

  role_id: number ;
  constructor() {
    this.role_id = 0;
    

  }
}


