import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomeradminComponent } from './customeradmin.component';

describe('CustomeradminComponent', () => {
  let component: CustomeradminComponent;
  let fixture: ComponentFixture<CustomeradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomeradminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CustomeradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
