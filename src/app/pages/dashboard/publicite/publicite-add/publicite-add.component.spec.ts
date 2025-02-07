import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliciteAddComponent } from './publicite-add.component';

describe('PubliciteAddComponent', () => {
  let component: PubliciteAddComponent;
  let fixture: ComponentFixture<PubliciteAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PubliciteAddComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubliciteAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
