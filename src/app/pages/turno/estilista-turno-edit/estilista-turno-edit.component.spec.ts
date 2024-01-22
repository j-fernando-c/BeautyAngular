import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstilistaTurnoEditComponent } from './estilista-turno-edit.component';

describe('EstilistaTurnoEditComponent', () => {
  let component: EstilistaTurnoEditComponent;
  let fixture: ComponentFixture<EstilistaTurnoEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstilistaTurnoEditComponent]
    });
    fixture = TestBed.createComponent(EstilistaTurnoEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
