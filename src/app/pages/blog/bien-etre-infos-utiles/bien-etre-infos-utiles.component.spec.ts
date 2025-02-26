import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BienEtreInfosUtilesComponent } from './bien-etre-infos-utiles.component';

describe('BienEtreInfosUtilesComponent', () => {
  let component: BienEtreInfosUtilesComponent;
  let fixture: ComponentFixture<BienEtreInfosUtilesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BienEtreInfosUtilesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BienEtreInfosUtilesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
