import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WebLapComponent } from './web-lap.component';

describe('WebLapComponent', () => {
  let component: WebLapComponent;
  let fixture: ComponentFixture<WebLapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WebLapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(WebLapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
