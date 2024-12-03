import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MediaSanteComponent } from './media-sante.component';

describe('MediaSanteComponent', () => {
  let component: MediaSanteComponent;
  let fixture: ComponentFixture<MediaSanteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MediaSanteComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MediaSanteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
