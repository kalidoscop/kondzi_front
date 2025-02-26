import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RepertoiresAdressesGeolocaliseesComponent } from './repertoires-adresses-geolocalisees.component';

describe('RepertoiresAdressesGeolocaliseesComponent', () => {
  let component: RepertoiresAdressesGeolocaliseesComponent;
  let fixture: ComponentFixture<RepertoiresAdressesGeolocaliseesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RepertoiresAdressesGeolocaliseesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RepertoiresAdressesGeolocaliseesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
