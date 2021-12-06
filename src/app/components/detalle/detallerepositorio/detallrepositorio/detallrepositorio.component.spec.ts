import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetallrepositorioComponent } from './detallrepositorio.component';

describe('DetallrepositorioComponent', () => {
  let component: DetallrepositorioComponent;
  let fixture: ComponentFixture<DetallrepositorioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetallrepositorioComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetallrepositorioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
