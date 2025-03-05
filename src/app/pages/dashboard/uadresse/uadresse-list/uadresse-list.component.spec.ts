import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UadresseListComponent } from './uadresse-list.component';

describe('UadresseListComponent', () => {
  let component: UadresseListComponent;
  let fixture: ComponentFixture<UadresseListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UadresseListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UadresseListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
