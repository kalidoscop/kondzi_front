import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdresseDoctorComponent } from './adresse-doctor.component';

describe('AdresseDoctorComponent', () => {
  let component: AdresseDoctorComponent;
  let fixture: ComponentFixture<AdresseDoctorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdresseDoctorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdresseDoctorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
