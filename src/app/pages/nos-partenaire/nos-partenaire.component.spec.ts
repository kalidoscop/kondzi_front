import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosPartenaireComponent } from './nos-partenaire.component';

describe('NosPartenaireComponent', () => {
  let component: NosPartenaireComponent;
  let fixture: ComponentFixture<NosPartenaireComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosPartenaireComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosPartenaireComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
