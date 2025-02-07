import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliciteDetailsComponent } from './publicite-details.component';

describe('PubliciteDetailsComponent', () => {
  let component: PubliciteDetailsComponent;
  let fixture: ComponentFixture<PubliciteDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PubliciteDetailsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubliciteDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
