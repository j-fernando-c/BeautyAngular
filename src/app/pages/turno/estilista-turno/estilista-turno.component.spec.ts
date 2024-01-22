import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstilistaTurnoComponent } from './estilista-turno.component';

describe('EstilistaTurnoComponent', () => {
  let component: EstilistaTurnoComponent;
  let fixture: ComponentFixture<EstilistaTurnoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EstilistaTurnoComponent]
    });
    fixture = TestBed.createComponent(EstilistaTurnoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
