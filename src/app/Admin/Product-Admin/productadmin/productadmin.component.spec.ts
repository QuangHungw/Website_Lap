import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductadminComponent } from './productadmin.component';

describe('ProductadminComponent', () => {
  let component: ProductadminComponent;
  let fixture: ComponentFixture<ProductadminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductadminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProductadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
