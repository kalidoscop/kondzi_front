import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionsGeneralesUtilisationComponent } from './conditions-generales-utilisation.component';

describe('ConditionsGeneralesUtilisationComponent', () => {
  let component: ConditionsGeneralesUtilisationComponent;
  let fixture: ComponentFixture<ConditionsGeneralesUtilisationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ConditionsGeneralesUtilisationComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConditionsGeneralesUtilisationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
