import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CasUrgenceComponent } from './cas-urgence.component';

describe('CasUrgenceComponent', () => {
  let component: CasUrgenceComponent;
  let fixture: ComponentFixture<CasUrgenceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CasUrgenceComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CasUrgenceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
