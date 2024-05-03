import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditcustomeradminComponent } from './editcustomeradmin.component';

describe('EditcustomeradminComponent', () => {
  let component: EditcustomeradminComponent;
  let fixture: ComponentFixture<EditcustomeradminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditcustomeradminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EditcustomeradminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
