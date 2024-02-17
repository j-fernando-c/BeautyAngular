import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCitaClienteComponent } from './add-cita-cliente.component';

describe('AddCitaClienteComponent', () => {
  let component: AddCitaClienteComponent;
  let fixture: ComponentFixture<AddCitaClienteComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddCitaClienteComponent]
    });
    fixture = TestBed.createComponent(AddCitaClienteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
