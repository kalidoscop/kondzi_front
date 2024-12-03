import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AccessibiliteConformitePartielleComponent } from './accessibilite-conformite-partielle.component';

describe('AccessibiliteConformitePartielleComponent', () => {
  let component: AccessibiliteConformitePartielleComponent;
  let fixture: ComponentFixture<AccessibiliteConformitePartielleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AccessibiliteConformitePartielleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AccessibiliteConformitePartielleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
