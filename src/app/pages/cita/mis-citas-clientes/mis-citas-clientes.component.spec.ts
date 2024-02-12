import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MisCitasClientesComponent } from './mis-citas-clientes.component';

describe('MisCitasClientesComponent', () => {
  let component: MisCitasClientesComponent;
  let fixture: ComponentFixture<MisCitasClientesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MisCitasClientesComponent]
    });
    fixture = TestBed.createComponent(MisCitasClientesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
