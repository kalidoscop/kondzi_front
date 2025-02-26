import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NosMissionComponent } from './nos-mission.component';

describe('NosMissionComponent', () => {
  let component: NosMissionComponent;
  let fixture: ComponentFixture<NosMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NosMissionComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NosMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
