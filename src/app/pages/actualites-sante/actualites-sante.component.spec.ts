import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActualitesSanteComponent } from './actualites-sante.component';

describe('ActualitesSanteComponent', () => {
  let component: ActualitesSanteComponent;
  let fixture: ComponentFixture<ActualitesSanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActualitesSanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActualitesSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
