import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailconfirmComponent } from './detailconfirm.component';

describe('DetailconfirmComponent', () => {
  let component: DetailconfirmComponent;
  let fixture: ComponentFixture<DetailconfirmComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetailconfirmComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetailconfirmComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
