import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalleestilosComponent } from './detalleestilos.component';

describe('DetalleestilosComponent', () => {
  let component: DetalleestilosComponent;
  let fixture: ComponentFixture<DetalleestilosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetalleestilosComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetalleestilosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
