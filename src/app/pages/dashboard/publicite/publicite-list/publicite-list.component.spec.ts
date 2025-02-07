import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PubliciteListComponent } from './publicite-list.component';

describe('PubliciteListComponent', () => {
  let component: PubliciteListComponent;
  let fixture: ComponentFixture<PubliciteListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PubliciteListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PubliciteListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
